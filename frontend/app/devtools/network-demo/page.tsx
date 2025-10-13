"use client";

import { useState } from "react";

export default function NetworkDemoPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function send(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", scenario?: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const url = scenario ? `/api/devtools-demo?scenario=${scenario}` : "/api/devtools-demo";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "GET" || method === "DELETE" ? undefined : JSON.stringify({ example: "data", method, scenario }),
      });
      const json = await res.json();
      setResult({
        ...json,
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries())
      });
    } catch (e: any) {
      setError(e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Кнопка возврата */}
        <div className="mb-6">
          <a
            href="/devtools"
            className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <span>←</span>
            Назад к урокам DevTools
          </a>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Демо для вкладки Network</h1>
        <p className="text-gray-600 mb-8">
          Нажимайте на кнопки ниже, чтобы отправлять различные типы запросов к <code>/api/devtools-demo</code> и наблюдайте их во вкладке <strong>Network</strong> в DevTools.
        </p>

        {/* Базовые HTTP методы */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🔧 HTTP методы</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <button onClick={() => send("GET")} className="btn btn-secondary">GET</button>
            <button onClick={() => send("POST")} className="btn btn-primary">POST</button>
            <button onClick={() => send("PUT")} className="btn btn-warning">PUT</button>
            <button onClick={() => send("PATCH")} className="btn bg-indigo-600 hover:bg-indigo-700 text-white">PATCH</button>
            <button onClick={() => send("DELETE")} className="btn btn-danger">DELETE</button>
          </div>
          
          {/* Объяснения о методах */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🛡️ Безопасные методы</h3>
              <p className="text-green-700 text-sm mb-2">Не изменяют состояние сервера:</p>
              <ul className="text-green-600 text-sm space-y-1">
                <li>• <strong>GET</strong> - только чтение данных</li>
                <li>• <strong>HEAD</strong> - как GET, но без тела ответа</li>
                <li>• <strong>OPTIONS</strong> - получение доступных методов</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🔄 Идемпотентные методы</h3>
              <p className="text-blue-700 text-sm mb-2">Повторное выполнение дает тот же результат:</p>
              <ul className="text-blue-600 text-sm space-y-1">
                <li>• <strong>GET</strong> - всегда возвращает те же данные</li>
                <li>• <strong>PUT</strong> - полная замена ресурса</li>
                <li>• <strong>DELETE</strong> - удаление (повторное = уже удален)</li>
                <li>• <strong>PATCH</strong> - частичное обновление (может быть идемпотентным)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Сценарии с ошибками */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">❌ Сценарии с ошибками</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button onClick={() => send("GET", "error")} className="btn bg-red-600 hover:bg-red-700 text-white">GET 500 Error</button>
            <button onClick={() => send("GET", "not-found")} className="btn bg-red-500 hover:bg-red-600 text-white">GET 404 Not Found</button>
            <button onClick={() => send("GET", "unauthorized")} className="btn bg-red-400 hover:bg-red-500 text-white">GET 401 Unauthorized</button>
            <button onClick={() => send("POST", "validation-error")} className="btn bg-orange-600 hover:bg-orange-700 text-white">POST 400 Validation</button>
            <button onClick={() => send("PUT", "conflict")} className="btn bg-yellow-600 hover:bg-yellow-700 text-white">PUT 409 Conflict</button>
            <button onClick={() => send("PATCH", "validation-error")} className="btn bg-orange-500 hover:bg-orange-600 text-white">PATCH 400 Validation</button>
            <button onClick={() => send("PATCH", "not-found")} className="btn bg-red-300 hover:bg-red-400 text-white">PATCH 404 Not Found</button>
            <button onClick={() => send("DELETE", "forbidden")} className="btn bg-purple-600 hover:bg-purple-700 text-white">DELETE 403 Forbidden</button>
          </div>
        </div>

        {/* Сценарии производительности */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">⏱️ Сценарии производительности</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button onClick={() => send("GET", "slow")} className="btn bg-blue-600 hover:bg-blue-700 text-white">GET Slow (3s)</button>
            <button onClick={() => send("POST", "slow")} className="btn bg-blue-500 hover:bg-blue-600 text-white">POST Slow (2s)</button>
            <button onClick={() => send("PATCH", "partial-update")} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">PATCH Partial Update</button>
            <button onClick={() => send("GET", "large")} className="btn bg-green-600 hover:bg-green-700 text-white">GET Large Data</button>
          </div>
        </div>

        {loading && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Выполняется запрос...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow">
            <h3 className="font-semibold mb-2">❌ Ошибка запроса</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Статус ответа */}
            <div className={`p-4 rounded-lg border ${
              result.status >= 200 && result.status < 300 
                ? 'bg-green-50 border-green-200' 
                : result.status >= 400 
                ? 'bg-red-50 border-red-200' 
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <h3 className="font-semibold mb-2">
                {result.status >= 200 && result.status < 300 ? '✅' : '❌'} Статус ответа
              </h3>
              <p className="text-sm">
                <strong>{result.status}</strong> {result.statusText}
              </p>
            </div>

            {/* Заголовки */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">📋 Заголовки ответа</h3>
              <pre className="text-xs overflow-auto">{JSON.stringify(result.headers, null, 2)}</pre>
            </div>

            {/* Тело ответа */}
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">📄 Тело ответа</h3>
              <pre className="text-sm overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}

        <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-800 mb-2">🎯 Как использовать для изучения Network</h2>
          <ol className="list-decimal pl-5 text-blue-700 space-y-2">
            <li>Откройте DevTools (F12) и перейдите на вкладку <strong>Network</strong></li>
            <li>Очистите список запросов кнопкой <strong>🚫 (Clear)</strong></li>
            <li>Нажмите на любую кнопку выше для отправки запроса</li>
            <li>Найдите запрос <code>/api/devtools-demo</code> в списке</li>
            <li>Изучите разные аспекты запроса:</li>
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li><strong>Headers</strong> - заголовки запроса и ответа</li>
              <li><strong>Response</strong> - содержимое ответа сервера</li>
              <li><strong>Timing</strong> - время загрузки и фазы запроса</li>
              <li><strong>Status</strong> - код ответа (200, 404, 500 и др.)</li>
            </ul>
            <li>Сравните разные типы запросов: успешные (зеленые) и с ошибками (красные)</li>
            <li>Обратите внимание на время загрузки медленных запросов</li>
            <li>Изучите разницу между PUT (полная замена) и PATCH (частичное обновление)</li>
            <li>Поняйте концепции безопасных методов (GET) и идемпотентных методов (GET, PUT, DELETE)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
