'use client';

import { useState, useEffect } from 'react';
import { Play, Copy, Save, Trash2, Plus, Minus, ChevronDown, ChevronRight } from 'lucide-react';

interface APIRequest {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  name: string;
}

interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
}

export default function APITester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('/api/tasks');
  const [headers, setHeaders] = useState<Record<string, string>>({
    'Content-Type': 'application/json'
  });
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedRequests, setSavedRequests] = useState<APIRequest[]>([]);
  const [showHeaders, setShowHeaders] = useState(true);
  const [showBody, setShowBody] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');

  // Загружаем сохраненные запросы из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('api-tester-requests');
    if (saved) {
      setSavedRequests(JSON.parse(saved));
    }
  }, []);

  // Сохраняем запросы в localStorage
  const saveRequests = (requests: APIRequest[]) => {
    setSavedRequests(requests);
    localStorage.setItem('api-tester-requests', JSON.stringify(requests));
  };

  // Отправка запроса
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

      const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
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

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        data: responseData,
        time: endTime - startTime
      });

      setShowResponse(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке запроса');
    } finally {
      setLoading(false);
    }
  };

  // Добавление нового заголовка
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

  // Удаление заголовка
  const removeHeader = (key: string) => {
    setHeaders(prev => {
      const newHeaders = { ...prev };
      delete newHeaders[key];
      return newHeaders;
    });
  };

  // Сохранение запроса
  const saveRequest = () => {
    const requestName = prompt('Введите название запроса:');
    if (requestName) {
      const newRequest: APIRequest = {
        id: Date.now().toString(),
        method,
        url,
        headers,
        body,
        name: requestName
      };
      saveRequests([...savedRequests, newRequest]);
    }
  };

  // Загрузка сохраненного запроса
  const loadRequest = (request: APIRequest) => {
    setMethod(request.method);
    setUrl(request.url);
    setHeaders(request.headers);
    setBody(request.body);
  };

  // Удаление сохраненного запроса
  const deleteRequest = (id: string) => {
    saveRequests(savedRequests.filter(req => req.id !== id));
  };

  // Копирование cURL команды
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

  // Копирование ответа
  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-50';
    if (status >= 300 && status < 400) return 'text-blue-600 bg-blue-50';
    if (status >= 400 && status < 500) return 'text-yellow-600 bg-yellow-50';
    if (status >= 500) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Заголовок */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🌐 API Тестер
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={saveRequest}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
            <button
              onClick={copyCurl}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              cURL
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Строка запроса */}
        <div className="flex gap-2">
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

        {/* Заголовки */}
        <div className="border border-gray-200 rounded-md">
          <button
            onClick={() => setShowHeaders(!showHeaders)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-900">Headers</span>
            {showHeaders ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          {showHeaders && (
            <div className="p-4 space-y-3">
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
        </div>

        {/* Тело запроса */}
        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <div className="border border-gray-200 rounded-md">
            <button
              onClick={() => setShowBody(!showBody)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">Body</span>
              {showBody ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {showBody && (
              <div className="p-4">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="JSON данные..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                />
              </div>
            )}
          </div>
        )}

        {/* Ошибка */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Ответ */}
        {response && (
          <div className="border border-gray-200 rounded-md">
            <button
              onClick={() => setShowResponse(!showResponse)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">Response</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(response.status)}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="text-xs text-gray-500">{response.time}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyResponse}
                  className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {showResponse ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </button>
            {showResponse && (
              <div className="p-4 bg-gray-50">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Сохраненные запросы */}
        {savedRequests.length > 0 && (
          <div className="border border-gray-200 rounded-md">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">Сохраненные запросы</h4>
            </div>
            <div className="p-4 space-y-2">
              {savedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      request.method === 'GET' ? 'bg-green-100 text-green-800' :
                      request.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      request.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      request.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.method}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{request.name}</span>
                    <span className="text-xs text-gray-500">{request.url}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadRequest(request)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


