'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Globe, Database, Shield, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import APITester from '../components/APITester';

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
          challenge: "Используйте встроенный API тестер для отправки GET запросов: получите список задач, детальную информацию о задаче и проверьте обработку различных параметров запроса.",
          beforeImage: "/screenshots/api/get-before.svg",
          afterImage: "/screenshots/api/get-after.svg",
          solution: {
            steps: [
              "1. Используйте встроенный API тестер выше",
              "2. Настройте GET запрос:",
              "  • Выберите метод GET",
              "  • Введите URL: /api/tasks",
              "  • Нажмите 'Отправить'",
              "3. Проанализируйте ответ:",
              "  • Проверьте статус ответа (должен быть 200 OK)",
              "  • Изучите структуру JSON данных",
              "  • Убедитесь в наличии всех ожидаемых полей",
              "4. Протестируйте получение конкретной задачи:",
              "  • Измените URL на: /api/tasks/1",
              "  • Отправьте запрос",
              "  • Проверьте, что возвращается одна задача",
              "5. Сохраните запросы:",
              "  • Нажмите 'Сохранить' для каждого запроса",
              "  • Дайте им понятные названия"
            ],
            tips: [
              "API тестер автоматически добавляет заголовок Content-Type",
              "Проверяйте время ответа в результатах",
              "Обращайте внимание на структуру JSON ответа",
              "Используйте кнопку 'cURL' для копирования команды"
            ]
          }
        },
        {
          id: 2,
          title: "Тестирование POST запросов",
          description: "Проверьте создание новых данных через POST запросы",
          category: "POST Requests",
          completed: false,
          challenge: "Используйте API тестер для создания новой задачи: отправьте POST запрос с данными задачи и проверьте ответ сервера.",
          beforeImage: "/screenshots/api/post-before.svg",
          afterImage: "/screenshots/api/post-after.svg",
          solution: {
            steps: [
              "1. Используйте встроенный API тестер",
              "2. Настройте POST запрос:",
              "  • Выберите метод POST",
              "  • Введите URL: /api/tasks",
              "  • Откройте секцию 'Body'",
              "3. Добавьте данные задачи:",
              "  • В поле Body введите JSON:",
              "  • {\"title\": \"Новая задача\", \"description\": \"Описание задачи\"}",
              "  • Нажмите 'Отправить'",
              "4. Проанализируйте ответ:",
              "  • Проверьте статус ответа (201 Created или 200 OK)",
              "  • Убедитесь, что задача создана с ID",
              "  • Проверьте возвращенные данные",
              "5. Проверьте создание:",
              "  • Отправьте GET запрос к /api/tasks",
              "  • Убедитесь, что новая задача появилась в списке"
            ],
            tips: [
              "JSON должен быть валидным - проверьте синтаксис",
              "Тестируйте с невалидными данными для проверки ошибок",
              "Обращайте внимание на статус коды ответов",
              "Используйте сохранение запросов для повторного использования"
            ]
          }
        },
        {
          id: 3,
          title: "Тестирование PUT/PATCH запросов",
          description: "Проверьте обновление данных через PUT/PATCH запросы",
          category: "PUT/PATCH Requests",
          completed: false,
          challenge: "Используйте API тестер для обновления задачи: отправьте PUT или PATCH запрос с обновленными данными и проверьте результат.",
          beforeImage: "/screenshots/api/put-before.svg",
          afterImage: "/screenshots/api/put-after.svg",
          solution: {
            steps: [
              "1. Используйте встроенный API тестер",
              "2. Настройте PUT запрос:",
              "  • Выберите метод PUT",
              "  • Введите URL: /api/tasks/1 (замените 1 на ID существующей задачи)",
              "  • Откройте секцию 'Body'",
              "3. Добавьте обновленные данные:",
              "  • В поле Body введите JSON:",
              "  • {\"title\": \"Обновленная задача\", \"description\": \"Новое описание\"}",
              "  • Нажмите 'Отправить'",
              "4. Проанализируйте ответ:",
              "  • Проверьте статус ответа (200 OK)",
              "  • Убедитесь, что данные обновились",
              "  • Проверьте возвращенные данные",
              "5. Проверьте обновление:",
              "  • Отправьте GET запрос к /api/tasks/1",
              "  • Убедитесь, что изменения сохранились"
            ],
            tips: [
              "PUT заменяет весь объект, PATCH обновляет только указанные поля",
              "Проверяйте, что ID задачи существует перед обновлением",
              "Тестируйте с невалидными данными для проверки ошибок",
              "Используйте сохранение запросов для повторного тестирования"
            ]
          }
        },
        {
          id: 4,
          title: "Тестирование DELETE запросов",
          description: "Проверьте удаление данных через DELETE запросы",
          category: "DELETE Requests",
          completed: false,
          challenge: "Используйте API тестер для удаления задачи: отправьте DELETE запрос и проверьте, что задача была удалена.",
          beforeImage: "/screenshots/api/delete-before.svg",
          afterImage: "/screenshots/api/delete-after.svg",
          solution: {
            steps: [
              "1. Используйте встроенный API тестер",
              "2. Настройте DELETE запрос:",
              "  • Выберите метод DELETE",
              "  • Введите URL: /api/tasks/1 (замените 1 на ID задачи для удаления)",
              "  • Нажмите 'Отправить'",
              "3. Проанализируйте ответ:",
              "  • Проверьте статус ответа (200 OK или 204 No Content)",
              "  • Убедитесь, что задача удалена",
              "  • Проверьте сообщение об успешном удалении",
              "4. Проверьте удаление:",
              "  • Отправьте GET запрос к /api/tasks",
              "  • Убедитесь, что удаленная задача больше не в списке",
              "5. Протестируйте ошибки:",
              "  • Попробуйте удалить несуществующую задачу",
              "  • Проверьте обработку ошибки 404"
            ],
            tips: [
              "DELETE запросы не требуют тела запроса",
              "Тестируйте удаление несуществующих элементов для проверки ошибок",
              "Проверяйте статус коды: 200 (OK), 204 (No Content), 404 (Not Found)",
              "Используйте сохранение запросов для повторного тестирования"
            ]
          }
        },
        {
          id: 5,
          title: "Тестирование обработки ошибок",
          description: "Проверьте корректную обработку ошибок API",
          category: "Error Handling",
          completed: false,
          challenge: "Используйте API тестер для тестирования обработки ошибок: отправьте запросы с невалидными данными и проверьте корректные ответы об ошибках.",
          beforeImage: "/screenshots/api/errors-before.svg",
          afterImage: "/screenshots/api/errors-after.svg",
          solution: {
            steps: [
              "1. Используйте встроенный API тестер",
              "2. Протестируйте 404 ошибку:",
              "  • Отправьте GET запрос к /api/tasks/999",
              "  • Проверьте статус ответа (404 Not Found)",
              "  • Убедитесь в корректном сообщении об ошибке",
              "3. Протестируйте 400 ошибку:",
              "  • Отправьте POST запрос к /api/tasks",
              "  • В Body введите невалидный JSON: {\"invalid\": \"data\"}",
              "  • Проверьте статус ответа (400 Bad Request)",
              "4. Протестируйте 422 ошибку:",
              "  • Отправьте POST запрос к /api/tasks",
              "  • В Body введите: {\"title\": \"\"} (пустой title)",
              "  • Проверьте статус ответа (422 Unprocessable Entity)",
              "5. Проанализируйте ошибки:",
              "  • Изучите структуру ответов об ошибках",
              "  • Проверьте понятность сообщений",
              "  • Убедитесь в корректности статус кодов"
            ],
            tips: [
              "Изучайте структуру ответов об ошибках - они должны быть понятными",
              "Проверяйте, что статус коды соответствуют типу ошибки",
              "Тестируйте различные сценарии ошибок",
              "Обращайте внимание на время ответа при ошибках"
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
            {/* API Тестер */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🌐 Встроенный API Тестер</h2>
              <p className="text-gray-600 mb-6">
                Используйте встроенный API тестер для выполнения практических заданий. 
                Он работает как Postman, но интегрирован прямо в урок!
              </p>
              <APITester />
            </div>

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
