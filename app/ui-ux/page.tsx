'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, Palette, Smartphone, MousePointer, Users, CheckCircle } from 'lucide-react';

interface UIUXTask {
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

interface UIUXLesson {
  id: number;
  title: string;
  description: string;
  tasks: UIUXTask[];
}

export default function UIUXPage() {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState<UIUXLesson | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showSolutions, setShowSolutions] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    // Загружаем урок по UI/UX тестированию
    const uiuxLesson: UIUXLesson = {
      id: 1,
      title: "UI/UX тестирование",
      description: "Изучите принципы тестирования пользовательского интерфейса и опыта взаимодействия",
      tasks: [
        {
          id: 1,
          title: "Тестирование адаптивности",
          description: "Проверьте корректность отображения на разных устройствах и разрешениях",
          category: "Responsive",
          completed: false,
          challenge: "Протестируйте адаптивность сайта: проверьте отображение на мобильных устройствах, планшетах и десктопах, убедитесь в корректности работы всех элементов.",
          beforeImage: "/screenshots/ui-ux/responsive-before.svg",
          afterImage: "/screenshots/ui-ux/responsive-after.svg",
          solution: {
            steps: [
              "1. Откройте сайт на десктопе:",
              "  • Проверьте отображение на разрешении 1920x1080",
              "  • Убедитесь, что все элементы видны и доступны",
              "  • Проверьте работу горизонтального скролла",
              "2. Протестируйте на планшете:",
              "  • Используйте DevTools для эмуляции iPad (768x1024)",
              "  • Проверьте адаптацию меню и навигации",
              "  • Убедитесь, что кнопки достаточно большие для касания",
              "3. Протестируйте на мобильном:",
              "  • Эмулируйте iPhone (375x667) или Android (360x640)",
              "  • Проверьте работу гамбургер-меню",
              "  • Убедитесь, что текст читаем без зума",
              "4. Проверьте промежуточные разрешения:",
              "  • Тестируйте на разрешениях 1024x768, 1366x768",
              "  • Убедитесь в плавности переходов между breakpoints",
              "5. Проверьте ориентацию:",
              "  • Поверните устройство в ландшафтный режим",
              "  • Убедитесь, что контент адаптируется корректно"
            ],
            tips: [
              "Используйте DevTools для быстрого тестирования разных разрешений",
              "Проверяйте реальные устройства, а не только эмуляцию",
              "Обращайте внимание на читаемость текста на маленьких экранах",
              "Убедитесь, что интерактивные элементы не перекрываются"
            ]
          }
        },
        {
          id: 2,
          title: "Тестирование цветовой схемы",
          description: "Проверьте контрастность, читаемость и соответствие брендингу",
          category: "Colors",
          completed: false,
          challenge: "Протестируйте цветовую схему сайта: проверьте контрастность текста, читаемость на разных фонах и соответствие цветов брендингу.",
          beforeImage: "/screenshots/ui-ux/colors-before.svg",
          afterImage: "/screenshots/ui-ux/colors-after.svg",
          solution: {
            steps: [
              "1. Проверьте контрастность текста:",
              "  • Убедитесь, что основной текст имеет достаточный контраст с фоном",
              "  • Проверьте заголовки и подзаголовки",
              "  • Используйте инструменты проверки контрастности (WCAG)",
              "2. Проверьте цветовую схему:",
              "  • Убедитесь в единообразии цветов по всему сайту",
              "  • Проверьте соответствие цветов брендингу",
              "  • Обратите внимание на цветовую иерархию",
              "3. Протестируйте на разных устройствах:",
              "  • Проверьте отображение на LCD и OLED экранах",
              "  • Убедитесь в корректности на темных и светлых темах",
              "4. Проверьте доступность:",
              "  • Убедитесь, что информация не передается только цветом",
              "  • Проверьте для пользователей с дальтонизмом",
              "5. Протестируйте интерактивные элементы:",
              "  • Проверьте состояния hover, focus, active",
              "  • Убедитесь в визуальной обратной связи"
            ],
            tips: [
              "Используйте инструменты типа WebAIM Contrast Checker",
              "Проверяйте цветовую схему при разном освещении",
              "Учитывайте культурные особенности восприятия цветов",
              "Тестируйте с отключенными изображениями"
            ]
          }
        },
        {
          id: 3,
          title: "Тестирование типографики",
          description: "Проверьте читаемость, иерархию и соответствие шрифтов",
          category: "Typography",
          completed: false,
          challenge: "Протестируйте типографику сайта: проверьте читаемость шрифтов, иерархию заголовков, межстрочные интервалы и корректность отображения на разных устройствах.",
          beforeImage: "/screenshots/ui-ux/typography-before.svg",
          afterImage: "/screenshots/ui-ux/typography-after.svg",
          solution: {
            steps: [
              "1. Проверьте читаемость основного текста:",
              "  • Убедитесь, что размер шрифта не менее 16px",
              "  • Проверьте межстрочный интервал (line-height)",
              "  • Оцените удобочитаемость на разных экранах",
              "2. Проверьте иерархию заголовков:",
              "  • Убедитесь в логической последовательности H1-H6",
              "  • Проверьте визуальную иерархию размеров",
              "  • Оцените контраст заголовков с основным текстом",
              "3. Протестируйте на разных устройствах:",
              "  • Проверьте отображение на мобильных устройствах",
              "  • Убедитесь, что шрифты загружаются корректно",
              "  • Проверьте fallback шрифты",
              "4. Проверьте специальные случаи:",
              "  • Тестируйте длинные тексты и переносы строк",
              "  • Проверьте отображение специальных символов",
              "  • Убедитесь в корректности кодировки",
              "5. Протестируйте интерактивные элементы:",
              "  • Проверьте текст в кнопках и ссылках",
              "  • Убедитесь в читаемости placeholder текста",
              "  • Проверьте сообщения об ошибках"
            ],
            tips: [
              "Используйте инструменты для проверки читаемости",
              "Тестируйте с увеличенным масштабом браузера",
              "Проверяйте загрузку веб-шрифтов",
              "Учитывайте особенности разных языков и письменностей"
            ]
          }
        },
        {
          id: 4,
          title: "Тестирование навигации",
          description: "Проверьте удобство и интуитивность навигации по сайту",
          category: "Navigation",
          completed: false,
          challenge: "Протестируйте навигацию сайта: проверьте интуитивность меню, доступность всех разделов, работу поиска и хлебных крошек.",
          beforeImage: "/screenshots/ui-ux/navigation-before.svg",
          afterImage: "/screenshots/ui-ux/navigation-after.svg",
          solution: {
            steps: [
              "1. Проверьте основное меню:",
              "  • Убедитесь, что все важные разделы доступны",
              "  • Проверьте логичность группировки пунктов",
              "  • Оцените понятность названий разделов",
              "2. Протестируйте поиск:",
              "  • Проверьте видимость поля поиска",
              "  • Убедитесь в работе автодополнения",
              "  • Проверьте отображение результатов поиска",
              "3. Проверьте хлебные крошки:",
              "  • Убедитесь в отображении текущего местоположения",
              "  • Проверьте кликабельность элементов",
              "  • Оцените понятность структуры",
              "4. Протестируйте мобильную навигацию:",
              "  • Проверьте работу гамбургер-меню",
              "  • Убедитесь в удобстве использования на маленьком экране",
              "  • Проверьте доступность всех разделов",
              "5. Проверьте навигацию с клавиатуры:",
              "  • Используйте Tab для навигации",
              "  • Убедитесь в видимости focus состояния",
              "  • Проверьте логический порядок элементов"
            ],
            tips: [
              "Проводите тестирование с реальными пользователями",
              "Используйте карты сайта для проверки полноты навигации",
              "Проверяйте навигацию на разных страницах",
              "Учитывайте принципы информационной архитектуры"
            ]
          }
        },
        {
          id: 5,
          title: "Тестирование форм",
          description: "Проверьте удобство заполнения и валидации форм",
          category: "Forms",
          completed: false,
          challenge: "Протестируйте формы на сайте: проверьте удобство заполнения, понятность полей, валидацию и сообщения об ошибках.",
          beforeImage: "/screenshots/ui-ux/forms-before.svg",
          afterImage: "/screenshots/ui-ux/forms-after.svg",
          solution: {
            steps: [
              "1. Проверьте визуальное оформление форм:",
              "  • Убедитесь в четкости границ полей",
              "  • Проверьте размеры полей ввода",
              "  • Оцените визуальную группировку связанных полей",
              "2. Протестируйте подписи и подсказки:",
              "  • Убедитесь в наличии понятных подписей",
              "  • Проверьте placeholder текст",
              "  • Оцените полезность подсказок",
              "3. Проверьте валидацию:",
              "  • Протестируйте валидацию в реальном времени",
              "  • Проверьте понятность сообщений об ошибках",
              "  • Убедитесь в визуальном выделении ошибок",
              "4. Протестируйте на мобильных устройствах:",
              "  • Проверьте удобство ввода на сенсорных экранах",
              "  • Убедитесь в правильном типе клавиатуры",
              "  • Проверьте автозаполнение",
              "5. Проверьте доступность:",
              "  • Убедитесь в связи подписей с полями",
              "  • Проверьте навигацию с клавиатуры",
              "  • Убедитесь в работе с screen reader"
            ],
            tips: [
              "Используйте принципы минимализма в дизайне форм",
              "Проверяйте формы с разными типами данных",
              "Тестируйте с автозаполнением браузера",
              "Учитывайте культурные особенности ввода данных"
            ]
          }
        }
      ]
    };

    setCurrentLesson(uiuxLesson);

    // Загружаем прогресс из localStorage
    const savedProgress = localStorage.getItem('uiux-progress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    const newCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('uiux-progress', JSON.stringify(newCompletedTasks));
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
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📚 Теория
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'practice'
                  ? 'bg-white text-green-600 shadow-sm'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое UI/UX тестирование?</h2>
              <p className="text-gray-600 mb-4">
                UI/UX тестирование — это процесс проверки пользовательского интерфейса и опыта взаимодействия 
                с целью обеспечения удобства, интуитивности и эффективности использования продукта. 
                Оно фокусируется на том, как пользователи воспринимают и взаимодействуют с интерфейсом.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 mb-2">🎨 UI (User Interface)</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Визуальные элементы интерфейса</li>
                    <li>• Цветовая схема и типографика</li>
                    <li>• Адаптивность и отзывчивость</li>
                    <li>• Консистентность дизайна</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">👤 UX (User Experience)</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Удобство использования</li>
                    <li>• Интуитивность навигации</li>
                    <li>• Эмоциональная реакция пользователя</li>
                    <li>• Эффективность выполнения задач</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Основные принципы UI/UX тестирования</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">📱 Адаптивность</h4>
                  <p className="text-sm text-gray-600">
                    Проверка корректного отображения и работы интерфейса 
                    на различных устройствах и разрешениях экрана.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-orange-600 mb-2">🎯 Доступность</h4>
                  <p className="text-sm text-gray-600">
                    Обеспечение возможности использования продукта 
                    людьми с различными ограничениями и особенностями.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 mb-2">⚡ Производительность</h4>
                  <p className="text-sm text-gray-600">
                    Проверка скорости загрузки, отзывчивости интерфейса 
                    и плавности анимаций и переходов.
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
                        task.category === 'Responsive' ? 'bg-blue-100 text-blue-800' :
                        task.category === 'Colors' ? 'bg-purple-100 text-purple-800' :
                        task.category === 'Typography' ? 'bg-green-100 text-green-800' :
                        task.category === 'Navigation' ? 'bg-orange-100 text-orange-800' :
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
