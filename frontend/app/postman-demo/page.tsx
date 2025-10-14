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
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<RequestResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const collections = [
    { id: '1', name: 'To-Do API Testing', expanded: true, requests: [
      { id: '1-1', name: 'GET Получить все задачи', method: 'GET', url: '/todos', status: 200 },
      { id: '1-2', name: 'POST Создать задачу', method: 'POST', url: '/todos', status: 201 },
      { id: '1-3', name: 'PUT Обновить задачу', method: 'PUT', url: '/todos/1', status: 200 },
      { id: '1-4', name: 'PATCH Изменить статус', method: 'PATCH', url: '/todos/1/toggle', status: 200 },
      { id: '1-5', name: 'DELETE Удалить задачу', method: 'DELETE', url: '/todos/1', status: 204 }
    ]},
    { id: '2', name: 'Swagger Petstore', expanded: false, requests: [
      { id: '2-1', name: 'GET /pets', method: 'GET', url: '/pets', status: 200 },
      { id: '2-2', name: 'POST /pets', method: 'POST', url: '/pets', status: 201 }
    ]}
  ];

  const environments = [
    { id: '1', name: 'To-Do Local', active: true },
    { id: '2', name: 'To-Do Production', active: false }
  ];

  const runCollection = async () => {
    setIsRunning(true);
    setShowResults(true);
    
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
              <div className={`flex items-center space-x-2 p-2 rounded ${activeTab === 'collections' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}>
                <Folder className="w-4 h-4" />
                <span className="text-sm">Collections</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Environments</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Flows</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <Code className="w-4 h-4" />
                <span className="text-sm">Mock servers</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <History className="w-4 h-4" />
                <span className="text-sm">History</span>
              </div>
            </div>
          </div>

          <div className="px-4">
            <input 
              type="text" 
              placeholder="Search collections" 
              className="w-full bg-gray-700 text-white px-2 py-1 rounded text-sm"
            />
          </div>

          <div className="mt-4 px-4">
            {collections.map(collection => (
              <div key={collection.id} className="mb-2">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-sm">{collection.name}</span>
                </div>
                {collection.expanded && (
                  <div className="ml-4 space-y-1">
                    {collection.requests.map(request => (
                      <div 
                        key={request.id}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() => setSelectedRequest(request.id)}
                      >
                        <span className={`px-2 py-1 rounded text-xs ${getMethodColor(request.method)}`}>
                          {request.method}
                        </span>
                        <span className="text-sm text-gray-300">{request.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-white border-b">
            <div className="flex items-center space-x-4 px-4 py-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">To-Do API Testing</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">ERROR</span>
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
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
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
                        />
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                        Отправить запрос
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

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🎯 Как использовать демо</h3>
                  <ol className="list-decimal pl-5 text-blue-700 space-y-1">
                    <li>Изучите интерфейс - он максимально похож на настоящий Postman</li>
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
                        <h1 className="text-2xl font-bold text-gray-900">To-Do API Testing - Run results</h1>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Ran on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
                          <span>•</span>
                          <span>Environment: To-Do Local</span>
                          <span>•</span>
                          <span>Iterations: 1</span>
                          <span>•</span>
                          <span>Duration: 1s 327ms</span>
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
                        <div className="text-2xl font-bold text-gray-900">5</div>
                        <div className="text-sm text-gray-600">All tests</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">2</div>
                        <div className="text-sm text-gray-600">Passed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-sm text-gray-600">Failed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">29ms</div>
                        <div className="text-sm text-gray-600">Avg. Resp. Time</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 mb-4">Iteration 1</h3>
                      {results.map((result, index) => (
                        <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(result.method)}`}>
                              {result.method}
                            </span>
                            <div>
                              <div className="font-medium text-gray-900">{result.url}</div>
                              <div className="text-sm text-gray-600">
                                {result.method === 'GET' && 'Получение всех задач'}
                                {result.method === 'POST' && 'Создание задачи'}
                                {result.method === 'PUT' && 'Обновление задачи'}
                                {result.method === 'PATCH' && 'Изменение статуса'}
                                {result.method === 'DELETE' && 'Удаление задачи'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-600">No tests found</span>
                            <span className={`font-medium ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                            <span className="text-gray-600">{result.responseTime}ms</span>
                            <span className="text-gray-600">{result.size}</span>
                          </div>
                        </div>
                      ))}
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
    </div>
  );
}
