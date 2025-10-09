'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bug, CheckCircle, AlertTriangle, Clock, User, Settings, Database, Globe } from 'lucide-react';

interface FunctionalTask {
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

interface FunctionalLesson {
  id: number;
  title: string;
  description: string;
  tasks: FunctionalTask[];
}

export default function FunctionalPage() {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState<FunctionalLesson | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showSolutions, setShowSolutions] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    // Загружаем урок по функциональному тестированию
    const functionalLesson: FunctionalLesson = {
      id: 1,
      title: "Функциональное тестирование",
      description: "Изучите основы функционального тестирования веб-приложений",
      tasks: [
        {
          id: 1,
          title: "Тестирование форм",
          description: "Проверьте валидацию и обработку данных в формах",
          category: "Forms",
          completed: false,
          challenge: "Протестируйте форму регистрации: заполните поля с валидными и невалидными данными, проверьте сообщения об ошибках и успешную регистрацию.",
          beforeImage: "/screenshots/functional/forms-before.svg",
          afterImage: "/screenshots/functional/forms-after.svg",
          solution: {
            steps: [
              "1. Откройте страницу регистрации",
              "2. Проверьте валидацию пустых полей:",
              "  • Оставьте все поля пустыми и нажмите 'Зарегистрироваться'",
              "  • Убедитесь, что появились сообщения об ошибках",
              "3. Проверьте валидацию email:",
              "  • Введите невалидный email (например, 'test')",
              "  • Убедитесь, что появилось сообщение об ошибке формата email",
              "4. Проверьте валидацию пароля:",
              "  • Введите короткий пароль (менее 6 символов)",
              "  • Убедитесь, что появилось сообщение о минимальной длине",
              "5. Проверьте успешную регистрацию:",
              "  • Заполните все поля валидными данными",
              "  • Нажмите 'Зарегистрироваться'",
              "  • Убедитесь, что появилось сообщение об успехе"
            ],
            tips: [
              "Проверяйте все возможные сценарии ввода данных",
              "Обращайте внимание на UX - сообщения должны быть понятными",
              "Тестируйте граничные значения (минимальная/максимальная длина)",
              "Проверяйте работу с разными браузерами"
            ]
          }
        },
        {
          id: 2,
          title: "Тестирование навигации",
          description: "Проверьте работу меню и переходов между страницами",
          category: "Navigation",
          completed: false,
          challenge: "Протестируйте навигацию по сайту: проверьте работу меню, ссылок, кнопок 'Назад' и правильность отображения страниц.",
          beforeImage: "/screenshots/functional/navigation-before.svg",
          afterImage: "/screenshots/functional/navigation-after.svg",
          solution: {
            steps: [
              "1. Проверьте главное меню:",
              "  • Кликните на каждый пункт меню",
              "  • Убедитесь, что переходы работают корректно",
              "  • Проверьте активное состояние текущей страницы",
              "2. Проверьте кнопки навигации:",
              "  • Используйте кнопку 'Назад' браузера",
              "  • Проверьте кнопку 'Домой' на страницах",
              "  • Убедитесь, что URL изменяется правильно",
              "3. Проверьте внутренние ссылки:",
              "  • Кликните на ссылки в тексте",
              "  • Проверьте ссылки в футере",
              "  • Убедитесь, что все ссылки ведут на существующие страницы",
              "4. Проверьте мобильную навигацию:",
              "  • Откройте сайт на мобильном устройстве",
              "  • Проверьте работу гамбургер-меню",
              "  • Убедитесь, что навигация удобна на маленьком экране"
            ],
            tips: [
              "Проверяйте навигацию на разных устройствах",
              "Убедитесь, что пользователь всегда понимает, где он находится",
              "Проверяйте работу с клавиатуры (Tab, Enter)",
              "Тестируйте навигацию с отключенным JavaScript"
            ]
          }
        },
        {
          id: 3,
          title: "Тестирование поиска",
          description: "Проверьте функциональность поиска по сайту",
          category: "Search",
          completed: false,
          challenge: "Протестируйте поиск: введите различные запросы, проверьте результаты поиска, фильтры и обработку пустых запросов.",
          beforeImage: "/screenshots/functional/search-before.svg",
          afterImage: "/screenshots/functional/search-after.svg",
          solution: {
            steps: [
              "1. Проверьте базовый поиск:",
              "  • Введите существующий запрос",
              "  • Убедитесь, что результаты отображаются",
              "  • Проверьте подсветку найденных слов",
              "2. Проверьте поиск несуществующего контента:",
              "  • Введите запрос, которого нет на сайте",
              "  • Убедитесь, что отображается сообщение 'Ничего не найдено'",
              "3. Проверьте пустой поиск:",
              "  • Оставьте поле поиска пустым",
              "  • Нажмите 'Найти'",
              "  • Убедитесь, что появляется соответствующее сообщение",
              "4. Проверьте специальные символы:",
              "  • Введите запрос с символами: !@#$%^&*()",
              "  • Убедитесь, что поиск обрабатывает их корректно",
              "5. Проверьте фильтры поиска:",
              "  • Используйте доступные фильтры (категории, даты)",
              "  • Убедитесь, что результаты фильтруются правильно"
            ],
            tips: [
              "Тестируйте поиск с разными языками и кодировками",
              "Проверяйте производительность при больших результатах",
              "Убедитесь, что поиск работает быстро",
              "Проверяйте автодополнение, если оно есть"
            ]
          }
        },
        {
          id: 4,
          title: "Тестирование загрузки файлов",
          description: "Проверьте функциональность загрузки и обработки файлов",
          category: "File Upload",
          completed: false,
          challenge: "Протестируйте загрузку файлов: попробуйте загрузить файлы разных типов и размеров, проверьте валидацию и обработку ошибок.",
          beforeImage: "/screenshots/functional/upload-before.svg",
          afterImage: "/screenshots/functional/upload-after.svg",
          solution: {
            steps: [
              "1. Проверьте загрузку валидных файлов:",
              "  • Выберите файл разрешенного типа (например, .jpg, .pdf)",
              "  • Убедитесь, что файл загружается успешно",
              "  • Проверьте отображение прогресса загрузки",
              "2. Проверьте валидацию типов файлов:",
              "  • Попробуйте загрузить файл неразрешенного типа",
              "  • Убедитесь, что появляется сообщение об ошибке",
              "3. Проверьте валидацию размера файла:",
              "  • Попробуйте загрузить файл больше максимального размера",
              "  • Убедитесь, что появляется соответствующее сообщение",
              "4. Проверьте загрузку нескольких файлов:",
              "  • Выберите несколько файлов одновременно",
              "  • Убедитесь, что все файлы загружаются",
              "5. Проверьте отмену загрузки:",
              "  • Начните загрузку большого файла",
              "  • Нажмите 'Отмена'",
              "  • Убедитесь, что загрузка прерывается"
            ],
            tips: [
              "Проверяйте загрузку файлов разных размеров",
              "Тестируйте с медленным интернет-соединением",
              "Проверяйте безопасность - нет ли возможности загрузить вредоносные файлы",
              "Убедитесь, что загруженные файлы доступны для скачивания"
            ]
          }
        },
        {
          id: 5,
          title: "Тестирование авторизации",
          description: "Проверьте систему входа и выхода пользователей",
          category: "Authentication",
          completed: false,
          challenge: "Протестируйте авторизацию: войдите с валидными и невалидными данными, проверьте сохранение сессии и выход из системы.",
          beforeImage: "/screenshots/functional/auth-before.svg",
          afterImage: "/screenshots/functional/auth-after.svg",
          solution: {
            steps: [
              "1. Проверьте вход с валидными данными:",
              "  • Введите правильный email и пароль",
              "  • Нажмите 'Войти'",
              "  • Убедитесь, что происходит перенаправление на личный кабинет",
              "2. Проверьте вход с невалидными данными:",
              "  • Введите неправильный email или пароль",
              "  • Убедитесь, что появляется сообщение об ошибке",
              "3. Проверьте сохранение сессии:",
              "  • Войдите в систему",
              "  • Обновите страницу",
              "  • Убедитесь, что остаетесь авторизованным",
              "4. Проверьте выход из системы:",
              "  • Нажмите 'Выйти'",
              "  • Убедитесь, что происходит перенаправление на главную",
              "  • Попробуйте зайти на защищенную страницу",
              "5. Проверьте 'Запомнить меня':",
              "  • Войдите с отмеченной галочкой 'Запомнить меня'",
              "  • Закройте браузер и откройте снова",
              "  • Убедитесь, что остаетесь авторизованным"
            ],
            tips: [
              "Проверяйте безопасность - пароли не должны отображаться в URL",
              "Тестируйте с истекшими сессиями",
              "Проверяйте работу с разными браузерами",
              "Убедитесь, что после выхода нельзя вернуться кнопкой 'Назад'"
            ]
          }
        }
      ]
    };

    setCurrentLesson(functionalLesson);

    // Загружаем прогресс из localStorage
    const savedProgress = localStorage.getItem('functional-progress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    const newCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('functional-progress', JSON.stringify(newCompletedTasks));
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
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📚 Теория
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'practice'
                  ? 'bg-white text-blue-600 shadow-sm'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое функциональное тестирование?</h2>
              <p className="text-gray-600 mb-4">
                Функциональное тестирование — это процесс проверки того, что программное обеспечение работает 
                в соответствии с требованиями и спецификациями. Оно фокусируется на проверке функций системы 
                и их соответствия ожидаемому поведению.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">🎯 Основные принципы</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Тестирование на основе требований</li>
                    <li>• Проверка всех функций системы</li>
                    <li>• Валидация входных и выходных данных</li>
                    <li>• Проверка пользовательских сценариев</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 mb-2">🔧 Типы функционального тестирования</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Unit тестирование (модульное)</li>
                    <li>• Integration тестирование (интеграционное)</li>
                    <li>• System тестирование (системное)</li>
                    <li>• User Acceptance тестирование (приемочное)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Основные области тестирования</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">📝 Формы и валидация</h4>
                  <p className="text-sm text-gray-600">
                    Проверка корректности обработки пользовательского ввода, 
                    валидации данных и отображения сообщений об ошибках.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-orange-600 mb-2">🧭 Навигация</h4>
                  <p className="text-sm text-gray-600">
                    Тестирование меню, ссылок, кнопок и переходов между страницами 
                    для обеспечения удобной навигации.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 mb-2">🔐 Авторизация</h4>
                  <p className="text-sm text-gray-600">
                    Проверка системы входа/выхода, управления сессиями 
                    и контроля доступа к защищенным ресурсам.
                  </p>
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
                        task.category === 'Forms' ? 'bg-blue-100 text-blue-800' :
                        task.category === 'Navigation' ? 'bg-green-100 text-green-800' :
                        task.category === 'Search' ? 'bg-purple-100 text-purple-800' :
                        task.category === 'File Upload' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
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
