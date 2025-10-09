'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import PostmanTester from '../components/PostmanTester';
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
        challenge: "Используйте встроенный API тестер выше: создайте новый запрос, настройте метод и URL, отправьте запрос и изучите ответ.",
        beforeImage: "/screenshots/postman/basics-before.svg",
        afterImage: "/screenshots/postman/basics-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Настройте запрос:",
            "  • Выберите метод GET",
            "  • Введите URL: https://jsonplaceholder.typicode.com/posts/1",
            "  • Нажмите 'Отправить'",
            "3. Изучите ответ:",
            "  • Проверьте статус код (200 OK)",
            "  • Изучите структуру JSON данных",
            "  • Обратите внимание на время выполнения",
            "4. Сохраните запрос:",
            "  • Нажмите 'Сохранить'",
            "  • Дайте название: 'Test API'"
          ],
            tips: [
              "API тестер автоматически форматирует JSON ответы",
              "Используйте сохранение запросов для повторного использования",
              "Обращайте внимание на статус коды ответов",
              "Проверяйте время выполнения запросов"
            ]
        }
      },
      {
        id: 2,
        title: "Работа с коллекциями",
        description: "Научитесь организовывать запросы в коллекции",
        category: "Collections",
        completed: completedTasks[2] || false,
        challenge: "Используйте встроенный API тестер: создайте несколько запросов и сохраните их с понятными названиями.",
        beforeImage: "/screenshots/postman/collections-before.svg",
        afterImage: "/screenshots/postman/collections-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Создайте первый запрос:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/users",
            "  • Сохраните как: 'Get Users'",
            "3. Создайте второй запрос:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/posts",
            "  • Сохраните как: 'Get Posts'",
            "4. Создайте третий запрос:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/comments",
            "  • Сохраните как: 'Get Comments'",
            "5. Проверьте сохраненные запросы:",
            "  • Они должны появиться в разделе 'Сохраненные запросы'"
          ],
            tips: [
              "Используйте осмысленные названия для запросов",
              "Сохраняйте часто используемые запросы",
              "Организуйте запросы по функциональности",
              "Используйте историю для быстрого доступа"
            ]
        }
      },
      {
        id: 3,
        title: "Переменные и окружения",
        description: "Настройте переменные для разных окружений",
        category: "Environments",
        completed: completedTasks[3] || false,
        challenge: "Используйте встроенный API тестер: создайте запросы с разными URL и заголовками для изучения структуры.",
        beforeImage: "/screenshots/postman/environments-before.svg",
        afterImage: "/screenshots/postman/environments-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Создайте запрос с заголовками:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/posts/1",
            "  • Добавьте заголовок: User-Agent: MyApp/1.0",
            "  • Добавьте заголовок: Accept: application/json",
            "3. Изучите ответ:",
            "  • Проверьте, как сервер обрабатывает заголовки",
            "  • Обратите внимание на структуру ответа",
            "4. Создайте запрос к другому эндпоинту:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/users/1",
            "  • Сравните структуру ответов"
          ],
            tips: [
              "Заголовки помогают серверу понять, что вы хотите получить",
              "User-Agent показывает, какое приложение делает запрос",
              "Accept указывает, какой формат данных вы ожидаете",
              "Разные эндпоинты могут возвращать разную структуру данных"
            ]
        }
      },
      {
        id: 4,
        title: "POST и PUT запросы",
        description: "Научитесь отправлять данные на сервер",
        category: "Data Submission",
        completed: completedTasks[4] || false,
        challenge: "Используйте встроенный API тестер: создайте POST запрос с JSON данными для изучения отправки данных на сервер.",
        beforeImage: "/screenshots/postman/post-put-before.svg",
        afterImage: "/screenshots/postman/post-put-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Создайте POST запрос:",
            "  • Выберите метод: POST",
            "  • URL: https://jsonplaceholder.typicode.com/posts",
            "3. Добавьте JSON данные:",
            "  • Откройте секцию 'Body'",
            "  • Введите JSON:",
            "  • {\"title\": \"My New Post\", \"body\": \"This is my post content\", \"userId\": 1}",
            "4. Отправьте запрос:",
            "  • Нажмите 'Отправить'",
            "  • Проверьте статус ответа (201 Created)",
            "5. Изучите ответ:",
            "  • В ответе должен быть ID нового поста",
            "  • Обратите внимание на структуру данных"
          ],
            tips: [
              "POST создает новые ресурсы на сервере",
              "JSON должен быть валидным - проверьте синтаксис",
              "Проверяйте статус коды: 201 для создания",
              "Сервер возвращает созданный объект с ID"
            ]
        }
      },
      {
        id: 5,
        title: "Тестирование и автоматизация",
        description: "Напишите тесты для автоматической проверки ответов",
        category: "Testing",
        completed: completedTasks[5] || false,
        challenge: "Используйте встроенный API тестер: протестируйте различные сценарии и изучите обработку ошибок.",
        beforeImage: "/screenshots/postman/testing-before.svg",
        afterImage: "/screenshots/postman/testing-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Протестируйте успешный запрос:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/posts/1",
            "  • Проверьте статус: 200 OK",
            "  • Изучите структуру ответа",
            "3. Протестируйте ошибку 404:",
            "  • GET запрос к: https://jsonplaceholder.typicode.com/posts/999",
            "  • Проверьте статус: 404 Not Found",
            "4. Протестируйте невалидный URL:",
            "  • GET запрос к: https://invalid-url.com",
            "  • Изучите обработку ошибки",
            "5. Сравните результаты:",
            "  • Обратите внимание на разные статус коды",
            "  • Изучите структуру ответов об ошибках"
          ],
            tips: [
              "Статус 200 означает успешный запрос",
              "Статус 404 означает, что ресурс не найден",
              "Ошибки сети показывают проблемы с подключением",
              "Изучайте структуру ответов для понимания API"
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
              <Link href="/postman" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
                Открыть Postman
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
            {/* Встроенный API тестер */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🌐 Встроенный API тестер</h2>
              <p className="text-gray-600 mb-6">
                Используйте встроенный API тестер для выполнения практических заданий. 
                Он работает как Postman, но интегрирован прямо в урок!
              </p>
              <PostmanTester />
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
