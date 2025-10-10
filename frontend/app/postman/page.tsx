'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Play, Copy, Save, Trash2, Plus, Minus, ChevronDown, ChevronRight, 
  Folder, File, Settings, History, Download, Upload, Zap,
  CheckCircle, XCircle, AlertTriangle, Clock, Globe, Lock
} from 'lucide-react';

interface APIRequest {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  name: string;
  description?: string;
  tests?: string[];
  variables?: Record<string, string>;
}

interface Collection {
  id: string;
  name: string;
  description?: string;
  requests: APIRequest[];
  variables: Record<string, string>;
}

interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
  size: number;
}

interface Environment {
  id: string;
  name: string;
  variables: Record<string, string>;
}

export default function PostmanPage() {
  const { user } = useAuth();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Record<string, string>>({
    'Content-Type': 'application/json'
  });
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [showHeaders, setShowHeaders] = useState(true);
  const [showBody, setShowBody] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'tests'>('params');
  
  // Collections and Environment
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment | null>(null);
  const [requestHistory, setRequestHistory] = useState<APIRequest[]>([]);
  
  // Form inputs
  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');
  const [newVariableKey, setNewVariableKey] = useState('');
  const [newVariableValue, setNewVariableValue] = useState('');
  const [requestName, setRequestName] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [tests, setTests] = useState<string[]>(['']);
  
  // Load data from localStorage
  useEffect(() => {
    const savedCollections = localStorage.getItem('postman-collections');
    const savedEnvironments = localStorage.getItem('postman-environments');
    const savedHistory = localStorage.getItem('postman-history');
    
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }
    if (savedEnvironments) {
      setEnvironments(JSON.parse(savedEnvironments));
    }
    if (savedHistory) {
      setRequestHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save data to localStorage
  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    localStorage.setItem('postman-collections', JSON.stringify(newCollections));
  };

  const saveEnvironments = (newEnvironments: Environment[]) => {
    setEnvironments(newEnvironments);
    localStorage.setItem('postman-environments', JSON.stringify(newEnvironments));
  };

  const saveHistory = (newHistory: APIRequest[]) => {
    setRequestHistory(newHistory);
    localStorage.setItem('postman-history', JSON.stringify(newHistory));
  };

  // Send request
  const sendRequest = async () => {
    if (!url.trim()) {
      setError('URL не может быть пустым');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const startTime = Date.now();

    try {
      // Replace variables in URL
      let processedUrl = url;
      if (currentEnvironment) {
        Object.entries(currentEnvironment.variables).forEach(([key, value]) => {
          processedUrl = processedUrl.replace(`{{${key}}}`, value);
        });
      }

      const requestOptions: RequestInit = {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      };

      if (method !== 'GET' && body.trim()) {
        requestOptions.body = body;
      }

      const fullUrl = processedUrl.startsWith('http') ? processedUrl : `${window.location.origin}${processedUrl}`;
      const res = await fetch(fullUrl, requestOptions);
      const endTime = Date.now();

      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let responseData;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }

      const responseSize = JSON.stringify(responseData).length;

      const newResponse: APIResponse = {
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        data: responseData,
        time: endTime - startTime,
        size: responseSize
      };

      setResponse(newResponse);
      setShowResponse(true);

      // Add to history
      const historyRequest: APIRequest = {
        id: Date.now().toString(),
        method,
        url: processedUrl,
        headers,
        body,
        name: requestName || `${method} ${processedUrl}`,
        description: requestDescription
      };
      saveHistory([historyRequest, ...requestHistory.slice(0, 49)]); // Keep last 50 requests

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке запроса');
    } finally {
      setLoading(false);
    }
  };

  // Add header
  const addHeader = () => {
    if (newHeaderKey.trim() && newHeaderValue.trim()) {
      setHeaders(prev => ({
        ...prev,
        [newHeaderKey.trim()]: newHeaderValue.trim()
      }));
      setNewHeaderKey('');
      setNewHeaderValue('');
    }
  };

  // Remove header
  const removeHeader = (key: string) => {
    setHeaders(prev => {
      const newHeaders = { ...prev };
      delete newHeaders[key];
      return newHeaders;
    });
  };

  // Add variable
  const addVariable = () => {
    if (newVariableKey.trim() && newVariableValue.trim() && currentEnvironment) {
      const newEnvironments = environments.map(env => 
        env.id === currentEnvironment.id 
          ? { ...env, variables: { ...env.variables, [newVariableKey.trim()]: newVariableValue.trim() } }
          : env
      );
      saveEnvironments(newEnvironments);
      setCurrentEnvironment({
        ...currentEnvironment,
        variables: { ...currentEnvironment.variables, [newVariableKey.trim()]: newVariableValue.trim() }
      });
      setNewVariableKey('');
      setNewVariableValue('');
    }
  };

  // Remove variable
  const removeVariable = (key: string) => {
    if (currentEnvironment) {
      const newEnvironments = environments.map(env => 
        env.id === currentEnvironment.id 
          ? { ...env, variables: { ...env.variables } }
          : env
      );
      delete newEnvironments.find(env => env.id === currentEnvironment.id)?.variables[key];
      saveEnvironments(newEnvironments);
      setCurrentEnvironment({
        ...currentEnvironment,
        variables: { ...currentEnvironment.variables }
      });
      delete currentEnvironment.variables[key];
    }
  };

  // Create collection
  const createCollection = () => {
    const name = prompt('Название коллекции:');
    if (name) {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name,
        description: '',
        requests: [],
        variables: {}
      };
      saveCollections([...collections, newCollection]);
    }
  };

  // Create environment
  const createEnvironment = () => {
    const name = prompt('Название окружения:');
    if (name) {
      const newEnvironment: Environment = {
        id: Date.now().toString(),
        name,
        variables: {}
      };
      saveEnvironments([...environments, newEnvironment]);
    }
  };

  // Save request to collection
  const saveRequestToCollection = () => {
    if (!currentCollection) {
      alert('Выберите коллекцию для сохранения');
      return;
    }

    const newRequest: APIRequest = {
      id: Date.now().toString(),
      method,
      url,
      headers,
      body,
      name: requestName || `${method} ${url}`,
      description: requestDescription,
      tests: tests.filter(t => t.trim())
    };

    const newCollections = collections.map(col => 
      col.id === currentCollection.id 
        ? { ...col, requests: [...col.requests, newRequest] }
        : col
    );
    saveCollections(newCollections);
    setCurrentCollection({
      ...currentCollection,
      requests: [...currentCollection.requests, newRequest]
    });
  };

  // Load request
  const loadRequest = (request: APIRequest) => {
    setMethod(request.method);
    setUrl(request.url);
    setHeaders(request.headers);
    setBody(request.body);
    setRequestName(request.name);
    setRequestDescription(request.description || '');
    setTests(request.tests || ['']);
  };

  // Delete request
  const deleteRequest = (requestId: string) => {
    if (currentCollection) {
      const newCollections = collections.map(col => 
        col.id === currentCollection.id 
          ? { ...col, requests: col.requests.filter(req => req.id !== requestId) }
          : col
      );
      saveCollections(newCollections);
      setCurrentCollection({
        ...currentCollection,
        requests: currentCollection.requests.filter(req => req.id !== requestId)
      });
    }
  };

  // Copy cURL
  const copyCurl = () => {
    let curl = `curl -X ${method}`;
    
    Object.entries(headers).forEach(([key, value]) => {
      curl += ` -H "${key}: ${value}"`;
    });

    if (method !== 'GET' && body.trim()) {
      curl += ` -d '${body}'`;
    }

    curl += ` "${window.location.origin}${url}"`;
    
    navigator.clipboard.writeText(curl);
  };

  // Copy response
  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    }
  };

  // Get status color
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-50';
    if (status >= 300 && status < 400) return 'text-blue-600 bg-blue-50';
    if (status >= 400 && status < 500) return 'text-yellow-600 bg-yellow-50';
    if (status >= 500) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ChevronRight className="w-5 h-5 rotate-180" />
                Главное меню
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                Postman
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <span className="text-sm text-gray-600">Привет, {user.username}!</span>
              ) : (
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                  Войти
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Collections */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    Коллекции
                  </h3>
                  <button
                    onClick={createCollection}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                {collections.map((collection) => (
                  <div key={collection.id} className="mb-2">
                    <button
                      onClick={() => setCurrentCollection(collection)}
                      className={`w-full text-left p-2 rounded text-sm ${
                        currentCollection?.id === collection.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {collection.name}
                    </button>
                    {currentCollection?.id === collection.id && (
                      <div className="ml-4 mt-1 space-y-1">
                        {collection.requests.map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-1 rounded hover:bg-gray-50">
                            <button
                              onClick={() => loadRequest(request)}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900"
                            >
                              <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                                request.method === 'GET' ? 'bg-green-100 text-green-800' :
                                request.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                                request.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                request.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {request.method}
                              </span>
                              {request.name}
                            </button>
                            <button
                              onClick={() => deleteRequest(request.id)}
                              className="p-1 text-red-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Environment */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Окружение
                  </h3>
                  <button
                    onClick={createEnvironment}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <select
                  value={currentEnvironment?.id || ''}
                  onChange={(e) => {
                    const env = environments.find(env => env.id === e.target.value);
                    setCurrentEnvironment(env || null);
                  }}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="">Выберите окружение</option>
                  {environments.map((env) => (
                    <option key={env.id} value={env.id}>{env.name}</option>
                  ))}
                </select>
                {currentEnvironment && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(currentEnvironment.variables).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-1 bg-gray-50 rounded text-xs">
                        <span className="font-medium">{key}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">{value}</span>
                          <button
                            onClick={() => removeVariable(key)}
                            className="p-1 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-1 mt-2">
                      <input
                        type="text"
                        value={newVariableKey}
                        onChange={(e) => setNewVariableKey(e.target.value)}
                        placeholder="Ключ"
                        className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      />
                      <input
                        type="text"
                        value={newVariableValue}
                        onChange={(e) => setNewVariableValue(e.target.value)}
                        placeholder="Значение"
                        className="flex-1 p-1 border border-gray-300 rounded text-xs"
                      />
                      <button
                        onClick={addVariable}
                        className="p-1 bg-blue-600 text-white rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  История
                </h3>
              </div>
              <div className="p-2 max-h-64 overflow-y-auto">
                {requestHistory.slice(0, 10).map((request) => (
                  <button
                    key={request.id}
                    onClick={() => loadRequest(request)}
                    className="w-full text-left p-2 rounded text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                      request.method === 'GET' ? 'bg-green-100 text-green-800' :
                      request.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      request.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      request.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.method}
                    </span>
                    <span className="truncate">{request.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Request Builder */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Создать запрос</h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      placeholder="Название запроса"
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={saveRequestToCollection}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4" />
                      Сохранить
                    </button>
                  </div>
                </div>

                {/* Request Line */}
                <div className="flex gap-2 mb-4">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL эндпоинта (например: /api/tasks)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={sendRequest}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    {loading ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <nav className="-mb-px flex space-x-8">
                    {[
                      { id: 'params', label: 'Params', icon: Globe },
                      { id: 'headers', label: 'Headers', icon: Settings },
                      { id: 'body', label: 'Body', icon: File },
                      { id: 'tests', label: 'Tests', icon: Zap }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'headers' && (
                  <div className="space-y-3">
                    {Object.entries(headers).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <input
                          type="text"
                          value={key}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        />
                        <input
                          type="text"
                          value={value}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        />
                        <button
                          onClick={() => removeHeader(key)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newHeaderKey}
                        onChange={(e) => setNewHeaderKey(e.target.value)}
                        placeholder="Название заголовка"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={newHeaderValue}
                        onChange={(e) => setNewHeaderValue(e.target.value)}
                        placeholder="Значение заголовка"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={addHeader}
                        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'body' && (
                  <div>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="JSON данные..."
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    />
                  </div>
                )}

                {activeTab === 'tests' && (
                  <div className="space-y-3">
                    {tests.map((test, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={test}
                          onChange={(e) => {
                            const newTests = [...tests];
                            newTests[index] = e.target.value;
                            setTests(newTests);
                          }}
                          placeholder="pm.test('Test name', () => { ... });"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                        <button
                          onClick={() => {
                            const newTests = tests.filter((_, i) => i !== index);
                            setTests(newTests);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setTests([...tests, ''])}
                      className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Добавить тест
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Response */}
            {response && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Ответ</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(response.status)}`}>
                        {response.status} {response.statusText}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {response.time}ms
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {formatFileSize(response.size)}
                      </span>
                      <button
                        onClick={copyResponse}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-4">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <XCircle className="w-5 h-5" />
                    <h3 className="font-medium">Ошибка</h3>
                  </div>
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
