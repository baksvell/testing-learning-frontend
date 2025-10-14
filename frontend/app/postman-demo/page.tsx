"use client";

import { useState } from "react";
import { 
  Send, Folder, Settings, History, Zap, CheckCircle, 
  AlertTriangle, Clock, Download, Copy, Save, Play, 
  ChevronRight, Search, Bell, User, Plus, Trash2,
  Globe, Code, Shield, BookOpen, Target, Trophy, Users
} from 'lucide-react';

interface RequestResult {
  id: string;
  method: string;
  url: string;
  status: number;
  responseTime: number;
  size: string;
  tests: number;
  passed: number;
  failed: number;
}

export default function PostmanDemoPage() {
  const [activeTab, setActiveTab] = useState('collections');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestUrl, setRequestUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [requestBody, setRequestBody] = useState('');
  const [requestHeaders, setRequestHeaders] = useState('{"Content-Type": "application/json"}');
  const [isRunning, setIsRunning] = useState(false);
  const [isRunningSingle, setIsRunningSingle] = useState(false);
  const [results, setResults] = useState<RequestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [singleResult, setSingleResult] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [responseHeaders, setResponseHeaders] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({
    '1': true,
    '2': false
  });
  const [history, setHistory] = useState<any[]>([]);
  const [environments, setEnvironments] = useState<any[]>([]);
  const [mockServers, setMockServers] = useState<any[]>([]);
  const [flows, setFlows] = useState<any[]>([]);
  const [showNewRunModal, setShowNewRunModal] = useState(false);
  const [newRunConfig, setNewRunConfig] = useState({
    iterations: 1,
    delay: 0,
    environment: 'To-Do Local',
    dataFile: '',
    continueOnError: false
  });

  const collections = [
    { id: '1', name: 'Быстрые примеры (мгновенно)', expanded: true, requests: [
      { id: '1-1', name: 'GET Post by ID', method: 'GET', url: '/posts/1', status: 200 },
      { id: '1-2', name: 'POST Create Post', method: 'POST', url: '/posts', status: 201 },
      { id: '1-3', name: 'GET 404 Error', method: 'GET', url: '/posts/999', status: 404 },
      { id: '1-4', name: 'GET Slow Request', method: 'GET', url: '/delay/2', status: 200 }
    ]},
    { id: '2', name: 'Наше API - Testing Platform (медленно)', expanded: false, requests: [
      { id: '2-1', name: 'GET Root - Информация об API', method: 'GET', url: '/', status: 200 },
      { id: '2-2', name: 'GET Health - Проверка состояния', method: 'GET', url: '/health', status: 200 },
      { id: '2-3', name: 'GET Tasks - Список задач', method: 'GET', url: '/api/tasks', status: 200 },
      { id: '2-4', name: 'GET Task by ID - Конкретная задача', method: 'GET', url: '/api/tasks/1', status: 200 },
      { id: '2-5', name: 'GET Stats - Статистика платформы', method: 'GET', url: '/api/stats', status: 200 },
      { id: '2-6', name: 'GET DB Test - Тест базы данных', method: 'GET', url: '/api/database/test', status: 200 }
    ]}
  ];

  const environmentsData = [
    { id: '1', name: 'Testing Platform Production', active: true, variables: [
      { key: 'baseUrl', value: 'https://testing-learning-backend.onrender.com', enabled: true },
      { key: 'apiVersion', value: '2.0.0', enabled: true }
    ]},
    { id: '2', name: 'Testing Platform Local', active: false, variables: [
      { key: 'baseUrl', value: 'http://localhost:8000', enabled: true },
      { key: 'apiVersion', value: '2.0.0', enabled: true }
    ]}
  ];

  const historyData = [
    { id: '1', method: 'GET', url: 'https://testing-learning-backend.onrender.com/api/tasks', time: '2 min ago' },
    { id: '2', method: 'GET', url: 'https://testing-learning-backend.onrender.com/health', time: '5 min ago' },
    { id: '3', method: 'GET', url: 'https://testing-learning-backend.onrender.com/api/stats', time: '10 min ago' }
  ];

  const mockServersData = [
    { id: '1', name: 'To-Do Mock Server', url: 'https://mock-server-123.postman.co', status: 'Active' },
    { id: '2', name: 'Petstore Mock', url: 'https://mock-petstore-456.postman.co', status: 'Paused' }
  ];

  const flowsData = [
    { id: '1', name: 'User Registration Flow', description: 'Complete user registration process', status: 'Draft' },
    { id: '2', name: 'Order Processing Flow', description: 'Process orders from creation to completion', status: 'Published' }
  ];

  const toggleCollection = (collectionId: string) => {
    setExpandedCollections(prev => ({
      ...prev,
      [collectionId]: !prev[collectionId]
    }));
  };

  const selectRequest = (requestId: string) => {
    setSelectedRequest(requestId);
    const request = collections.find(c => c.requests.some(r => r.id === requestId))?.requests.find(r => r.id === requestId);
    if (request) {
      setRequestMethod(request.method);
      
      // Определяем базовый URL в зависимости от коллекции
      let baseUrl = '';
      if (requestId.startsWith('1-')) {
        // Быстрые примеры
        if (request.url.includes('/delay/')) {
          baseUrl = 'https://httpbin.org';
        } else {
          baseUrl = 'https://jsonplaceholder.typicode.com';
        }
      } else if (requestId.startsWith('2-')) {
        // Наши реальные API
        baseUrl = 'https://testing-learning-backend.onrender.com';
      }
      
      setRequestUrl(`${baseUrl}${request.url}`);
      
      if (request.method === 'POST' || request.method === 'PUT') {
        if (requestId.startsWith('2-')) {
          // Для наших API
          setRequestBody('{"solution": "Test solution", "notes": "Test notes"}');
        } else {
          // Для быстрых примеров
          setRequestBody('{"title": "Test", "body": "Test body", "userId": 1}');
        }
      } else {
        setRequestBody('');
      }
    }
  };

  const addToHistory = (method: string, url: string) => {
    const newHistoryItem = {
      id: Date.now().toString(),
      method,
      url,
      time: 'Just now'
    };
    setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep only last 10 items
  };

  const createNewRun = () => {
    setShowNewRunModal(true);
  };

  const startNewRun = async () => {
    setIsRunning(true);
    setShowResults(true);
    setResults([]);
    setShowNewRunModal(false);
    
    // Симуляция выполнения с настройками
    const mockResults: RequestResult[] = [];
    
    for (let iteration = 0; iteration < newRunConfig.iterations; iteration++) {
      const baseUrl = newRunConfig.environment === 'Testing Platform Local' ? 'http://localhost:8000' : 'https://testing-learning-backend.onrender.com';
      
      const iterationResults = [
        {
          id: `${iteration}-1`,
          method: 'GET',
          url: `${baseUrl}/`,
          status: 200,
          responseTime: 45 + Math.random() * 20,
          size: '1.2 KB',
          tests: 3,
          passed: 3,
          failed: 0
        },
        {
          id: `${iteration}-2`,
          method: 'GET',
          url: `${baseUrl}/health`,
          status: 200,
          responseTime: 67 + Math.random() * 20,
          size: '283 B',
          tests: 2,
          passed: 2,
          failed: 0
        },
        {
          id: `${iteration}-3`,
          method: 'GET',
          url: `${baseUrl}/api/tasks`,
          status: 200,
          responseTime: 12 + Math.random() * 10,
          size: '1.5 KB',
          tests: 1,
          passed: 1,
          failed: 0
        },
        {
          id: `${iteration}-4`,
          method: 'GET',
          url: `${baseUrl}/api/stats`,
          status: 200,
          responseTime: 8 + Math.random() * 5,
          size: '159 B',
          tests: 1,
          passed: 1,
          failed: 0
        }
      ];
      
      mockResults.push(...iterationResults);
      
      // Задержка между итерациями
      if (iteration < newRunConfig.iterations - 1 && newRunConfig.delay > 0) {
        await new Promise(resolve => setTimeout(resolve, newRunConfig.delay * 1000));
      }
    }

    // Анимация выполнения
    for (let i = 0; i < mockResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setResults(prev => [...prev, mockResults[i]]);
    }
    
    setIsRunning(false);
  };

  const sendSingleRequest = async () => {
    setIsRunningSingle(true);
    setSingleResult(null);
    setResponseData(null);
    setResponseHeaders(null);
    
    const startTime = Date.now();
    
    try {
      let headers: any = {};
      try {
        headers = JSON.parse(requestHeaders);
      } catch (e) {
        headers = { 'Content-Type': 'application/json' };
      }

      const requestOptions: RequestInit = {
        method: requestMethod,
        headers: headers,
      };

      if (requestMethod !== 'GET' && requestBody.trim()) {
        requestOptions.body = requestBody;
      }

      const response = await fetch(requestUrl, requestOptions);
      const endTime = Date.now();
      const responseTimeMs = endTime - startTime;
      
      let responseText = '';
      let responseJson = null;
      
      try {
        responseText = await response.text();
        responseJson = JSON.parse(responseText);
      } catch (e) {
        responseJson = responseText;
      }

      const responseHeadersObj: any = {};
      response.headers.forEach((value, key) => {
        responseHeadersObj[key] = value;
      });

      setResponseTime(responseTimeMs);
      setResponseData(responseJson);
      setResponseHeaders(responseHeadersObj);
      setSingleResult({
        status: response.status,
        statusText: response.statusText,
        responseTime: responseTimeMs,
        size: `${Math.round(responseText.length / 1024 * 100) / 100} KB`,
        url: requestUrl,
        method: requestMethod
      });

      // Add to history
      addToHistory(requestMethod, requestUrl);

    } catch (error: any) {
      setSingleResult({
        status: 0,
        statusText: 'Network Error',
        responseTime: Date.now() - startTime,
        size: '0 B',
        url: requestUrl,
        method: requestMethod,
        error: error.message
      });
    }
    
    setIsRunningSingle(false);
  };

  const runCollection = async () => {
    setIsRunning(true);
    setShowResults(true);
    setResults([]);
    
    // Симуляция выполнения запросов
    const mockResults: RequestResult[] = [
      {
        id: '1',
        method: 'GET',
        url: 'http://127.0.0.1:8000/todos',
        status: 200,
        responseTime: 45,
        size: '1.2 KB',
        tests: 3,
        passed: 3,
        failed: 0
      },
      {
        id: '2',
        method: 'POST',
        url: 'http://127.0.0.1:8000/todos',
        status: 201,
        responseTime: 67,
        size: '283 B',
        tests: 2,
        passed: 2,
        failed: 0
      },
      {
        id: '3',
        method: 'PUT',
        url: 'http://127.0.0.1:8000/todos/1',
        status: 404,
        responseTime: 12,
        size: '159 B',
        tests: 1,
        passed: 0,
        failed: 1
      },
      {
        id: '4',
        method: 'PATCH',
        url: 'http://127.0.0.1:8000/todos/1/toggle',
        status: 404,
        responseTime: 8,
        size: '159 B',
        tests: 1,
        passed: 0,
        failed: 1
      },
      {
        id: '5',
        method: 'DELETE',
        url: 'http://127.0.0.1:8000/todos/1',
        status: 404,
        responseTime: 15,
        size: '159 B',
        tests: 1,
        passed: 0,
        failed: 1
      }
    ];

    // Анимация выполнения
    for (let i = 0; i < mockResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setResults(prev => [...prev, mockResults[i]]);
    }
    
    setIsRunning(false);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="font-semibold">Postman</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="hover:text-orange-300 cursor-pointer">Home</span>
              <span className="hover:text-orange-300 cursor-pointer">Workspaces</span>
              <span className="hover:text-orange-300 cursor-pointer">API Network</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Postman" 
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm w-64"
              />
              <span className="absolute right-2 top-1 text-xs text-gray-400">Ctrl K</span>
            </div>
            <Bell className="w-5 h-5 hover:text-orange-300 cursor-pointer" />
            <User className="w-5 h-5 hover:text-orange-300 cursor-pointer" />
            <button className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">My Workspace</span>
              <div className="flex space-x-2">
                <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs">New</button>
                <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs">Import</button>
              </div>
            </div>
            
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('collections')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${activeTab === 'collections' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
              >
                <Folder className="w-4 h-4" />
                <span className="text-sm">Collections</span>
              </button>
              <button 
                onClick={() => setActiveTab('environments')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${activeTab === 'environments' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">Environments</span>
              </button>
              <button 
                onClick={() => setActiveTab('flows')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${activeTab === 'flows' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm">Flows</span>
              </button>
              <button 
                onClick={() => setActiveTab('mock-servers')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${activeTab === 'mock-servers' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
              >
                <Code className="w-4 h-4" />
                <span className="text-sm">Mock servers</span>
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${activeTab === 'history' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
              >
                <History className="w-4 h-4" />
                <span className="text-sm">History</span>
              </button>
            </div>
          </div>

          <div className="px-4">
            <input 
              type="text" 
              placeholder={
                activeTab === 'collections' ? 'Search collections' :
                activeTab === 'environments' ? 'Search environments' :
                activeTab === 'flows' ? 'Search flows' :
                activeTab === 'mock-servers' ? 'Search mock servers' :
                'Search history'
              }
              className="w-full bg-gray-700 text-white px-2 py-1 rounded text-sm"
            />
          </div>

          <div className="mt-4 px-4">
            {activeTab === 'collections' && (
              <>
                {collections.map(collection => (
                  <div key={collection.id} className="mb-2">
                    <button 
                      onClick={() => toggleCollection(collection.id)}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedCollections[collection.id] ? 'rotate-90' : ''}`} />
                      <span className="text-sm">{collection.name}</span>
                    </button>
                    {expandedCollections[collection.id] && (
                      <div className="ml-4 space-y-1">
                        {collection.requests.map(request => (
                          <button 
                            key={request.id}
                            onClick={() => selectRequest(request.id)}
                            className={`w-full flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer ${selectedRequest === request.id ? 'bg-gray-600' : ''}`}
                          >
                            <span className={`px-2 py-1 rounded text-xs ${getMethodColor(request.method)}`}>
                              {request.method}
                            </span>
                            <span className="text-sm text-gray-300">{request.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {activeTab === 'environments' && (
              <div className="space-y-2">
                {environmentsData.map(env => (
                  <div key={env.id} className="p-2 hover:bg-gray-700 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{env.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${env.active ? 'bg-green-600' : 'bg-gray-600'}`}>
                        {env.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {env.variables.length} variables
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'flows' && (
              <div className="space-y-2">
                {flowsData.map(flow => (
                  <div key={flow.id} className="p-2 hover:bg-gray-700 rounded">
                    <div className="text-sm font-medium">{flow.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{flow.description}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${flow.status === 'Published' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                        {flow.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'mock-servers' && (
              <div className="space-y-2">
                {mockServersData.map(server => (
                  <div key={server.id} className="p-2 hover:bg-gray-700 rounded">
                    <div className="text-sm font-medium">{server.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{server.url}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${server.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'}`}>
                        {server.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-2">
                {[...history, ...historyData].slice(0, 10).map((item, index) => (
                  <button 
                    key={item.id || index}
                    onClick={() => {
                      setRequestMethod(item.method);
                      setRequestUrl(item.url);
                      setRequestBody('');
                    }}
                    className="w-full p-2 hover:bg-gray-700 rounded text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getMethodColor(item.method)}`}>
                        {item.method}
                      </span>
                      <span className="text-sm text-gray-300 truncate">{item.url}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-white border-b">
            <div className="flex items-center space-x-4 px-4 py-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Postman Demo - API Testing</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">ACTIVE</span>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={runCollection}
                  disabled={isRunning}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? 'Running...' : 'Run Collection'}</span>
                </button>
                <button 
                  onClick={createNewRun}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
                >
                  New Run
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {!showResults ? (
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <a href="/postman-lessons" className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <span>←</span>
                    Назад к урокам Postman
                  </a>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Демо Postman - Тестирование API</h1>
                <p className="text-gray-600 mb-8">
                  Это интерактивная демонстрация Postman для изучения тестирования API. 
                  Интерфейс максимально приближен к настоящему Postman.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Send className="w-5 h-5 mr-2 text-blue-600" />
                      Отправка запросов
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Метод HTTP</label>
                        <select 
                          value={requestMethod}
                          onChange={(e) => setRequestMethod(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="PATCH">PATCH</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                        <input 
                          type="text"
                          value={requestUrl}
                          onChange={(e) => setRequestUrl(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="https://jsonplaceholder.typicode.com/posts"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Headers (JSON)</label>
                        <textarea 
                          value={requestHeaders}
                          onChange={(e) => setRequestHeaders(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 font-mono text-sm"
                          placeholder='{"Content-Type": "application/json"}'
                        />
                      </div>
                      {requestMethod !== 'GET' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Body (JSON)</label>
                          <textarea 
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 font-mono text-sm"
                            placeholder='{"title": "Test", "body": "Test body", "userId": 1}'
                          />
                        </div>
                      )}
                      <button 
                        onClick={sendSingleRequest}
                        disabled={isRunningSingle}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isRunningSingle ? 'Отправка...' : 'Отправить запрос'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-green-600" />
                      Запуск коллекции
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Запустите всю коллекцию тестов одним кликом и посмотрите результаты.
                    </p>
                    <button 
                      onClick={runCollection}
                      disabled={isRunning}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isRunning ? 'Выполняется...' : 'Запустить коллекцию'}</span>
                    </button>
                  </div>
                </div>

                {/* Результаты одиночного запроса */}
                {singleResult && (
                  <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold text-gray-900">Результат запроса</h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getStatusColor(singleResult.status)}`}>
                            {singleResult.status}
                          </div>
                          <div className="text-sm text-gray-600">Status</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{singleResult.responseTime}ms</div>
                          <div className="text-sm text-gray-600">Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{singleResult.size}</div>
                          <div className="text-sm text-gray-600">Size</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{singleResult.method}</div>
                          <div className="text-sm text-gray-600">Method</div>
                        </div>
                      </div>
                      
                      {singleResult.error && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded mb-4">
                          <div className="text-red-800 font-medium">Ошибка:</div>
                          <div className="text-red-700 text-sm">{singleResult.error}</div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Response Headers</h4>
                          <div className="bg-gray-50 p-3 rounded text-sm font-mono max-h-40 overflow-y-auto">
                            <pre>{JSON.stringify(responseHeaders, null, 2)}</pre>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Response Body</h4>
                          <div className="bg-gray-50 p-3 rounded text-sm font-mono max-h-40 overflow-y-auto">
                            <pre>{JSON.stringify(responseData, null, 2)}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Быстрые примеры */}
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">🚀 Быстрые примеры</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">⚡ Быстрые примеры (мгновенно)</h4>
                      <p className="text-sm text-gray-600 mb-3">Для быстрого изучения принципов работы с API</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://jsonplaceholder.typicode.com/posts/1');
                            setRequestBody('');
                          }}
                          className="p-3 border border-green-200 rounded-lg hover:bg-green-50 text-left"
                        >
                          <div className="font-medium text-green-900">GET Post</div>
                          <div className="text-sm text-green-600">Получить пост по ID</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('POST');
                            setRequestUrl('https://jsonplaceholder.typicode.com/posts');
                            setRequestBody('{"title": "Test Post", "body": "This is a test post", "userId": 1}');
                          }}
                          className="p-3 border border-green-200 rounded-lg hover:bg-green-50 text-left"
                        >
                          <div className="font-medium text-green-900">POST Create</div>
                          <div className="text-sm text-green-600">Создать новый пост</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://jsonplaceholder.typicode.com/posts/999');
                            setRequestBody('');
                          }}
                          className="p-3 border border-green-200 rounded-lg hover:bg-green-50 text-left"
                        >
                          <div className="font-medium text-green-900">GET 404 Error</div>
                          <div className="text-sm text-green-600">Тест ошибки 404</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://httpbin.org/delay/2');
                            setRequestBody('');
                          }}
                          className="p-3 border border-green-200 rounded-lg hover:bg-green-50 text-left"
                        >
                          <div className="font-medium text-green-900">GET Slow</div>
                          <div className="text-sm text-green-600">Медленный запрос (2 сек)</div>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">🌐 Наши реальные API (может быть медленно)</h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <div className="text-yellow-600 mt-0.5">⚠️</div>
                          <div className="text-sm text-yellow-800">
                            <strong>Внимание:</strong> Наш бэкенд работает на бесплатном хостинге Render.com. 
                            Первый запрос может занять 10-30 секунд (холодный старт), последующие запросы быстрее. 
                            Если не хотите ждать, используйте быстрые примеры выше.
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://testing-learning-backend.onrender.com/');
                            setRequestBody('');
                          }}
                          className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 text-left"
                        >
                          <div className="font-medium text-blue-900">GET Root</div>
                          <div className="text-sm text-blue-600">Информация о нашем API</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://testing-learning-backend.onrender.com/health');
                            setRequestBody('');
                          }}
                          className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 text-left"
                        >
                          <div className="font-medium text-blue-900">GET Health</div>
                          <div className="text-sm text-blue-600">Проверка состояния API</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://testing-learning-backend.onrender.com/api/tasks');
                            setRequestBody('');
                          }}
                          className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 text-left"
                        >
                          <div className="font-medium text-blue-900">GET Tasks</div>
                          <div className="text-sm text-blue-600">Список всех задач</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://testing-learning-backend.onrender.com/api/tasks/1');
                            setRequestBody('');
                          }}
                          className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 text-left"
                        >
                          <div className="font-medium text-blue-900">GET Task by ID</div>
                          <div className="text-sm text-blue-600">Конкретная задача</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://testing-learning-backend.onrender.com/api/stats');
                            setRequestBody('');
                          }}
                          className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 text-left"
                        >
                          <div className="font-medium text-blue-900">GET Stats</div>
                          <div className="text-sm text-blue-600">Статистика платформы</div>
                        </button>
                        
                        <button
                          onClick={() => {
                            setRequestMethod('GET');
                            setRequestUrl('https://testing-learning-backend.onrender.com/api/database/test');
                            setRequestBody('');
                          }}
                          className="p-3 border border-blue-200 rounded-lg hover:bg-blue-50 text-left"
                        >
                          <div className="font-medium text-blue-900">GET DB Test</div>
                          <div className="text-sm text-blue-600">Тест базы данных</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🎯 Как использовать демо</h3>
                  <ol className="list-decimal pl-5 text-blue-700 space-y-1">
                    <li>Изучите интерфейс - он максимально похож на настоящий Postman</li>
                    <li>Используйте быстрые примеры выше или настройте свой запрос</li>
                    <li>Отправьте одиночный запрос с помощью формы</li>
                    <li>Нажмите "Запустить коллекцию" для выполнения всех тестов</li>
                    <li>Наблюдайте за результатами выполнения в реальном времени</li>
                    <li>Изучите статус-коды, время ответа и размер данных</li>
                    <li>Поняйте разницу между успешными (зеленые) и неудачными (красные) запросами</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                  <a href="/postman-lessons" className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <span>←</span>
                    Назад к урокам Postman
                  </a>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">Testing Platform API - Run results</h1>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Ran on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
                          <span>•</span>
                          <span>Environment: {newRunConfig.environment}</span>
                          <span>•</span>
                          <span>Iterations: {newRunConfig.iterations}</span>
                          <span>•</span>
                          <span>Delay: {newRunConfig.delay}s</span>
                          <span>•</span>
                          <span>Continue on error: {newRunConfig.continueOnError ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                          Run Again
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
                          New Run
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{results.length}</div>
                        <div className="text-sm text-gray-600">All tests</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {results.filter(r => r.status >= 200 && r.status < 300).length}
                        </div>
                        <div className="text-sm text-gray-600">Passed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {results.filter(r => r.status >= 400).length}
                        </div>
                        <div className="text-sm text-gray-600">Failed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">
                          {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.responseTime, 0) / results.length) : 0}ms
                        </div>
                        <div className="text-sm text-gray-600">Avg. Resp. Time</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {Array.from({ length: newRunConfig.iterations }, (_, iterationIndex) => {
                        const iterationResults = results.filter(r => r.id.startsWith(`${iterationIndex}-`));
                        if (iterationResults.length === 0) return null;
                        
                        return (
                          <div key={iterationIndex}>
                            <h3 className="font-semibold text-gray-900 mb-4">Iteration {iterationIndex + 1}</h3>
                            <div className="space-y-2">
                              {iterationResults.map((result, index) => (
                                <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                  <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(result.method)}`}>
                                      {result.method}
                                    </span>
                                    <div>
                                      <div className="font-medium text-gray-900">{result.url}</div>
                                      <div className="text-sm text-gray-600">
                                        {result.url.includes('/') && result.url.split('/').length === 4 && 'Информация об API'}
                                        {result.url.includes('/health') && 'Проверка состояния API'}
                                        {result.url.includes('/api/tasks') && !result.url.includes('/api/tasks/') && 'Список всех задач'}
                                        {result.url.includes('/api/tasks/') && result.url.split('/').length > 4 && 'Конкретная задача'}
                                        {result.url.includes('/api/stats') && 'Статистика платформы'}
                                        {result.url.includes('/api/database/test') && 'Тест базы данных'}
                                        {result.url.includes('jsonplaceholder') && 'Образовательный пример'}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm">
                                    <span className="text-gray-600">No tests found</span>
                                    <span className={`font-medium ${getStatusColor(result.status)}`}>
                                      {result.status}
                                    </span>
                                    <span className="text-gray-600">{Math.round(result.responseTime)}ms</span>
                                    <span className="text-gray-600">{result.size}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">📊 Анализ результатов</h3>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• <strong>GET и POST</strong> запросы выполнились успешно (статус 200/201)</li>
                    <li>• <strong>PUT, PATCH, DELETE</strong> вернули 404 - ресурс не найден</li>
                    <li>• Это типичная ситуация при тестировании API</li>
                    <li>• В реальном тестировании нужно проверить все сценарии</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 border-t px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Online</span>
            <span>Find and replace</span>
            <span className="text-blue-600">Console</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <Zap className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Globe className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Shield className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <BookOpen className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Run Modal */}
      {showNewRunModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Run Configuration</h3>
              <button 
                onClick={() => setShowNewRunModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Iterations
                </label>
                <input 
                  type="number"
                  min="1"
                  max="10"
                  value={newRunConfig.iterations}
                  onChange={(e) => setNewRunConfig(prev => ({ ...prev, iterations: parseInt(e.target.value) || 1 }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Number of times to run the collection (1-10)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delay between requests (seconds)
                </label>
                <input 
                  type="number"
                  min="0"
                  max="10"
                  value={newRunConfig.delay}
                  onChange={(e) => setNewRunConfig(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Add delay between requests to avoid rate limiting</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environment
                </label>
                <select 
                  value={newRunConfig.environment}
                  onChange={(e) => setNewRunConfig(prev => ({ ...prev, environment: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="To-Do Local">To-Do Local</option>
                  <option value="To-Do Production">To-Do Production</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Choose environment for the run</p>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    checked={newRunConfig.continueOnError}
                    onChange={(e) => setNewRunConfig(prev => ({ ...prev, continueOnError: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Continue on error</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">Continue running even if some requests fail</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowNewRunModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={startNewRun}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Start Run</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

