'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Globe, Send, Folder, Settings, History, Zap, CheckCircle, 
  AlertTriangle, Clock, Download, Copy, Save, Play, ChevronRight,
  BookOpen, Target, Trophy, Users, Code, Shield
} from 'lucide-react';

interface PostmanTask {
  id: number;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  challenge: string;
  beforeImage: string;
  afterImage: string;
  solution: {
    steps: string[];
    tips: string[];
  };
}

interface PostmanLesson {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tasks: PostmanTask[];
}

export default function PostmanLessonsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  // Load completed tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('postman-lessons-completed');
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, []);

  // Save completed tasks to localStorage
  const saveCompletedTasks = (tasks: Record<number, boolean>) => {
    setCompletedTasks(tasks);
    localStorage.setItem('postman-lessons-completed', JSON.stringify(tasks));
  };

  const toggleSolution = (taskId: number) => {
    setShowSolutions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleTaskCompletion = (taskId: number) => {
    const newCompleted = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId]
    };
    saveCompletedTasks(newCompleted);
  };

  const currentLesson: PostmanLesson = {
    id: 'postman',
    title: 'Postman для тестирования API',
    description: 'Изучите профессиональные инструменты для тестирования REST API',
    icon: <Globe className="w-8 h-8" />,
    color: 'bg-blue-500',
    tasks: [
      {
        id: 1,
        title: "Основы работы с Postman",
        description: "Изучите интерфейс и базовые функции Postman",
        category: "Basics",
        completed: completedTasks[1] || false,
        challenge: "Откройте демо Postman (кнопка выше) и начните с быстрых примеров (зеленые кнопки) для мгновенного изучения принципов работы с API.",
        beforeImage: "/screenshots/postman/basics-before.svg",
        afterImage: "/screenshots/postman/basics-after.svg",
        solution: {
          steps: [
            "1. Откройте демо Postman по кнопке выше",
            "2. Начните с быстрых примеров (зеленые кнопки):",
            "  • Нажмите 'GET Post' для мгновенного ответа",
            "  • Изучите интерфейс демо Postman",
            "  • Обратите внимание на статус код (200 OK)",
            "3. Изучите ответ:",
            "  • Проверьте структуру JSON данных",
            "  • Обратите внимание на время выполнения",
            "  • Изучите заголовки ответа",
            "4. Попробуйте другие быстрые примеры:",
            "  • 'POST Create' для создания данных",
            "  • 'GET 404 Error' для изучения ошибок",
            "  • 'GET Slow' для анализа производительности"
          ],
            tips: [
              "⚡ Быстрые примеры дают мгновенные ответы",
              "🎯 Начните с зеленых кнопок для изучения принципов",
              "📊 Обращайте внимание на статус коды ответов",
              "⏱️ Проверяйте время выполнения запросов",
              "🔍 Изучайте структуру JSON данных",
              "📋 Демо максимально похоже на настоящий Postman"
            ]
        }
      },
      {
        id: 2,
        title: "Работа с коллекциями",
        description: "Научитесь организовывать запросы в коллекции",
        category: "Collections",
        completed: completedTasks[2] || false,
        challenge: "В демо Postman изучите коллекции в левой панели. Попробуйте выбрать запросы из коллекций и посмотрите, как они автоматически заполняют форму.",
        beforeImage: "/screenshots/postman/collections-before.svg",
        afterImage: "/screenshots/postman/collections-after.svg",
        solution: {
          steps: [
            "1. Откройте демо Postman по кнопке выше",
            "2. Изучите левую панель с коллекциями:",
            "  • 'Быстрые примеры (мгновенно)' - для быстрого изучения",
            "  • 'Наше API - Testing Platform (медленно)' - реальные данные",
            "3. Раскройте коллекцию 'Быстрые примеры':",
            "  • Нажмите на стрелочку рядом с названием",
            "  • Увидите список запросов",
            "4. Выберите запрос из коллекции:",
            "  • Нажмите на 'GET Post by ID'",
            "  • Форма автоматически заполнится",
            "  • URL станет: https://jsonplaceholder.typicode.com/posts/1",
            "5. Отправьте запрос и изучите результат",
            "6. Попробуйте другие запросы из коллекции"
          ],
            tips: [
              "📁 Коллекции помогают организовать запросы по темам",
              "⚡ Быстрые примеры дают мгновенные ответы",
              "🌐 Наши реальные API дают настоящие данные",
              "🔄 Клик по запросу автоматически заполняет форму",
              "📋 Коллекции экономят время на настройке запросов",
              "🎯 Используйте коллекции для структурированного изучения"
            ]
        }
      },
      {
        id: 3,
        title: "Переменные и окружения",
        description: "Настройте переменные для разных окружений",
        category: "Environments",
        completed: completedTasks[3] || false,
        challenge: "В демо Postman изучите раздел 'Environments' в левой панели. Посмотрите, как разные окружения влияют на базовые URL запросов.",
        beforeImage: "/screenshots/postman/environments-before.svg",
        afterImage: "/screenshots/postman/environments-after.svg",
        solution: {
          steps: [
            "1. Откройте демо Postman по кнопке выше",
            "2. Изучите раздел 'Environments' в левой панели:",
            "  • 'Testing Platform Production' - для наших реальных API",
            "  • 'Testing Platform Local' - для локальной разработки",
            "3. Посмотрите переменные окружения:",
            "  • baseUrl - базовый URL для API",
            "  • apiVersion - версия API",
            "4. Выберите запрос из коллекции 'Наше API':",
            "  • URL автоматически использует baseUrl из окружения",
            "  • Например: {{baseUrl}}/api/tasks",
            "5. Попробуйте переключить окружение:",
            "  • Обратите внимание, как меняется baseUrl",
            "  • Это позволяет тестировать на разных серверах"
          ],
            tips: [
              "🌍 Окружения позволяют переключаться между средами",
              "🔧 Переменные упрощают управление URL и параметрами",
              "🏭 Production - для реальных данных (медленно)",
              "💻 Local - для локальной разработки (быстро)",
              "🔄 Переключение окружения меняет все запросы",
              "📋 В настоящем Postman можно создавать свои окружения"
            ]
        }
      },
      {
        id: 4,
        title: "POST и PUT запросы",
        description: "Научитесь отправлять данные на сервер",
        category: "Data Submission",
        completed: completedTasks[4] || false,
        challenge: "В демо Postman попробуйте POST запрос из быстрых примеров. Изучите, как отправляются данные на сервер и какой ответ приходит обратно.",
        beforeImage: "/screenshots/postman/post-put-before.svg",
        afterImage: "/screenshots/postman/post-put-after.svg",
        solution: {
          steps: [
            "1. Откройте демо Postman по кнопке выше",
            "2. Нажмите кнопку 'POST Create' в быстрых примерах:",
            "  • Метод автоматически станет POST",
            "  • URL: https://jsonplaceholder.typicode.com/posts",
            "  • Body автоматически заполнится JSON данными",
            "3. Изучите JSON данные в Body:",
            "  • title: название поста",
            "  • body: содержимое поста",
            "  • userId: ID пользователя",
            "4. Отправьте запрос:",
            "  • Нажмите 'Send'",
            "  • Проверьте статус ответа (201 Created)",
            "5. Изучите ответ:",
            "  • В ответе будет ID нового поста (101)",
            "  • Сервер подтверждает создание ресурса",
            "6. Попробуйте другие методы:",
            "  • PUT для обновления данных",
            "  • PATCH для частичного обновления"
          ],
            tips: [
              "📝 POST создает новые ресурсы на сервере",
              "✅ Статус 201 означает успешное создание",
              "🆔 Сервер возвращает ID созданного объекта",
              "📋 JSON должен быть валидным - проверьте синтаксис",
              "🔄 PUT полностью заменяет ресурс",
              "🔧 PATCH частично обновляет ресурс",
              "⚡ Быстрые примеры показывают все основные методы"
            ]
        }
      },
      {
        id: 5,
        title: "Тестирование и автоматизация",
        description: "Напишите тесты для автоматической проверки ответов",
        category: "Testing",
        completed: completedTasks[5] || false,
        challenge: "Откройте демо Postman (кнопка выше) или используйте настоящий Postman. Изучите интерфейс, запустите коллекцию тестов и проанализируйте результаты.",
        beforeImage: "/screenshots/postman/testing-before.svg",
        afterImage: "/screenshots/postman/testing-after.svg",
        solution: {
          steps: [
            "1. Выберите инструмент:",
            "  • Демо Postman: нажмите кнопку 'Открыть демо Postman' выше",
            "  • Настоящий Postman: откройте установленное приложение",
            "2. Изучите интерфейс:",
            "  • Левая панель: коллекции, окружения, история",
            "  • Центральная область: отправка запросов",
            "  • Нижняя панель: консоль и инструменты",
            "3. Начните с быстрых примеров:",
            "  • Нажмите 'New Run' для запуска коллекции",
            "  • Выберите 'Быстрые примеры' для мгновенных результатов",
            "  • Наблюдайте за выполнением в реальном времени",
            "4. Попробуйте наши реальные API:",
            "  • Выберите коллекцию 'Наше API - Testing Platform'",
            "  • Учтите предупреждение о медленной работе",
            "  • Первый запрос может занять 10-30 секунд",
            "5. Проанализируйте результаты:",
            "  • Быстрые примеры: мгновенные ответы",
            "  • Наши API: реальные данные, но медленнее",
            "  • Время ответа и размер данных",
            "6. Поймите принципы тестирования API:",
            "  • Разные HTTP методы для разных операций",
            "  • Статус-коды показывают результат операции",
            "  • Время ответа важно для производительности"
          ],
            tips: [
              "🎯 Демо максимально похоже на настоящий Postman",
              "⚡ Начните с быстрых примеров для изучения принципов",
              "🌐 Наши реальные API дают настоящие данные",
              "⏰ Учтите предупреждение о медленной работе бэкенда",
              "📊 Статус 200/201 означает успешный запрос",
              "❌ Статус 404 означает, что ресурс не найден",
              "⏱️ Время ответа важно для анализа производительности",
              "📋 Коллекции помогают организовать тесты",
              "🔧 Окружения позволяют переключаться между средами",
              "📈 Анализ результатов помогает найти проблемы в API",
              "🚀 Автоматизация тестов экономит время тестировщика"
            ]
        }
      }
    ]
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalTasks = currentLesson.tasks.length;
  const progressPercentage = (completedCount / totalTasks) * 100;

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
                Postman уроки
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/postman-demo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
                Открыть демо Postman
              </Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${currentLesson.color} text-white`}>
              {currentLesson.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentLesson.title}</h1>
              <p className="text-gray-600 mt-2">{currentLesson.description}</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс</span>
              <span className="text-sm text-gray-500">{completedCount}/{totalTasks} заданий</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('theory')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'theory'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Теория
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'practice'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Практика
              </button>
            </nav>
          </div>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое Postman?</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Postman — это мощная платформа для разработки и тестирования API. 
                  Он позволяет отправлять HTTP-запросы, тестировать API, создавать коллекции запросов 
                  и автоматизировать тестирование.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Основные возможности:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li><strong>Отправка запросов:</strong> GET, POST, PUT, DELETE и другие HTTP методы</li>
                  <li><strong>Коллекции:</strong> Организация запросов в группы для удобства</li>
                  <li><strong>Окружения:</strong> Переменные для разных сред (dev, staging, prod)</li>
                  <li><strong>Тестирование:</strong> Автоматические тесты для проверки ответов</li>
                  <li><strong>Документация:</strong> Автогенерация документации API</li>
                  <li><strong>Мониторинг:</strong> Отслеживание производительности API</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Преимущества для тестировщиков:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Быстрое тестирование API без написания кода</li>
                  <li>Визуальный интерфейс для понимания структуры API</li>
                  <li>Возможность сохранения и повторного использования тестов</li>
                  <li>Автоматизация тестирования через скрипты</li>
                  <li>Интеграция с CI/CD пайплайнами</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Интерфейс Postman</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Основные элементы:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Sidebar:</strong> Коллекции, окружения, история</li>
                    <li><strong>Request Builder:</strong> Настройка запросов</li>
                    <li><strong>Response:</strong> Просмотр ответов сервера</li>
                    <li><strong>Tests:</strong> Написание автоматических тестов</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Вкладки запроса:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Params:</strong> Query параметры</li>
                    <li><strong>Headers:</strong> HTTP заголовки</li>
                    <li><strong>Body:</strong> Тело запроса (JSON, form-data)</li>
                    <li><strong>Tests:</strong> Скрипты для тестирования</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Демо Postman */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Демо Postman</h2>
              <p className="text-gray-600 mb-6">
                Откройте полноценное демо Postman для изучения тестирования API. 
                Интерфейс максимально приближен к настоящему Postman с полной функциональностью!
              </p>
              <div className="flex items-center gap-4 mb-4">
                <a 
                  href="/postman-demo" 
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Открыть демо Postman
                </a>
                <div className="text-sm text-gray-500">
                  Полноценный интерфейс • Реальные API запросы • Настройки запуска
                </div>
              </div>
              
              {/* Информация о настоящем Postman */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Альтернативный вариант</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Все уроки можно выполнить и в настоящем Postman! Если у вас установлен Postman, 
                  вы можете повторить все задания из уроков в реальном приложении.
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.postman.com/downloads/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Скачать Postman
                  </a>
                  <div className="text-xs text-blue-600">
                    Бесплатно • Работает офлайн • Полная функциональность
                  </div>
                </div>
              </div>
              
              {/* Информация о наших реальных API */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">🌐 Наши реальные API</h3>
                <p className="text-green-800 text-sm mb-3">
                  В демо Postman доступны наши реальные API эндпоинты! Вы можете тестировать настоящие запросы 
                  к нашей платформе обучения тестированию.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-600 mt-0.5">⚠️</div>
                    <div className="text-sm text-yellow-800">
                      <strong>Внимание:</strong> Наш бэкенд работает на бесплатном хостинге Render.com. 
                      Первый запрос может занять 10-30 секунд (холодный старт), последующие запросы быстрее. 
                      Если не хотите ждать, используйте быстрые примеры в демо.
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-green-700">
                  <div><strong>Базовый URL:</strong> https://testing-learning-backend.onrender.com</div>
                  <div><strong>Доступные эндпоинты:</strong></div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><code>GET /</code> - Информация об API</li>
                    <li><code>GET /health</code> - Проверка состояния</li>
                    <li><code>GET /api/tasks</code> - Список задач</li>
                    <li><code>GET /api/tasks/&#123;id&#125;</code> - Конкретная задача</li>
                    <li><code>GET /api/stats</code> - Статистика платформы</li>
                    <li><code>GET /api/database/test</code> - Тест базы данных</li>
                  </ul>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  💡 Все API открыты для тестирования • Код доступен на GitHub • Бесплатно для обучения
                </div>
              </div>
            </div>

            {currentLesson.tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`p-1 rounded ${
                          completedTasks[task.id] 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-900 mb-2">🎯 Задание:</h4>
                      <p className="text-blue-800">{task.challenge}</p>
                      {task.category === 'Testing' && (
                        <div className="mt-3">
                          <a 
                            href="/postman-demo" 
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Открыть демо Postman
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">📸 До выполнения:</h4>
                        <img 
                          src={task.beforeImage} 
                          alt="До выполнения" 
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">📸 После выполнения:</h4>
                        <img 
                          src={task.afterImage} 
                          alt="После выполнения" 
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSolution(task.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {showSolutions[task.id] ? 'Скрыть решение' : 'Показать решение'}
                    </button>

                    {showSolutions[task.id] && (
                      <div className="mt-4 space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-medium text-green-900 mb-3">✅ Решение:</h4>
                          <ol className="space-y-2 text-green-800">
                            {task.solution.steps.map((step, index) => (
                              <li key={index} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-medium text-yellow-900 mb-3">💡 Полезные советы:</h4>
                          <ul className="space-y-1 text-yellow-800">
                            {task.solution.tips.map((tip, index) => (
                              <li key={index} className="text-sm">• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
