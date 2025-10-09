'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import PostmanTester from '../components/PostmanTester';
import { 
  File, Send, Folder, Settings, History, Zap, CheckCircle, 
  AlertTriangle, Clock, Download, Copy, Save, Play, ChevronRight,
  BookOpen, Target, Trophy, Users, Code, Shield, Globe, Database
} from 'lucide-react';

interface OpenAPITask {
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

interface OpenAPILesson {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tasks: OpenAPITask[];
}

export default function OpenAPILessonsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  // Load completed tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('openapi-lessons-completed');
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, []);

  // Save completed tasks to localStorage
  const saveCompletedTasks = (tasks: Record<number, boolean>) => {
    setCompletedTasks(tasks);
    localStorage.setItem('openapi-lessons-completed', JSON.stringify(tasks));
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

  const currentLesson: OpenAPILesson = {
    id: 'openapi',
    title: 'OpenAPI и Swagger для тестирования API',
    description: 'Изучите документацию API и автоматизированное тестирование с помощью OpenAPI/Swagger',
    icon: <File className="w-8 h-8" />,
    color: 'bg-emerald-500',
    tasks: [
      {
        id: 1,
        title: "Основы OpenAPI и Swagger",
        description: "Изучите что такое OpenAPI и как работает Swagger UI",
        category: "Basics",
        completed: completedTasks[1] || false,
        challenge: "Используйте встроенный API тестер выше: изучите структуру API и попробуйте различные эндпоинты.",
        beforeImage: "/screenshots/openapi/basics-before.svg",
        afterImage: "/screenshots/openapi/basics-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Изучите структуру API:",
            "  • GET /api/tasks - получить список задач",
            "  • GET /api/tasks/1 - получить конкретную задачу",
            "  • POST /api/tasks - создать новую задачу",
            "3. Проанализируйте ответы:",
            "  • Изучите структуру JSON данных",
            "  • Обратите внимание на поля и типы данных",
            "  • Проверьте статус коды ответов",
            "4. Поймите концепцию OpenAPI:",
            "  • OpenAPI описывает структуру API",
            "  • Swagger UI создает интерактивную документацию",
            "  • Это помогает в тестировании и разработке"
          ],
          tips: [
            "OpenAPI - это стандарт описания REST API",
            "Swagger UI автоматически генерирует документацию",
            "Изучайте структуру ответов для понимания API",
            "Обращайте внимание на типы данных в ответах"
          ]
        }
      },
      {
        id: 2,
        title: "Чтение OpenAPI спецификации",
        description: "Научитесь читать и понимать OpenAPI документы",
        category: "Specification",
        completed: completedTasks[2] || false,
        challenge: "Изучите OpenAPI спецификацию нашего API и найдите информацию о доступных эндпоинтах.",
        beforeImage: "/screenshots/openapi/spec-before.svg",
        afterImage: "/screenshots/openapi/spec-after.svg",
        solution: {
          steps: [
            "1. Откройте OpenAPI документацию:",
            "  • Перейдите на /docs в нашем API",
            "  • Изучите структуру документации",
            "2. Найдите раздел 'Paths':",
            "  • Посмотрите на доступные эндпоинты",
            "  • Изучите HTTP методы для каждого пути",
            "3. Изучите схемы данных:",
            "  • Найдите раздел 'Schemas'",
            "  • Посмотрите на структуру объектов",
            "  • Обратите внимание на типы полей",
            "4. Протестируйте эндпоинты:",
            "  • Используйте 'Try it out' кнопки",
            "  • Отправьте тестовые запросы",
            "  • Изучите примеры ответов"
          ],
          tips: [
            "OpenAPI спецификация описывает все аспекты API",
            "Paths содержат информацию об эндпоинтах",
            "Schemas описывают структуру данных",
            "Используйте интерактивную документацию для тестирования"
          ]
        }
      },
      {
        id: 3,
        title: "Валидация API с OpenAPI",
        description: "Проверьте соответствие API его спецификации",
        category: "Validation",
        completed: completedTasks[3] || false,
        challenge: "Используйте встроенный API тестер: отправьте валидные и невалидные запросы и проверьте ответы.",
        beforeImage: "/screenshots/openapi/validation-before.svg",
        afterImage: "/screenshots/openapi/validation-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Протестируйте валидные запросы:",
            "  • GET /api/tasks - должен вернуть 200 OK",
            "  • POST /api/tasks с корректными данными",
            "3. Протестируйте невалидные запросы:",
            "  • POST /api/tasks с пустыми данными",
            "  • GET /api/tasks/999 (несуществующий ID)",
            "4. Проверьте валидацию:",
            "  • Изучите сообщения об ошибках",
            "  • Проверьте статус коды",
            "  • Убедитесь в соответствии спецификации",
            "5. Сравните с документацией:",
            "  • Проверьте соответствие схеме",
            "  • Убедитесь в правильности типов данных"
          ],
          tips: [
            "Валидация проверяет соответствие API спецификации",
            "Ошибки валидации возвращают статус 400 или 422",
            "Изучайте сообщения об ошибках для понимания требований",
            "Сравнивайте ответы с описанием в OpenAPI"
          ]
        }
      },
      {
        id: 4,
        title: "Автоматическое тестирование с OpenAPI",
        description: "Создайте автоматические тесты на основе OpenAPI спецификации",
        category: "Automation",
        completed: completedTasks[4] || false,
        challenge: "Используйте встроенный API тестер: создайте тесты для проверки структуры ответов и статус кодов.",
        beforeImage: "/screenshots/openapi/automation-before.svg",
        afterImage: "/screenshots/openapi/automation-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Создайте тесты для GET запроса:",
            "  • Проверьте статус код 200",
            "  • Проверьте наличие поля 'data' в ответе",
            "  • Проверьте тип данных (массив)",
            "3. Создайте тесты для POST запроса:",
            "  • Проверьте статус код 201",
            "  • Проверьте наличие ID в ответе",
            "  • Проверьте соответствие отправленных данных",
            "4. Создайте тесты для ошибок:",
            "  • Проверьте статус код 404 для несуществующего ресурса",
            "  • Проверьте статус код 400 для невалидных данных",
            "5. Запустите все тесты:",
            "  • Убедитесь, что все тесты проходят",
            "  • Изучите результаты тестирования"
          ],
          tips: [
            "Автоматические тесты проверяют соответствие API спецификации",
            "Тестируйте как успешные, так и ошибочные сценарии",
            "Проверяйте структуру ответов и типы данных",
            "Используйте тесты для регрессионного тестирования"
          ]
        }
      },
      {
        id: 5,
        title: "Документация API с Swagger",
        description: "Создайте и поддерживайте документацию API",
        category: "Documentation",
        completed: completedTasks[5] || false,
        challenge: "Изучите Swagger UI документацию и создайте примеры использования API.",
        beforeImage: "/screenshots/openapi/docs-before.svg",
        afterImage: "/screenshots/openapi/docs-after.svg",
        solution: {
          steps: [
            "1. Откройте Swagger UI документацию:",
            "  • Перейдите на /docs в нашем API",
            "  • Изучите интерфейс документации",
            "2. Изучите примеры:",
            "  • Посмотрите на примеры запросов",
            "  • Изучите примеры ответов",
            "  • Обратите внимание на описания",
            "3. Протестируйте интерактивность:",
            "  • Используйте 'Try it out' кнопки",
            "  • Отправьте тестовые запросы",
            "  • Изучите результаты",
            "4. Изучите схемы данных:",
            "  • Посмотрите на модели данных",
            "  • Изучите типы полей",
            "  • Поймите связи между объектами",
            "5. Создайте свою документацию:",
            "  • Задокументируйте найденные эндпоинты",
            "  • Создайте примеры использования"
          ],
          tips: [
            "Swagger UI создает интерактивную документацию",
            "Примеры помогают понять, как использовать API",
            "Схемы данных показывают структуру объектов",
            "Хорошая документация упрощает тестирование"
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
                <File className="w-6 h-6 text-emerald-600" />
                OpenAPI уроки
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/postman" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                <Send className="w-4 h-4" />
                Открыть Postman
              </Link>
              {user ? (
                <span className="text-sm text-gray-600">Привет, {user.username}!</span>
              ) : (
                <Link href="/login" className="text-sm text-emerald-600 hover:text-emerald-700">
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
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
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
                    ? 'border-emerald-500 text-emerald-600'
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
                    ? 'border-emerald-500 text-emerald-600'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое OpenAPI и Swagger?</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  OpenAPI (ранее Swagger) — это спецификация для описания REST API. 
                  Она позволяет создавать интерактивную документацию, генерировать клиентские SDK 
                  и автоматизировать тестирование API.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Основные компоненты:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li><strong>OpenAPI Specification:</strong> Стандарт описания API в формате YAML/JSON</li>
                  <li><strong>Swagger UI:</strong> Интерактивная веб-документация API</li>
                  <li><strong>Swagger Editor:</strong> Редактор для создания и редактирования спецификаций</li>
                  <li><strong>Swagger Codegen:</strong> Генератор клиентских SDK и серверного кода</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Преимущества для тестировщиков:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Автоматическая генерация тестов на основе спецификации</li>
                  <li>Валидация API против его описания</li>
                  <li>Интерактивная документация для изучения API</li>
                  <li>Стандартизированный подход к тестированию</li>
                  <li>Возможность регрессионного тестирования</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Структура OpenAPI спецификации</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Основные разделы:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>info:</strong> Метаинформация об API</li>
                    <li><strong>servers:</strong> Список серверов</li>
                    <li><strong>paths:</strong> Описание эндпоинтов</li>
                    <li><strong>components:</strong> Переиспользуемые компоненты</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Элементы эндпоинта:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>parameters:</strong> Параметры запроса</li>
                    <li><strong>requestBody:</strong> Тело запроса</li>
                    <li><strong>responses:</strong> Возможные ответы</li>
                    <li><strong>schemas:</strong> Модели данных</li>
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
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-emerald-900 mb-2">🎯 Задание:</h4>
                      <p className="text-emerald-800">{task.challenge}</p>
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
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
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
