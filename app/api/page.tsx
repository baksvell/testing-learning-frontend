'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Globe, Database, Shield, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

interface APITask {
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

interface APILesson {
  id: number;
  title: string;
  description: string;
  tasks: APITask[];
}

export default function APIPage() {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState<APILesson | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showSolutions, setShowSolutions] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    // Загружаем урок по API тестированию
    const apiLesson: APILesson = {
      id: 1,
      title: "API тестирование",
      description: "Изучите основы тестирования веб-API и RESTful сервисов",
      tasks: [
        {
          id: 1,
          title: "Тестирование GET запросов",
          description: "Проверьте получение данных через GET запросы",
          category: "GET Requests",
          completed: false,
          challenge: "Протестируйте GET запросы: проверьте получение списка задач, детальной информации о задаче и обработку различных параметров запроса.",
          beforeImage: "/screenshots/api/get-before.svg",
          afterImage: "/screenshots/api/get-after.svg",
          solution: {
            steps: [
              "1. Откройте DevTools и перейдите на вкладку Network",
              "2. Очистите список запросов и обновите страницу",
              "3. Найдите GET запросы:",
              "  • Ищите запросы к /api/tasks",
              "  • Проверьте статус ответа (должен быть 200 OK)",
              "  • Убедитесь, что данные загружаются корректно",
              "4. Проверьте параметры запроса:",
              "  • Откройте детали запроса",
              "  • Проверьте URL и query параметры",
              "  • Убедитесь в корректности заголовков",
              "5. Проанализируйте ответ:",
              "  • Проверьте структуру JSON ответа",
              "  • Убедитесь в наличии всех ожидаемых полей",
              "  • Проверьте типы данных в ответе"
            ],
            tips: [
              "Используйте фильтр 'XHR' для поиска API запросов",
              "Проверяйте время ответа сервера",
              "Обращайте внимание на размер ответа",
              "Тестируйте с разными параметрами запроса"
            ]
          }
        },
        {
          id: 2,
          title: "Тестирование POST запросов",
          description: "Проверьте создание новых данных через POST запросы",
          category: "POST Requests",
          completed: false,
          challenge: "Протестируйте POST запросы: создайте новую задачу через форму, проверьте отправку данных и обработку ответа сервера.",
          beforeImage: "/screenshots/api/post-before.svg",
          afterImage: "/screenshots/api/post-after.svg",
          solution: {
            steps: [
              "1. Откройте DevTools и перейдите на вкладку Network",
              "2. Очистите список запросов",
              "3. Создайте новую задачу:",
              "  • Заполните форму создания задачи",
              "  • Нажмите кнопку 'Создать'",
              "  • Следите за появлением POST запроса",
              "4. Проверьте данные запроса:",
              "  • Откройте детали POST запроса",
              "  • Проверьте URL (обычно /api/tasks)",
              "  • Убедитесь в корректности отправляемых данных",
              "5. Проанализируйте ответ:",
              "  • Проверьте статус ответа (201 Created или 200 OK)",
              "  • Убедитесь в создании новой задачи",
              "  • Проверьте возвращенные данные"
            ],
            tips: [
              "Проверяйте валидацию данных на сервере",
              "Тестируйте с невалидными данными",
              "Обращайте внимание на обработку ошибок",
              "Проверяйте обновление списка после создания"
            ]
          }
        },
        {
          id: 3,
          title: "Тестирование PUT/PATCH запросов",
          description: "Проверьте обновление данных через PUT/PATCH запросы",
          category: "PUT/PATCH Requests",
          completed: false,
          challenge: "Протестируйте PUT/PATCH запросы: отредактируйте существующую задачу, проверьте отправку обновленных данных и обработку ответа.",
          beforeImage: "/screenshots/api/put-before.svg",
          afterImage: "/screenshots/api/put-after.svg",
          solution: {
            steps: [
              "1. Откройте DevTools и перейдите на вкладку Network",
              "2. Очистите список запросов",
              "3. Отредактируйте существующую задачу:",
              "  • Найдите задачу для редактирования",
              "  • Измените данные в форме",
              "  • Нажмите кнопку 'Сохранить'",
              "4. Проверьте запрос обновления:",
              "  • Найдите PUT или PATCH запрос",
              "  • Проверьте URL (обычно /api/tasks/{id})",
              "  • Убедитесь в корректности обновленных данных",
              "5. Проанализируйте ответ:",
              "  • Проверьте статус ответа (200 OK)",
              "  • Убедитесь в сохранении изменений",
              "  • Проверьте возвращенные обновленные данные"
            ],
            tips: [
              "Различайте PUT (полное обновление) и PATCH (частичное обновление)",
              "Проверяйте обновление только измененных полей",
              "Тестируйте с невалидными данными",
              "Убедитесь в сохранении неизмененных полей"
            ]
          }
        },
        {
          id: 4,
          title: "Тестирование DELETE запросов",
          description: "Проверьте удаление данных через DELETE запросы",
          category: "DELETE Requests",
          completed: false,
          challenge: "Протестируйте DELETE запросы: удалите задачу, проверьте отправку запроса на удаление и обработку ответа сервера.",
          beforeImage: "/screenshots/api/delete-before.svg",
          afterImage: "/screenshots/api/delete-after.svg",
          solution: {
            steps: [
              "1. Откройте DevTools и перейдите на вкладку Network",
              "2. Очистите список запросов",
              "3. Удалите задачу:",
              "  • Найдите задачу для удаления",
              "  • Нажмите кнопку 'Удалить'",
              "  • Подтвердите удаление в диалоге",
              "4. Проверьте DELETE запрос:",
              "  • Найдите DELETE запрос",
              "  • Проверьте URL (обычно /api/tasks/{id})",
              "  • Убедитесь в корректности ID удаляемого элемента",
              "5. Проанализируйте ответ:",
              "  • Проверьте статус ответа (200 OK или 204 No Content)",
              "  • Убедитесь в удалении задачи",
              "  • Проверьте обновление списка"
            ],
            tips: [
              "Проверяйте подтверждение удаления",
              "Тестируйте удаление несуществующих элементов",
              "Убедитесь в невозможности восстановления",
              "Проверяйте обновление UI после удаления"
            ]
          }
        },
        {
          id: 5,
          title: "Тестирование обработки ошибок",
          description: "Проверьте корректную обработку ошибок API",
          category: "Error Handling",
          completed: false,
          challenge: "Протестируйте обработку ошибок: попробуйте получить несуществующую задачу, создать задачу с невалидными данными и проверить обработку ошибок сервера.",
          beforeImage: "/screenshots/api/errors-before.svg",
          afterImage: "/screenshots/api/errors-after.svg",
          solution: {
            steps: [
              "1. Откройте DevTools и перейдите на вкладку Network",
              "2. Очистите список запросов",
              "3. Протестируйте 404 ошибку:",
              "  • Попробуйте получить несуществующую задачу",
              "  • Проверьте статус ответа (404 Not Found)",
              "  • Убедитесь в корректном сообщении об ошибке",
              "4. Протестируйте 400 ошибку:",
              "  • Создайте задачу с невалидными данными",
              "  • Проверьте статус ответа (400 Bad Request)",
              "  • Убедитесь в детальном описании ошибки",
              "5. Протестируйте 500 ошибку:",
              "  • Попробуйте действия, которые могут вызвать серверную ошибку",
              "  • Проверьте статус ответа (500 Internal Server Error)",
              "  • Убедитесь в обработке ошибки на клиенте"
            ],
            tips: [
              "Проверяйте понятность сообщений об ошибках",
              "Убедитесь в корректной обработке на клиенте",
              "Тестируйте с отключенным интернетом",
              "Проверяйте таймауты запросов"
            ]
          }
        }
      ]
    };

    setCurrentLesson(apiLesson);

    // Загружаем прогресс из localStorage
    const savedProgress = localStorage.getItem('api-progress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    const newCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('api-progress', JSON.stringify(newCompletedTasks));
  };

  const toggleSolution = (taskId: number) => {
    setShowSolutions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  if (!currentLesson) {
    return <div className="container mx-auto px-4 py-8">Загрузка урока...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentLesson.title}
            </h1>
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span>←</span>
              Главное меню
            </a>
          </div>
          <p className="text-gray-600 mb-4">{currentLesson.description}</p>
          
          {/* Прогресс бар */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс</span>
              <span className="text-sm text-gray-500">
                {completedTasks.length} из {currentLesson.tasks.length} заданий
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks.length / currentLesson.tasks.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Переключатель вкладок */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('theory')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'theory'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📚 Теория
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'practice'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎯 Практика
            </button>
          </div>
        </div>

        {/* Теоретическая часть */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое API тестирование?</h2>
              <p className="text-gray-600 mb-4">
                API тестирование — это процесс проверки программных интерфейсов приложений (Application Programming Interface) 
                для обеспечения их корректной работы, производительности, безопасности и надежности. 
                API тестирование фокусируется на логике бизнес-слоя приложения.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-orange-600 mb-2">🌐 REST API</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Использует HTTP методы (GET, POST, PUT, DELETE)</li>
                    <li>• Статусные операции</li>
                    <li>• JSON формат данных</li>
                    <li>• Простая архитектура</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">🔧 HTTP методы</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• GET - получение данных</li>
                    <li>• POST - создание новых данных</li>
                    <li>• PUT/PATCH - обновление данных</li>
                    <li>• DELETE - удаление данных</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Основные аспекты API тестирования</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 mb-2">✅ Функциональность</h4>
                  <p className="text-sm text-gray-600">
                    Проверка корректности работы API методов, 
                    валидации данных и обработки запросов.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 mb-2">⚡ Производительность</h4>
                  <p className="text-sm text-gray-600">
                    Тестирование времени ответа, пропускной способности 
                    и поведения под нагрузкой.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">🔒 Безопасность</h4>
                  <p className="text-sm text-gray-600">
                    Проверка аутентификации, авторизации, 
                    валидации входных данных и защиты от атак.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Коды ответов HTTP</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 mb-2">2xx - Успех</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 200 OK</li>
                    <li>• 201 Created</li>
                    <li>• 204 No Content</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">3xx - Перенаправление</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 301 Moved Permanently</li>
                    <li>• 302 Found</li>
                    <li>• 304 Not Modified</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-600 mb-2">4xx - Ошибка клиента</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 400 Bad Request</li>
                    <li>• 401 Unauthorized</li>
                    <li>• 404 Not Found</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 mb-2">5xx - Ошибка сервера</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 500 Internal Server Error</li>
                    <li>• 502 Bad Gateway</li>
                    <li>• 503 Service Unavailable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Практическая часть */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {currentLesson.tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.category === 'GET Requests' ? 'bg-green-100 text-green-800' :
                        task.category === 'POST Requests' ? 'bg-blue-100 text-blue-800' :
                        task.category === 'PUT/PATCH Requests' ? 'bg-purple-100 text-purple-800' :
                        task.category === 'DELETE Requests' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                  </div>
                </div>

                {/* Задание */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">🎯 Задание:</h4>
                  <p className="text-yellow-700">{task.challenge}</p>
                </div>

                {/* Скриншоты */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <h5 className="font-medium text-gray-700 mb-2">📸 До выполнения:</h5>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <img 
                        src={task.beforeImage} 
                        alt="До выполнения"
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="font-medium text-gray-700 mb-2">📸 После выполнения:</h5>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <img 
                        src={task.afterImage} 
                        alt="После выполнения"
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Кнопки управления */}
                <div className="text-center mb-4 space-y-3">
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => toggleSolution(task.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      {showSolutions[task.id] ? (
                        <>
                          <span>🔒</span>
                          Скрыть решение
                        </>
                      ) : (
                        <>
                          <span>🔓</span>
                          Показать решение
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        completedTasks.includes(task.id)
                          ? 'bg-gray-500 hover:bg-gray-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {completedTasks.includes(task.id) ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Выполнено
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Отметить выполненным
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Решение (скрыто по умолчанию) */}
                {showSolutions[task.id] && (
                  <>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-3">✅ Решение:</h4>
                      <ol className="space-y-2">
                        {task.solution.steps.map((step, index) => (
                          <li key={index} className="text-green-700">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Подсказки */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">💡 Полезные советы:</h4>
                      <ul className="space-y-2">
                        {task.solution.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-sm text-blue-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
