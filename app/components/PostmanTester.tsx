'use client';

import { useState, useEffect } from 'react';
import { 
  Play, Copy, Save, Trash2, Plus, Minus, ChevronDown, ChevronRight, 
  Folder, File, Settings, History, Download, Upload, Zap, Menu,
  Globe, Lock, Eye, EyeOff, Code, CheckCircle, XCircle, AlertTriangle,
  Clock, Database, Layers, Filter, Search, MoreHorizontal
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

export default function PostmanTester() {
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
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'tests'>('params');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [responseTab, setResponseTab] = useState<'body' | 'headers' | 'tests'>('body');
  
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
  const [params, setParams] = useState<Array<{key: string, value: string, enabled: boolean}>>([]);
  
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

      // Add query parameters
      const enabledParams = params.filter(p => p.enabled && p.key.trim());
      if (enabledParams.length > 0) {
        const queryString = enabledParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
        processedUrl += (processedUrl.includes('?') ? '&' : '?') + queryString;
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
      saveHistory([historyRequest, ...requestHistory.slice(0, 49)]);

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

  // Add parameter
  const addParam = () => {
    setParams([...params, { key: '', value: '', enabled: true }]);
  };

  // Remove parameter
  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  // Update parameter
  const updateParam = (index: number, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
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
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-blue-500';
    if (status >= 400 && status < 500) return 'text-yellow-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-500';
  };

  // Get method color
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-600';
      case 'POST': return 'bg-blue-600';
      case 'PUT': return 'bg-yellow-600';
      case 'PATCH': return 'bg-purple-600';
      case 'DELETE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
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
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-orange-500" />
            <span className="font-semibold text-lg">Postman</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
            New
          </button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
            Import
          </button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
            Runner
          </button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
            Sync
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Collections */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-300">Collections</h3>
                <button
                  onClick={createCollection}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {collections.map((collection) => (
                  <div key={collection.id} className="mb-2">
                    <button
                      onClick={() => setCurrentCollection(collection)}
                      className={`w-full text-left p-2 rounded text-sm flex items-center gap-2 ${
                        currentCollection?.id === collection.id 
                          ? 'bg-orange-600 text-white' 
                          : 'hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <Folder className="w-4 h-4" />
                      {collection.name}
                    </button>
                    {currentCollection?.id === collection.id && (
                      <div className="ml-6 mt-1 space-y-1">
                        {collection.requests.map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-1 rounded hover:bg-gray-700">
                            <button
                              onClick={() => loadRequest(request)}
                              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white"
                            >
                              <span className={`px-1 py-0.5 rounded text-xs font-medium ${getMethodColor(request.method)}`}>
                                {request.method}
                              </span>
                              {request.name}
                            </button>
                            <button
                              onClick={() => deleteRequest(request.id)}
                              className="p-1 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100"
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
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-300">Environment</h3>
                <button
                  onClick={createEnvironment}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <select
                value={currentEnvironment?.id || ''}
                onChange={(e) => {
                  const env = environments.find(env => env.id === e.target.value);
                  setCurrentEnvironment(env || null);
                }}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white"
              >
                <option value="">No Environment</option>
                {environments.map((env) => (
                  <option key={env.id} value={env.id}>{env.name}</option>
                ))}
              </select>
              {currentEnvironment && (
                <div className="mt-3 space-y-2">
                  {Object.entries(currentEnvironment.variables).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-gray-700 rounded text-xs">
                      <span className="font-medium text-gray-300">{key}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">{value}</span>
                        <button
                          onClick={() => removeVariable(key)}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={newVariableKey}
                      onChange={(e) => setNewVariableKey(e.target.value)}
                      placeholder="Key"
                      className="flex-1 p-1 bg-gray-700 border border-gray-600 rounded text-xs text-white"
                    />
                    <input
                      type="text"
                      value={newVariableValue}
                      onChange={(e) => setNewVariableValue(e.target.value)}
                      placeholder="Value"
                      className="flex-1 p-1 bg-gray-700 border border-gray-600 rounded text-xs text-white"
                    />
                    <button
                      onClick={addVariable}
                      className="p-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* History */}
            <div className="p-4 flex-1 overflow-y-auto">
              <h3 className="font-medium text-gray-300 mb-3">History</h3>
              <div className="space-y-1">
                {requestHistory.slice(0, 10).map((request) => (
                  <button
                    key={request.id}
                    onClick={() => loadRequest(request)}
                    className="w-full text-left p-2 rounded text-sm hover:bg-gray-700 flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <span className={`px-1 py-0.5 rounded text-xs font-medium ${getMethodColor(request.method)}`}>
                      {request.method}
                    </span>
                    <span className="truncate">{request.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Request Builder */}
          <div className="bg-gray-900 border-b border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                placeholder="Request name"
                className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-sm text-white placeholder-gray-400"
              />
              <button
                onClick={saveRequestToCollection}
                className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>

            {/* Request Line */}
            <div className="flex gap-2 mb-4">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className={`px-3 py-2 rounded text-sm font-medium text-white ${getMethodColor(method)}`}
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
                placeholder="Enter request URL"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
              />
              <button
                onClick={sendRequest}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-4">
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
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'params' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Query Parameters</span>
                  <button
                    onClick={addParam}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                {params.map((param, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={param.enabled}
                      onChange={(e) => updateParam(index, 'enabled', e.target.checked)}
                      className="mt-2"
                    />
                    <input
                      type="text"
                      value={param.key}
                      onChange={(e) => updateParam(index, 'key', e.target.value)}
                      placeholder="Key"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                    />
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => updateParam(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                    />
                    <button
                      onClick={() => removeParam(index)}
                      className="p-2 text-red-400 hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Headers</span>
                  <button
                    onClick={addHeader}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                {Object.entries(headers).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-400"
                    />
                    <input
                      type="text"
                      value={value}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-400"
                    />
                    <button
                      onClick={() => removeHeader(key)}
                      className="p-2 text-red-400 hover:bg-red-900/20 rounded"
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
                    placeholder="Key"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    value={newHeaderValue}
                    onChange={(e) => setNewHeaderValue(e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                  />
                  <button
                    onClick={addHeader}
                    className="p-2 bg-orange-600 text-white rounded hover:bg-orange-700"
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
                  placeholder="Raw JSON data..."
                  className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 font-mono text-sm"
                />
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-3">
                {tests.map((test, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={test}
                      onChange={(e) => {
                        const newTests = [...tests];
                        newTests[index] = e.target.value;
                        setTests(newTests);
                      }}
                      placeholder="pm.test('Test name', () => { ... });"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 font-mono text-sm"
                      rows={3}
                    />
                    <button
                      onClick={() => {
                        const newTests = tests.filter((_, i) => i !== index);
                        setTests(newTests);
                      }}
                      className="p-2 text-red-400 hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setTests([...tests, ''])}
                  className="flex items-center gap-2 px-3 py-2 text-orange-500 hover:bg-orange-500/10 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Test
                </button>
              </div>
            )}
          </div>

          {/* Response */}
          {response && (
            <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">Response</h3>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(response.status)}`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {response.time}ms
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {formatFileSize(response.size)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyResponse}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Response Tabs */}
              <div className="border-b border-gray-700 mb-4">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'body', label: 'Body' },
                    { id: 'headers', label: 'Headers' },
                    { id: 'tests', label: 'Tests' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setResponseTab(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        responseTab === tab.id
                          ? 'border-orange-500 text-orange-500'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Response Content */}
              {responseTab === 'body' && (
                <div className="bg-gray-800 rounded p-4">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              )}

              {responseTab === 'headers' && (
                <div className="bg-gray-800 rounded p-4">
                  <div className="space-y-2">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {responseTab === 'tests' && (
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-sm text-gray-400">
                    Tests will be executed here...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded p-4 m-4">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <XCircle className="w-5 h-5" />
                <h3 className="font-medium">Error</h3>
              </div>
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
