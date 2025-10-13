"use client";

import { useState } from "react";

export default function NetworkDemoPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function send(method: "GET" | "POST" | "PUT" | "DELETE") {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/devtools-demo", {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "GET" || method === "DELETE" ? undefined : JSON.stringify({ example: "data", method }),
      });
      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setError(e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Демо для вкладки Network</h1>
        <p className="text-gray-600 mb-8">
          Нажимайте на кнопки ниже, чтобы отправлять запросы к <code>/api/devtools-demo</code> и наблюдайте их во вкладке <strong>Network</strong> в DevTools.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button onClick={() => send("GET")} className="btn btn-secondary">GET</button>
          <button onClick={() => send("POST")} className="btn btn-primary">POST</button>
          <button onClick={() => send("PUT")} className="btn btn-warning">PUT</button>
          <button onClick={() => send("DELETE")} className="btn btn-danger">DELETE</button>
        </div>

        {loading && (
          <div className="p-4 bg-white rounded-lg shadow">Выполняется запрос...</div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg shadow">{error}</div>
        )}

        {result && (
          <pre className="p-4 bg-white rounded-lg shadow overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
        )}

        <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-800 mb-2">Как использовать</h2>
          <ol className="list-decimal pl-5 text-blue-700 space-y-1">
            <li>Откройте DevTools (F12)</li>
            <li>Перейдите на вкладку Network</li>
            <li>Нажмите на любую кнопку выше (GET/POST/PUT/DELETE)</li>
            <li>Найдите запрос <code>/api/devtools-demo</code> и изучите Headers/Response/Timing</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
