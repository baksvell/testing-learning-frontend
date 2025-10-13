'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎯 Тренажер для тестировщиков
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изучайте инструменты тестирования, DevTools, API и многое другое 
            <strong className="text-blue-600"> бесплатно и без регистрации</strong>
          </p>
        </div>

        {/* Приветственное сообщение */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Добро пожаловать!
            </h2>
            <p className="text-gray-600 mb-6">
              Все тренажеры доступны сразу без регистрации. 
              Выберите интересующую вас тему и начните обучение прямо сейчас!
            </p>
          </div>
        </div>

        {/* Карточки тренажеров */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* DevTools - главный тренажер */}
          <Link 
            href="/devtools" 
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                DevTools Тренажер
              </h3>
              <p className="text-gray-600 mb-4">
                Изучите инструменты разработчика: Console, Elements, Network, Sources и другие
              </p>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                🎯 Рекомендуется
              </div>
            </div>
          </Link>

          {/* API Testing */}
          <Link 
            href="/api" 
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-orange-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                API Тестирование
              </h3>
              <p className="text-gray-600 mb-4">
                Изучите REST API: GET, POST, PUT, DELETE запросы и обработка ошибок
              </p>
              <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                📄 Интерактивно
              </div>
            </div>
          </Link>

          {/* Postman */}
          <Link 
            href="/postman" 
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Postman
              </h3>
              <p className="text-gray-600 mb-4">
                Освойте Postman: коллекции, переменные, тесты и автоматизация
              </p>
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                🚀 Популярно
              </div>
            </div>
          </Link>

          {/* Functional Testing */}
          <Link 
            href="/functional" 
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚙️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Функциональное тестирование
              </h3>
              <p className="text-gray-600 mb-4">
                Изучите основы функционального тестирования веб-приложений
              </p>
              <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                🎯 Основы
              </div>
            </div>
          </Link>

          {/* UI/UX Testing */}
          <Link 
            href="/ui-ux" 
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-pink-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                UI/UX Тестирование
              </h3>
              <p className="text-gray-600 mb-4">
                Научитесь тестировать пользовательский интерфейс и опыт
              </p>
              <div className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                🎨 Дизайн
              </div>
            </div>
          </Link>

          {/* Security Testing */}
          <Link 
            href="/security" 
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Тестирование безопасности
              </h3>
              <p className="text-gray-600 mb-4">
                Изучите основы тестирования безопасности веб-приложений
              </p>
              <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                🔒 Безопасность
              </div>
            </div>
          </Link>
        </div>

        {/* Дополнительная информация */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💡 Все тренажеры содержат практические задания и интерактивные примеры
          </p>
        </div>
      </div>
    </div>
  );
}