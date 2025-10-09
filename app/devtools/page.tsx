'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  instructions: string[];
  hints: string[];
  completed: boolean;
  category: string;
}

interface DevToolsLesson {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
}

export default function DevToolsPage() {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState<DevToolsLesson | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');

  useEffect(() => {
    // Загружаем урок по DevTools
    const devToolsLesson: DevToolsLesson = {
      id: 1,
      title: "Интерактивный урок по DevTools",
      description: "Изучите основные инструменты разработчика в браузере",
      tasks: [
        {
          id: 1,
          title: "Изучение вкладки Elements",
          description: "Научитесь инспектировать и редактировать HTML/CSS элементы в реальном времени",
          category: "Elements",
          completed: false,
          instructions: [
            "Откройте DevTools (F12 или Ctrl+Shift+I)",
            "Перейдите на вкладку Elements (должна быть активна)",
            "Найдите элемент с классом 'devtools-demo':",
            "  a) Нажмите Ctrl+F в панели Elements",
            "  b) Введите 'devtools-demo' в поле поиска",
            "  c) Нажимайте стрелку вниз ⬇️ пока не найдете HTML элемент (не текст инструкции)",
            "  d) Элемент должен быть выделен желтым цветом",
            "Измените цвет текста на красный:",
            "  a) В правой панели Styles найдите блок 'element.style { }'",
            "  b) Кликните внутри фигурных скобок { }",
            "  c) Введите: color: red; и нажмите Enter",
            "Добавьте синюю рамку:",
            "  a) Снова кликните внутри { } в element.style",
            "  b) Введите: border: 2px solid blue; и нажмите Enter",
            "Проверьте результат - элемент должен иметь красный текст и синюю рамку"
          ],
          hints: [
            "📸 СКРИНШОТ ДО: Элемент имеет белый текст и сине-фиолетовый градиентный фон",
            "📸 СКРИНШОТ ПОСЛЕ: Текст стал красным, появилась синяя рамка 2px",
            "💡 Если не видите element.style, убедитесь что элемент выбран (подсвечен желтым)",
            "💡 Можно также кликнуть правой кнопкой на элемент на странице и выбрать 'Inspect'",
            "💡 Изменения видны мгновенно - не нужно сохранять файлы!"
          ]
        },
        {
          id: 2,
          title: "Анализ вкладки Console",
          description: "Изучите консоль для выполнения JavaScript команд и отладки",
          category: "Console",
          completed: false,
          instructions: [
            "Откройте вкладку Console в DevTools (рядом с Elements)",
            "Очистите консоль: нажмите кнопку 🚫 или Ctrl+L",
            "Выполните команду логирования:",
            "  a) Введите: console.log('Привет, DevTools!')",
            "  b) Нажмите Enter",
            "  c) Должно появиться сообщение в консоли",
            "Найдите элемент на странице:",
            "  a) Введите: document.querySelector('.devtools-demo')",
            "  b) Нажмите Enter",
            "  c) В консоли должен появиться HTML элемент",
            "Измените заголовок страницы:",
            "  a) Введите: document.title = 'DevTools Урок - Изучаем!';",
            "  b) Нажмите Enter",
            "  c) Проверьте заголовок вкладки браузера"
          ],
          hints: [
            "📸 СКРИНШОТ ДО: Консоль пустая или содержит системные сообщения",
            "📸 СКРИНШОТ ПОСЛЕ: В консоли видны результаты команд и измененный заголовок",
            "💡 Консоль - это JavaScript интерпретатор в браузере",
            "💡 Используйте Tab для автодополнения команд",
            "💡 Стрелка вверх ↑ показывает предыдущие команды",
            "💡 Кликните на результат в консоли для детального просмотра"
          ]
        },
        {
          id: 3,
          title: "Мониторинг Network",
          description: "Изучите сетевые запросы и производительность загрузки",
          category: "Network",
          completed: false,
          instructions: [
            "Откройте вкладку Network в DevTools",
            "Очистите список запросов: нажмите кнопку 🚫",
            "Обновите страницу (F5 или Ctrl+R)",
            "Найдите API запросы:",
            "  a) Ищите запросы к /api/ (например, /api/tasks, /api/stats)",
            "  b) Или используйте фильтр 'XHR' для AJAX запросов",
            "Изучите детали запроса:",
            "  a) Кликните на любой API запрос",
            "  b) Посмотрите вкладку 'Headers' - заголовки запроса и ответа",
            "  c) Посмотрите вкладку 'Response' - содержимое ответа",
            "  d) Посмотрите вкладку 'Timing' - время загрузки",
            "Проверьте статус ответа (должен быть 200 OK)"
          ],
          hints: [
            "📸 СКРИНШОТ ДО: Network панель пустая",
            "📸 СКРИНШОТ ПОСЛЕ: Видны все запросы с временем загрузки и статусами",
            "💡 Network показывает все ресурсы, которые загружает страница",
            "💡 Зеленые запросы (200) - успешные, красные (4xx, 5xx) - ошибки",
            "💡 Время загрузки показано справа от каждого запроса",
            "💡 Используйте фильтры (XHR, JS, CSS) для поиска конкретных типов ресурсов"
          ]
        },
        {
          id: 4,
          title: "Отладка в Sources",
          description: "Научитесь использовать отладчик JavaScript для пошагового выполнения кода",
          category: "Sources",
          completed: false,
          instructions: [
            "Откройте вкладку Sources в DevTools",
            "Найдите JavaScript файлы:",
            "  a) В левой панели найдите папку с вашим сайтом",
            "  b) Найдите файл с кодом страницы (обычно в _next/static/chunks/)",
            "Поставьте breakpoint:",
            "  a) Найдите строку с кодом (например, с console.log или функцией)",
            "  b) Кликните на номер строки слева - появится красная точка",
            "  c) Это breakpoint - код остановится на этой строке",
            "Запустите отладку:",
            "  a) Обновите страницу (F5)",
            "  b) Код остановится на breakpoint",
            "  c) В правой панели 'Scope' видны переменные",
            "Используйте кнопки отладки:",
            "  a) ▶️ Continue - продолжить выполнение",
            "  b) ⏭️ Step Over (F10) - выполнить текущую строку",
            "  c) ⏬ Step Into (F11) - войти в функцию"
          ],
          hints: [
            "📸 СКРИНШОТ ДО: Sources панель с открытым файлом, без breakpoints",
            "📸 СКРИНШОТ ПОСЛЕ: Код остановлен на breakpoint, видны переменные в Scope",
            "💡 Breakpoints помогают найти ошибки в коде",
            "💡 В панели 'Call Stack' видна цепочка вызовов функций",
            "💡 В панели 'Watch' можно следить за значениями переменных",
            "💡 Удалить breakpoint: кликните на красную точку еще раз"
          ]
        },
        {
          id: 5,
          title: "Анализ Performance",
          description: "Изучите производительность веб-приложения и найдите узкие места",
          category: "Performance",
          completed: false,
          instructions: [
            "Откройте вкладку Performance в DevTools",
            "Настройте запись:",
            "  a) Убедитесь что выбрано 'Screenshots' и 'Memory'",
            "  b) Нажмите кнопку Record (круглая кнопка) или Ctrl+E",
            "Выполните действия на странице:",
            "  a) Обновите страницу (F5)",
            "  b) Кликните на кнопки и элементы",
            "  c) Прокрутите страницу вверх-вниз",
            "  d) Подождите 3-5 секунд",
            "Остановите запись:",
            "  a) Нажмите кнопку Stop или Ctrl+E",
            "  b) Дождитесь обработки результатов",
            "Изучите результаты:",
            "  a) Посмотрите на временную шкалу сверху",
            "  b) Красные полосы указывают на проблемы",
            "  c) Изучите Call Tree внизу для деталей"
          ],
          hints: [
            "📸 СКРИНШОТ ДО: Performance панель готова к записи",
            "📸 СКРИНШОТ ПОСЛЕ: Временная шкала с данными о производительности",
            "💡 Performance показывает время выполнения JavaScript, рендеринга, загрузки",
            "💡 FPS (кадры в секунду) должен быть близок к 60",
            "💡 Длинные красные полосы указывают на медленные операции",
            "💡 Используйте фильтры для фокуса на конкретных типах операций"
          ]
        },
        {
          id: 6,
          title: "Мобильная эмуляция",
          description: "Научитесь тестировать адаптивный дизайн на разных устройствах",
          category: "Device",
          completed: false,
          instructions: [
            "Включите Device Mode:",
            "  a) Нажмите Ctrl+Shift+M или иконку 📱 в DevTools",
            "  b) Страница должна измениться на мобильный вид",
            "Выберите устройство:",
            "  a) В выпадающем списке выберите 'iPhone 12'",
            "  b) Обратите внимание на изменение размера экрана",
            "Проверьте адаптивность:",
            "  a) Прокрутите страницу вверх-вниз",
            "  b) Проверьте, как выглядят кнопки и текст",
            "  c) Убедитесь, что все элементы помещаются на экран",
            "Измените ориентацию:",
            "  a) Нажмите кнопку поворота экрана (🔄)",
            "  b) Проверьте, как выглядит сайт в ландшафтном режиме",
            "Настройте сеть:",
            "  a) В выпадающем списке 'No throttling' выберите 'Slow 3G'",
            "  b) Обновите страницу (F5) и посмотрите на скорость загрузки"
          ],
          hints: [
            "📸 СКРИНШОТ ДО: Обычный десктопный вид сайта",
            "📸 СКРИНШОТ ПОСЛЕ: Мобильный вид с выбранным устройством",
            "💡 Device Mode эмулирует реальные устройства и их возможности",
            "💡 Throttling помогает тестировать производительность на медленных сетях",
            "💡 Проверяйте touch события - клики мышью превращаются в тапы",
            "💡 Используйте 'Responsive' для создания собственных размеров экрана"
          ]
        }
      ]
    };

    setCurrentLesson(devToolsLesson);
    
    // Загружаем прогресс из localStorage
    const savedProgress = localStorage.getItem('devtools-progress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    const newCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('devtools-progress', JSON.stringify(newCompletedTasks));
  };

  const getProgressPercentage = () => {
    if (!currentLesson) return 0;
    return Math.round((completedTasks.length / currentLesson.tasks.length) * 100);
  };

  if (!currentLesson) {
    return <div className="container mx-auto px-4 py-8">Загрузка урока...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentLesson.title}
          </h1>
          <p className="text-gray-600 mb-4">{currentLesson.description}</p>
          
          {/* Прогресс бар */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс</span>
              <span className="text-sm text-gray-500">
                {completedTasks.length} из {currentLesson.tasks.length} задач
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {getProgressPercentage()}% завершено
            </p>
          </div>

          {/* Переключатель вкладок */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'theory'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Теория
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'practice'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Практика
            </button>
          </div>
        </div>

        {/* Теоретическая часть */}
        {activeTab === 'theory' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое DevTools?</h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Инструменты разработчика (DevTools) — это встроенные в браузер инструменты, 
                которые помогают веб-разработчикам отлаживать, тестировать и оптимизировать 
                веб-приложения.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Основные вкладки DevTools:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">🔍 Elements</h4>
                  <p className="text-sm text-gray-600">
                    Инспектор HTML и CSS. Позволяет просматривать и редактировать DOM, 
                    стили, атрибуты элементов.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 mb-2">💻 Console</h4>
                  <p className="text-sm text-gray-600">
                    Консоль для выполнения JavaScript команд, просмотра логов, 
                    ошибок и отладочной информации.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">🌐 Network</h4>
                  <p className="text-sm text-gray-600">
                    Мониторинг сетевых запросов, анализ времени загрузки, 
                    размеров файлов и HTTP заголовков.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-orange-600 mb-2">🐛 Sources</h4>
                  <p className="text-sm text-gray-600">
                    Отладчик JavaScript с возможностью постановки breakpoints, 
                    пошагового выполнения кода.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 mb-2">⚡ Performance</h4>
                  <p className="text-sm text-gray-600">
                    Профилировщик производительности для анализа времени выполнения, 
                    памяти и узких мест.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-600 mb-2">📱 Device</h4>
                  <p className="text-sm text-gray-600">
                    Эмуляция мобильных устройств для тестирования адаптивного дизайна 
                    и touch событий.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Полезные горячие клавиши:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li><kbd className="bg-blue-200 px-2 py-1 rounded">F12</kbd> или <kbd className="bg-blue-200 px-2 py-1 rounded">Ctrl+Shift+I</kbd> - Открыть DevTools</li>
                  <li><kbd className="bg-blue-200 px-2 py-1 rounded">Ctrl+Shift+C</kbd> - Инспектор элементов</li>
                  <li><kbd className="bg-blue-200 px-2 py-1 rounded">Ctrl+Shift+M</kbd> - Мобильная эмуляция</li>
                  <li><kbd className="bg-blue-200 px-2 py-1 rounded">Ctrl+Shift+J</kbd> - Открыть Console</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">🎯 Что вы изучите в практических заданиях:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                  <div>
                    <h5 className="font-semibold mb-2">1. Elements - Инспектор HTML/CSS</h5>
                    <ul className="space-y-1">
                      <li>• Поиск элементов с помощью Ctrl+F</li>
                      <li>• Изменение CSS стилей в реальном времени</li>
                      <li>• Добавление новых CSS свойств</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">2. Console - JavaScript интерпретатор</h5>
                    <ul className="space-y-1">
                      <li>• Выполнение JavaScript команд</li>
                      <li>• Поиск элементов на странице</li>
                      <li>• Изменение свойств страницы</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">3. Network - Мониторинг запросов</h5>
                    <ul className="space-y-1">
                      <li>• Анализ HTTP запросов</li>
                      <li>• Проверка времени загрузки</li>
                      <li>• Изучение заголовков и ответов</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">4. Sources - Отладчик JavaScript</h5>
                    <ul className="space-y-1">
                      <li>• Постановка breakpoints</li>
                      <li>• Пошаговое выполнение кода</li>
                      <li>• Просмотр переменных</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">5. Performance - Анализ производительности</h5>
                    <ul className="space-y-1">
                      <li>• Запись и анализ производительности</li>
                      <li>• Поиск узких мест</li>
                      <li>• Оптимизация загрузки</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">6. Device Mode - Мобильная эмуляция</h5>
                    <ul className="space-y-1">
                      <li>• Тестирование на разных устройствах</li>
                      <li>• Проверка адаптивности</li>
                      <li>• Эмуляция медленных сетей</li>
                    </ul>
                  </div>
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
                      <h3 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.category === 'Elements' ? 'bg-blue-100 text-blue-800' :
                        task.category === 'Console' ? 'bg-green-100 text-green-800' :
                        task.category === 'Network' ? 'bg-purple-100 text-purple-800' :
                        task.category === 'Sources' ? 'bg-orange-100 text-orange-800' :
                        task.category === 'Performance' ? 'bg-red-100 text-red-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {task.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      completedTasks.includes(task.id)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {completedTasks.includes(task.id) ? '✅ Выполнено' : '⏳ Выполнить'}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📋 Инструкции:</h4>
                    <ol className="space-y-2">
                      {task.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">💡 Подсказки:</h4>
                    <ul className="space-y-2">
                      {task.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">💡</span>
                          <span className="text-sm text-gray-600">{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Демо элемент для практики */}
        <div className="devtools-demo bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mt-8">
          <h3 className="text-xl font-bold mb-2">🎯 Демо элемент для практики</h3>
          <p className="mb-4">
            Этот элемент создан специально для практических заданий по DevTools. 
            Попробуйте изменить его стили, атрибуты или содержимое!
          </p>
          <button 
            onClick={() => alert('Привет из DevTools!')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Нажми меня!
          </button>
        </div>
      </div>
    </div>
  );
}
