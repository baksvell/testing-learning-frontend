'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  challenge: string;
  beforeImage?: string;
  afterImage?: string;
  solution: {
    steps: string[];
    tips: string[];
  };
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
  const [showSolutions, setShowSolutions] = useState<{[key: number]: boolean}>({});
  const [showVideos, setShowVideos] = useState<{[key: number]: boolean}>({});
  const [demoState, setDemoState] = useState<{[key: number]: {
    isRunning: boolean;
    isPaused: boolean;
    currentStep: number;
    speed: number;
  }}>({});

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
          challenge: "Найдите элемент с классом 'devtools-demo' на этой странице и измените его внешний вид: сделайте текст красным и добавьте синюю рамку толщиной 2px.",
          beforeImage: "/screenshots/devtools/elements-before.svg",
          afterImage: "/screenshots/devtools/elements-after.svg",
          solution: {
            steps: [
              "Откройте DevTools (F12 или Ctrl+Shift+I)",
              "Перейдите на вкладку Elements (должна быть активна)",
              "Найдите элемент с классом 'devtools-demo':",
              "  • ВАЖНО: Сначала кликните мышкой в панель DevTools (справа)",
              "  • Затем нажмите Ctrl+F в панели Elements",
              "  • Введите 'devtools-demo' в поле поиска",
              "  • Нажимайте стрелку вниз ⬇️ пока не найдете HTML элемент (не текст инструкции)",
              "  • Элемент должен быть выделен желтым цветом",
              "Измените цвет текста на красный:",
              "  • В правой панели Styles найдите блок 'element.style { }'",
              "  • Кликните внутри фигурных скобок { }",
              "  • Введите: color: red; и нажмите Enter",
              "Добавьте синюю рамку:",
              "  • Снова кликните внутри { } в element.style",
              "  • Введите: border: 2px solid blue; и нажмите Enter",
              "Проверьте результат - элемент должен иметь красный текст и синюю рамку"
            ],
            tips: [
              "Если не видите element.style, убедитесь что элемент выбран (подсвечен желтым)",
              "Можно также кликнуть правой кнопкой на элемент на странице и выбрать 'Inspect'",
              "Изменения видны мгновенно - не нужно сохранять файлы!",
              "В панели Styles можно видеть все CSS правила, применяемые к элементу",
              "element.style имеет наивысший приоритет и переопределяет другие стили",
              "ВАЖНО: Перед Ctrl+F обязательно кликните мышкой в панель DevTools!"
            ]
          }
        },
        {
          id: 2,
          title: "Анализ вкладки Console",
          description: "Изучите консоль для выполнения JavaScript команд и отладки",
          category: "Console",
          completed: false,
          challenge: "Используйте консоль для выполнения JavaScript команд: выведите сообщение в консоль, найдите демо-элемент внизу страницы (с классом 'devtools-demo') и измените заголовок страницы.",
          beforeImage: "/screenshots/devtools/console-before.svg",
          afterImage: "/screenshots/devtools/console-after.svg",
          solution: {
            steps: [
              "Откройте вкладку Console в DevTools (рядом с Elements)",
              "Очистите консоль: нажмите кнопку 🚫 или Ctrl+L",
              "Выполните команду логирования:",
              "  • Введите: console.log('Привет, DevTools!')",
              "  • Нажмите Enter",
              "  • Должно появиться сообщение в консоли",
              "Найдите демо-элемент на странице:",
              "  • Прокрутите страницу вниз до синего блока 'Демо элемент для практики'",
              "  • Введите: document.querySelector('.devtools-demo')",
              "  • Нажмите Enter",
              "  • В консоли должен появиться HTML элемент <div class='devtools-demo'>",
              "Измените заголовок страницы:",
              "  • Введите: document.title = 'DevTools Урок - Изучаем!';",
              "  • Нажмите Enter",
              "  • Проверьте заголовок вкладки браузера"
            ],
            tips: [
              "Консоль - это JavaScript интерпретатор в браузере",
              "Используйте Tab для автодополнения команд",
              "Стрелка вверх ↑ показывает предыдущие команды",
              "Кликните на результат в консоли для детального просмотра",
              "Консоль показывает ошибки JavaScript в реальном времени",
              "Демо-элемент находится в самом низу страницы - прокрутите вниз!",
              "document.querySelector() находит первый элемент с указанным селектором"
            ]
          }
        },
        {
          id: 3,
          title: "Мониторинг Network",
          description: "Изучите сетевые запросы и производительность загрузки",
          category: "Network",
          completed: false,
          challenge: "Изучите сетевые запросы страницы: найдите API запросы, проверьте их статус и время загрузки, изучите заголовки и содержимое ответов.",
          beforeImage: "/screenshots/devtools/network-before.svg",
          afterImage: "/screenshots/devtools/network-after.svg",
          solution: {
            steps: [
              "Откройте вкладку Network в DevTools",
              "Очистите список запросов: нажмите кнопку 🚫",
              "Обновите страницу (F5 или Ctrl+R)",
              "Найдите API запросы:",
              "  • Ищите запросы к /api/ (например, /api/tasks, /api/stats)",
              "  • Или используйте фильтр 'XHR' для AJAX запросов",
              "Изучите детали запроса:",
              "  • Кликните на любой API запрос",
              "  • Посмотрите вкладку 'Headers' - заголовки запроса и ответа",
              "  • Посмотрите вкладку 'Response' - содержимое ответа",
              "  • Посмотрите вкладку 'Timing' - время загрузки",
              "Проверьте статус ответа (должен быть 200 OK)"
            ],
            tips: [
              "💡 Network показывает все ресурсы, которые загружает страница",
              "💡 Зеленые запросы (200) - успешные, красные (4xx, 5xx) - ошибки",
              "💡 Время загрузки показано справа от каждого запроса",
              "💡 Используйте фильтры (XHR, JS, CSS) для поиска конкретных типов ресурсов",
              "💡 Вкладка 'Timing' показывает детальную информацию о времени загрузки"
            ]
          }
        },
        {
          id: 4,
          title: "Отладка в Sources",
          description: "Научитесь использовать отладчик JavaScript для пошагового выполнения кода",
          category: "Sources",
          completed: false,
          challenge: "Используйте отладчик JavaScript: найдите файл с кодом, поставьте breakpoint и пошагово выполните код, изучив переменные в процессе.",
          beforeImage: "/screenshots/devtools/sources-before.svg",
          afterImage: "/screenshots/devtools/sources-after.svg",
          solution: {
            steps: [
              "Откройте вкладку Sources в DevTools",
              "Найдите JavaScript файлы:",
              "  • В левой панели найдите папку с вашим сайтом",
              "  • Найдите файл с кодом страницы (обычно в _next/static/chunks/)",
              "Поставьте breakpoint:",
              "  • Найдите строку с кодом (например, с console.log или функцией)",
              "  • Кликните на номер строки слева - появится красная точка",
              "  • Это breakpoint - код остановится на этой строке",
              "Запустите отладку:",
              "  • Обновите страницу (F5)",
              "  • Код остановится на breakpoint",
              "  • В правой панели 'Scope' видны переменные",
              "Используйте кнопки отладки:",
              "  • ▶️ Continue - продолжить выполнение",
              "  • ⏭️ Step Over (F10) - выполнить текущую строку",
              "  • ⏬ Step Into (F11) - войти в функцию"
            ],
            tips: [
              "💡 Breakpoints помогают найти ошибки в коде",
              "💡 В панели 'Call Stack' видна цепочка вызовов функций",
              "💡 В панели 'Watch' можно следить за значениями переменных",
              "💡 Удалить breakpoint: кликните на красную точку еще раз",
              "💡 Условные breakpoints можно создать правым кликом на номер строки"
            ]
          }
        },
        {
          id: 5,
          title: "Анализ Performance",
          description: "Изучите производительность веб-приложения и найдите узкие места",
          category: "Performance",
          completed: false,
          challenge: "Запишите и проанализируйте производительность страницы: выполните различные действия и изучите временную шкалу для поиска узких мест.",
          beforeImage: "/screenshots/devtools/performance-before.svg",
          afterImage: "/screenshots/devtools/performance-after.svg",
          solution: {
            steps: [
              "Откройте вкладку Performance в DevTools",
              "Настройте запись:",
              "  • Убедитесь что выбрано 'Screenshots' и 'Memory'",
              "  • Нажмите кнопку Record (круглая кнопка) или Ctrl+E",
              "Выполните действия на странице:",
              "  • Обновите страницу (F5)",
              "  • Кликните на кнопки и элементы",
              "  • Прокрутите страницу вверх-вниз",
              "  • Подождите 3-5 секунд",
              "Остановите запись:",
              "  • Нажмите кнопку Stop или Ctrl+E",
              "  • Дождитесь обработки результатов",
              "Изучите результаты:",
              "  • Посмотрите на временную шкалу сверху",
              "  • Красные полосы указывают на проблемы",
              "  • Изучите Call Tree внизу для деталей"
            ],
            tips: [
              "💡 Performance показывает время выполнения JavaScript, рендеринга, загрузки",
              "💡 FPS (кадры в секунду) должен быть близок к 60",
              "💡 Длинные красные полосы указывают на медленные операции",
              "💡 Используйте фильтры для фокуса на конкретных типах операций",
              "💡 Screenshots помогают понять, что происходило в каждый момент времени"
            ]
          }
        },
        {
          id: 6,
          title: "Мобильная эмуляция",
          description: "Научитесь тестировать адаптивный дизайн на разных устройствах",
          category: "Device",
          completed: false,
          challenge: "Протестируйте адаптивность сайта: включите мобильную эмуляцию, выберите устройство, проверьте разные ориентации экрана и настройте медленную сеть.",
          beforeImage: "/screenshots/devtools/device-before.svg",
          afterImage: "/screenshots/devtools/device-after.svg",
          solution: {
            steps: [
              "Включите Device Mode:",
              "  • Нажмите Ctrl+Shift+M или иконку 📱 в DevTools",
              "  • Страница должна измениться на мобильный вид",
              "Выберите устройство:",
              "  • В выпадающем списке выберите 'iPhone 12'",
              "  • Обратите внимание на изменение размера экрана",
              "Проверьте адаптивность:",
              "  • Прокрутите страницу вверх-вниз",
              "  • Проверьте, как выглядят кнопки и текст",
              "  • Убедитесь, что все элементы помещаются на экран",
              "Измените ориентацию:",
              "  • Нажмите кнопку поворота экрана (🔄)",
              "  • Проверьте, как выглядит сайт в ландшафтном режиме",
              "Настройте сеть:",
              "  • В выпадающем списке 'No throttling' выберите 'Slow 3G'",
              "  • Обновите страницу (F5) и посмотрите на скорость загрузки"
            ],
            tips: [
              "💡 Device Mode эмулирует реальные устройства и их возможности",
              "💡 Throttling помогает тестировать производительность на медленных сетях",
              "💡 Проверяйте touch события - клики мышью превращаются в тапы",
              "💡 Используйте 'Responsive' для создания собственных размеров экрана",
              "💡 Device Mode показывает, как сайт выглядит на реальных устройствах"
            ]
          }
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

  const toggleSolution = (taskId: number) => {
    setShowSolutions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleVideo = (taskId: number) => {
    setShowVideos(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const startDemo = async (taskId: number) => {
    console.log('🎬 Starting demo for task:', taskId);
    
    // Проверяем, открыты ли DevTools
    if (!isDevToolsOpen()) {
      // DevTools не открыты, показываем инструкцию и НЕ запускаем демонстрацию
      showDevToolsInstruction();
      return;
    }
    
    // DevTools открыты, запускаем демонстрацию
    showDemoMessage('🎬 DevTools открыты! Демонстрация началась!');
    
    setDemoState(prev => ({
      ...prev,
      [taskId]: {
        isRunning: true,
        isPaused: false,
        currentStep: 0,
        speed: prev[taskId]?.speed || 0.25  // Очень медленно по умолчанию
      }
    }));

    // Запускаем демонстрацию для конкретного задания
    await runDemoForTask(taskId);
  };

  const pauseDemo = (taskId: number) => {
    setDemoState(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isPaused: !prev[taskId]?.isPaused
      }
    }));
  };

  const resetDemo = (taskId: number) => {
    setDemoState(prev => ({
      ...prev,
      [taskId]: {
        isRunning: false,
        isPaused: false,
        currentStep: 0,
        speed: 1
      }
    }));
  };

  const setDemoSpeed = (taskId: number, speed: number) => {
    setDemoState(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        speed
      }
    }));
  };

  const runDemoForTask = async (taskId: number) => {
    console.log('🚀 runDemoForTask called for task:', taskId);
    
    if (typeof window === 'undefined') {
      console.log('❌ Window is undefined, returning');
      return;
    }
    
    const task = currentLesson?.tasks.find(t => t.id === taskId);
    if (!task) {
      console.log('❌ Task not found:', taskId);
      return;
    }

    console.log('✅ Task found:', task);

    // Определяем шаги демонстрации для каждого задания
    const demoSteps = getDemoStepsForTask(taskId);
    console.log('📋 Demo steps:', demoSteps);
    
    for (let i = 0; i < demoSteps.length; i++) {
      console.log('🎯 Executing step:', i, demoSteps[i]);

      setDemoState(prev => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          currentStep: i
        }
      }));

      await executeDemoStep(demoSteps[i], taskId);
      
      // Пауза между шагами (зависит от скорости) - еще больше увеличена
      const delay = 8000 / (demoState[taskId]?.speed || 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    console.log('🏁 Demo completed for task:', taskId);

    // Показываем сообщение о завершении
    showDemoMessage('✅ Демонстрация завершена! Теперь попробуйте сами в DevTools.');

    // Завершаем демонстрацию
    setDemoState(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isRunning: false,
        isPaused: false
      }
    }));
  };

  const getDemoStepsForTask = (taskId: number) => {
    switch (taskId) {
      case 1: // Elements
        return [
          { 
            type: 'highlight', 
            selector: '.devtools-demo', 
            message: '🎯 Шаг 1: Находим элемент с классом "devtools-demo" на странице',
            details: 'Этот элемент находится ниже на странице'
          },
          { 
            type: 'simulate', 
            action: 'navigateToConsole', 
            message: '📋 Шаг 2: Переходим на вкладку Console',
            details: 'В DevTools нажмите на вкладку "Console"'
          },
          { 
            type: 'simulate', 
            action: 'openSearch', 
            message: '🔍 Шаг 3: Открываем поиск в DevTools',
            details: 'ВАЖНО: Нажмите Ctrl+F именно В DevTools (справа), а НЕ в браузере!'
          },
          { 
            type: 'simulate', 
            action: 'searchElement', 
            message: '🔍 Шаг 4: Ищем элемент "devtools-demo"',
            details: 'В поле поиска введите: devtools-demo\nВАЖНО: Ищите HTML элемент <div>, а не текст инструкции!'
          },
          { 
            type: 'simulate', 
            action: 'selectElement', 
            message: '👆 Шаг 5: Выбираем найденный элемент',
            details: 'Кликните на найденный элемент в HTML'
          },
          { 
            type: 'simulate', 
            action: 'clickElementStyle', 
            message: '👆 Шаг 6: Кликаем в element.style',
            details: 'В панели Styles найдите блок element.style и кликните в него'
          },
          { 
            type: 'simulate', 
            action: 'addCSS', 
            property: 'color', 
            value: 'red', 
            message: '🎨 Шаг 7: Добавляем красный цвет',
            details: 'В element.style введите: color: red;'
          },
          { 
            type: 'simulate', 
            action: 'addCSS', 
            property: 'border', 
            value: '2px solid blue', 
            message: '🎨 Шаг 8: Добавляем синюю рамку',
            details: 'В element.style введите: border: 2px solid blue;'
          },
          { 
            type: 'complete', 
            message: '✅ Задание выполнено!',
            details: 'Элемент теперь имеет красный текст и синюю рамку'
          }
        ];
      default:
        return [];
    }
  };

  const executeDemoStep = async (step: any, taskId: number) => {
    console.log('⚡ executeDemoStep:', step.type, step);
    
    if (typeof window === 'undefined') {
      console.log('❌ Window is undefined in executeDemoStep');
      return;
    }
    
    switch (step.type) {
      case 'instruction':
        console.log('📋 Showing instruction:', step.message);
        showDetailedMessage(step.message, step.details);
        break;
      case 'highlight':
        console.log('🎯 Highlighting element:', step.selector);
        await highlightElement(step.selector, step.message, step.details);
        break;
      case 'simulate':
        console.log('🎭 Simulating action:', step.action);
        await simulateAction(step.action, step, taskId);
        break;
      case 'complete':
        console.log('✅ Task completed:', step.message);
        showDetailedMessage(step.message, step.details);
        break;
    }
  };

  const highlightElement = async (selector: string, message: string, details?: string) => {
    if (typeof window === 'undefined') return;
    
    console.log('🔍 Looking for element with selector:', selector);
    
    // Показываем детальное сообщение сначала
    showDetailedMessage(message, details);
    
    // Ждем немного, чтобы пользователь прочитал сообщение
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Пробуем разные варианты поиска элемента
    let element = document.querySelector(selector) as HTMLElement;
    
    if (!element) {
      console.log('❌ Element not found with selector:', selector);
      console.log('🔍 Trying alternative selectors...');
      
      // Пробуем альтернативные селекторы
      const alternatives = [
        'div.devtools-demo',
        '[class*="devtools-demo"]',
        '.devtools-demo.bg-gradient-to-r',
        'div[class*="devtools-demo"]'
      ];
      
      for (const altSelector of alternatives) {
        element = document.querySelector(altSelector) as HTMLElement;
        if (element) {
          console.log('✅ Element found with alternative selector:', altSelector);
          break;
        }
      }
    }
    
    if (element) {
      console.log('✅ Element found:', element);
      console.log('Element tagName:', element.tagName);
      console.log('Element classes:', element.className);
      console.log('Element id:', element.id);
      console.log('Element text:', element.textContent?.substring(0, 100));
      console.log('Element position:', element.getBoundingClientRect());
      
      // Убираем подсветку с других элементов
      document.querySelectorAll('.demo-highlight').forEach(el => {
        el.classList.remove('demo-highlight');
        (el as HTMLElement).style.boxShadow = '';
        (el as HTMLElement).style.transform = '';
        (el as HTMLElement).style.transition = '';
        (el as HTMLElement).style.border = '';
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.position = '';
      });
      
      // Добавляем очень заметную подсветку
      element.classList.add('demo-highlight');
      element.style.boxShadow = '0 0 30px rgba(255, 0, 0, 1), 0 0 60px rgba(255, 0, 0, 0.5)';
      element.style.transform = 'scale(1.05)';
      element.style.transition = 'all 0.5s ease';
      element.style.border = '5px solid #ff0000';
      element.style.zIndex = '9999';
      element.style.position = 'relative';
      element.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
      
      // Прокручиваем к элементу
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Убираем подсветку через 8 секунд (еще медленнее)
      setTimeout(() => {
        element.classList.remove('demo-highlight');
        element.style.boxShadow = '';
        element.style.transform = '';
        element.style.transition = '';
        element.style.border = '';
        element.style.zIndex = '';
        element.style.position = '';
        element.style.backgroundColor = '';
      }, 8000);
    } else {
      console.log('❌ Element not found with any selector');
      console.log('🔍 Available elements with "devtools" in class:');
      document.querySelectorAll('[class*="devtools"]').forEach((el, index) => {
        console.log(`${index + 1}.`, el.tagName, el.className, el.textContent?.substring(0, 30));
      });
      
      showDetailedMessage(
        `❌ Элемент не найден: ${selector}`, 
        'Проверьте консоль для отладочной информации. Возможно, элемент еще не загружен.'
      );
    }
  };

  const waitForUserAction = (action: string): Promise<void> => {
    return new Promise((resolve) => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (action === 'ctrl+f' && event.ctrlKey && event.key === 'f') {
          console.log('✅ User pressed Ctrl+F');
          document.removeEventListener('keydown', handleKeyDown);
          
          // Убираем интерактивное сообщение
          const interactiveMessage = document.querySelector('.demo-message.interactive');
          if (interactiveMessage) {
            interactiveMessage.remove();
          }
          
          // Показываем подтверждение
          showDetailedMessage('✅ Отлично! Поиск открыт', 'Теперь введите "devtools-demo" в поле поиска');
          
          resolve();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      // Показываем интерактивное сообщение с кнопкой
      showInteractiveMessageWithButton(action, resolve);
    });
  };

  const waitForSearchInput = (): Promise<void> => {
    return new Promise((resolve) => {
      // Показываем интерактивное сообщение для ввода текста
      const messageEl = document.createElement('div');
      messageEl.className = 'demo-message interactive';
      messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f59e0b;
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 16px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        animation: pulse 2s infinite;
        max-width: 400px;
        line-height: 1.4;
        border: 2px solid #d97706;
      `;
      
      messageEl.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>🔍</span>
          <span>Введите "devtools-demo" в поиск</span>
        </div>
        <div style="opacity: 0.9; font-size: 14px; margin-bottom: 12px;">
          В поле поиска DevTools введите: <code style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">devtools-demo</code>
        </div>
        <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px; margin-bottom: 12px; font-size: 12px;">
          ⚠️ <strong>ВАЖНО:</strong> Ищите HTML элемент <code>&lt;div&gt;</code> с классом "devtools-demo", а НЕ текст инструкции!
        </div>
        <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 4px; margin-bottom: 12px; font-size: 12px;">
          <strong>🔍 Что искать в результатах:</strong><br>
          <div style="margin-top: 8px; font-family: monospace; font-size: 11px; background: rgba(0,0,0,0.1); padding: 6px; border-radius: 3px;">
            &lt;div class="devtools-demo bg-gradient-to-r..."&gt;<br>
            &nbsp;&nbsp;🎯 Демо элемент для практики<br>
            &lt;/div&gt;
          </div>
          <div style="margin-top: 6px; font-size: 11px; opacity: 0.8;">
            ↑ Это HTML элемент, который нужно найти
          </div>
        </div>
        <div style="margin-bottom: 12px; font-size: 12px; opacity: 0.8;">
          💡 После ввода нажмите Enter или кликните на найденный элемент
        </div>
        <button id="continue-search" style="
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
          Продолжить
        </button>
      `;
      
      document.body.appendChild(messageEl);
      
      // Обработчик кнопки "Продолжить"
      const continueBtn = messageEl.querySelector('#continue-search');
      continueBtn?.addEventListener('click', () => {
        console.log('✅ User clicked Continue button for search');
        messageEl.remove();
        
        // Показываем подтверждение
        showDetailedMessage('✅ Отлично! Элемент найден', 'Теперь кликните на найденный элемент в HTML');
        
        resolve();
      });
      
      // Ждем 15 секунд, затем продолжаем (предполагаем, что пользователь ввел текст)
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.remove();
        }
        
        // Показываем подтверждение
        showDetailedMessage('✅ Отлично! Элемент найден', 'Теперь кликните на найденный элемент в HTML');
        
        resolve();
      }, 15000);
    });
  };

  const showInteractiveMessageWithButton = (action: string, resolve: () => void) => {
    if (typeof window === 'undefined') return;
    
    let message = '';
    let details = '';
    
    switch (action) {
      case 'ctrl+f':
        message = '⌨️ Откройте поиск в DevTools';
        details = 'ВАЖНО: Нажмите Ctrl+F именно В DevTools (справа), а НЕ в браузере!';
        break;
    }
    
    // Создаем интерактивное сообщение с кнопкой
    const messageEl = document.createElement('div');
    messageEl.className = 'demo-message interactive';
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 20px 24px;
      border-radius: 12px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      animation: pulse 2s infinite;
      max-width: 400px;
      line-height: 1.4;
      border: 2px solid #059669;
    `;
    
    messageEl.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <span>⌨️</span>
        <span>${message}</span>
      </div>
      <div style="opacity: 0.9; font-size: 14px; margin-bottom: 12px;">${details}</div>
      <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px; margin-bottom: 12px; font-size: 12px;">
        <strong>📋 Пошаговая инструкция:</strong><br>
        1. Кликните мышкой в панель DevTools (справа)<br>
        2. Перейдите на вкладку <strong style="color: #007acc;">Console</strong><br>
        3. Убедитесь, что DevTools активны<br>
        4. Нажмите <kbd style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">Ctrl+F</kbd> в DevTools
      </div>
      <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 4px; margin-bottom: 12px; font-size: 12px;">
        <strong>🔍 Где искать поиск:</strong><br>
        <div style="margin-top: 8px;">
          <div style="
            background: #f0f0f0;
            border: 2px solid #007acc;
            border-radius: 4px;
            padding: 8px;
            font-size: 11px;
            color: #333;
            margin-bottom: 6px;
          ">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="background: #007acc; color: white; padding: 2px 6px; border-radius: 2px; font-size: 10px;">DevTools</span>
              <span style="opacity: 0.7;">Elements | <strong style="color: #007acc;">Console</strong> | Sources | Network</span>
            </div>
            <div style="
              background: white;
              border: 1px solid #ddd;
              border-radius: 3px;
              padding: 4px 8px;
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 10px;
            ">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <span>devtools-demo</span>
              <div style="
                background: #666;
                color: white;
                border-radius: 50%;
                width: 12px;
                height: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                margin-left: auto;
              ">×</div>
            </div>
          </div>
          <div style="font-size: 10px; opacity: 0.8; text-align: center;">
            ↑ Поиск находится ВНУТРИ DevTools (справа)
          </div>
        </div>
      </div>
      <div style="margin-bottom: 12px; font-size: 12px; opacity: 0.8;">
        💡 Если не получается, просто нажмите кнопку "Продолжить" ниже
      </div>
      <button id="continue-demo" style="
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
        transition: background 0.2s ease;
      " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
        Продолжить
      </button>
    `;
    
    document.body.appendChild(messageEl);
    
    // Обработчик кнопки "Продолжить"
    const continueBtn = messageEl.querySelector('#continue-demo');
    continueBtn?.addEventListener('click', () => {
      console.log('✅ User clicked Continue button');
      messageEl.remove();
      
      // Показываем подтверждение
      showDetailedMessage('✅ Отлично! Поиск открыт', 'Теперь введите "devtools-demo" в поле поиска');
      
      resolve();
    });
    
    // Убираем сообщение через 60 секунд (если пользователь не нажал)
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 60000);
  };

  const showInteractiveMessage = (action: string) => {
    if (typeof window === 'undefined') return;
    
    let message = '';
    let details = '';
    
    switch (action) {
      case 'ctrl+f':
        message = '⌨️ Нажмите Ctrl+F в DevTools';
        details = 'Программа ждет, пока вы откроете поиск в DevTools...';
        break;
    }
    
    // Создаем интерактивное сообщение
    const messageEl = document.createElement('div');
    messageEl.className = 'demo-message interactive';
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 20px 24px;
      border-radius: 12px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      animation: pulse 2s infinite;
      max-width: 400px;
      line-height: 1.4;
      border: 2px solid #059669;
    `;
    
    messageEl.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <span>⌨️</span>
        <span>${message}</span>
      </div>
      <div style="opacity: 0.9; font-size: 14px;">${details}</div>
      <div style="margin-top: 12px; font-size: 12px; opacity: 0.8;">
        💡 Нажмите <kbd style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">Ctrl+F</kbd> в DevTools
      </div>
    `;
    
    document.body.appendChild(messageEl);
    
    // Убираем сообщение через 30 секунд (если пользователь не нажал)
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 30000);
  };

  const simulateAction = async (action: string, step: any, taskId: number) => {
    if (typeof window === 'undefined') return;
    
    // Показываем детальное сообщение
    showDetailedMessage(step.message, step.details);
    
    switch (action) {
      case 'navigateToConsole':
        // Симулируем переход на вкладку Console
        console.log('Navigating to Console tab');
        break;
        
      case 'openSearch':
        // Ждем, пока пользователь нажмет Ctrl+F
        console.log('Waiting for user to press Ctrl+F');
        await waitForUserAction('ctrl+f');
        break;
        
      case 'searchElement':
        // Ждем, пока пользователь введет "devtools-demo" в поиск
        console.log('Waiting for user to search for devtools-demo');
        await waitForSearchInput();
        break;
        
      case 'selectElement':
        // Симулируем выбор элемента
        console.log('Selecting element in DevTools');
        break;
        
      case 'clickElementStyle':
        console.log('Clicking in element.style');
        break;
        
      case 'addCSS':
        // Эмулируем добавление CSS
        if (step.property === 'color' && step.value === 'red') {
          const element = document.querySelector('.devtools-demo') as HTMLElement;
          if (element) {
            element.style.color = 'red';
            element.style.transition = 'color 0.5s ease';
            console.log('Added red color to element');
          }
        } else if (step.property === 'border' && step.value === '2px solid blue') {
          const element = document.querySelector('.devtools-demo') as HTMLElement;
          if (element) {
            element.style.border = '2px solid blue';
            element.style.transition = 'border 0.5s ease';
            console.log('Added blue border to element');
          }
        }
        break;
    }
  };

  const isDevToolsOpen = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Проверяем несколько способов определения открытых DevTools
    const threshold = 160;
    
    // Способ 1: Проверка высоты окна
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      return true;
    }
    
    // Способ 2: Проверка через console
    let devtools = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        devtools = true;
        throw new Error('DevTools detected');
      }
    });
    
    try {
      console.log(element);
      console.clear();
    } catch (e) {
      // DevTools открыты
    }
    
    return devtools;
  };

  const showDevToolsInstruction = () => {
    if (typeof window === 'undefined') return;
    
    // DevTools не открыты, показываем инструкцию
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 500px;
      margin: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      text-align: center;
    `;
    
    content.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">🔧 DevTools не открыты</h3>
      <p style="margin: 0 0 20px 0; color: #4b5563; line-height: 1.6;">
        Для демонстрации нужно открыть инструменты разработчика:
      </p>
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <strong style="color: #1f2937;">Нажмите F12 или Ctrl+Shift+I</strong>
      </div>
      <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px;">
        После открытия DevTools нажмите "Проверить снова"
      </p>
      <button id="devtools-check" style="
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        margin-right: 10px;
      ">Проверить снова</button>
      <button id="devtools-cancel" style="
        background: #6b7280;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
      ">Отмена</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Обработчики кнопок
    const checkBtn = content.querySelector('#devtools-check');
    const cancelBtn = content.querySelector('#devtools-cancel');
    
    checkBtn?.addEventListener('click', () => {
      modal.remove();
      // Проверяем снова и запускаем демонстрацию если DevTools открыты
      setTimeout(() => {
        if (isDevToolsOpen()) {
          // DevTools открыты, запускаем демонстрацию
          showDemoMessage('🎬 DevTools открыты! Демонстрация началась!');
          
          setDemoState(prev => ({
            ...prev,
            [1]: {
              isRunning: true,
              isPaused: false,
              currentStep: 0,
              speed: prev[1]?.speed || 0.25  // Очень медленно по умолчанию
            }
          }));

          // Запускаем демонстрацию
          runDemoForTask(1);
        } else {
          showDevToolsInstruction();
        }
      }, 100);
    });
    
    cancelBtn?.addEventListener('click', () => {
      modal.remove();
      // Останавливаем демонстрацию
      setDemoState(prev => ({
        ...prev,
        [1]: {
          ...prev[1],
          isRunning: false,
          isPaused: false
        }
      }));
    });
  };

  const showDetailedMessage = (message: string, details?: string) => {
    if (typeof window === 'undefined') return;
    
    // Создаем детальное сообщение
    const messageEl = document.createElement('div');
    messageEl.className = 'demo-message';
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #3b82f6;
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease-out;
      max-width: 400px;
      line-height: 1.4;
    `;
    
    if (details) {
      messageEl.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px;">${message}</div>
        <div style="opacity: 0.9; font-size: 13px;">${details}</div>
      `;
    } else {
      messageEl.textContent = message;
    }
    
    document.body.appendChild(messageEl);
    
    // Убираем сообщение через 6 секунд (еще больше увеличено для чтения деталей)
    setTimeout(() => {
      messageEl.remove();
    }, 6000);
  };

  const showDemoMessage = (message: string) => {
    showDetailedMessage(message);
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
          <div className="space-y-8">
            {currentLesson.tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
                {/* Заголовок задания */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                    <p className="text-gray-600 mb-4">{task.description}</p>
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

                {/* Задание */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">🎯 Задание:</h4>
                  <p className="text-yellow-700">{task.challenge}</p>
                </div>

                {/* Скриншоты до и после */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-3">📸 До выполнения:</h4>
                    <div className="bg-gray-100 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                      {task.beforeImage ? (
                        <img 
                          src={task.beforeImage} 
                          alt="До выполнения задания" 
                          className="max-w-full max-h-[200px] rounded border"
                        />
                      ) : (
                        <p className="text-gray-500 text-sm">Скриншот будет добавлен</p>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-3">📸 После выполнения:</h4>
                    <div className="bg-gray-100 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                      {task.afterImage ? (
                        <img 
                          src={task.afterImage} 
                          alt="После выполнения задания" 
                          className="max-w-full max-h-[200px] rounded border"
                        />
                      ) : (
                        <p className="text-gray-500 text-sm">Скриншот будет добавлен</p>
                      )}
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
                    
                    {/* Кнопка видео только для Elements */}
                    {task.id === 1 && (
                      <button
                        onClick={() => toggleVideo(task.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        {showVideos[task.id] ? (
                          <>
                            <span>🔒</span>
                            Скрыть видео
                          </>
                        ) : (
                          <>
                            <span>🎥</span>
                            Посмотреть видео
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Решение (скрыто по умолчанию) */}
                {showSolutions[task.id] && (
                  <>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-3">✅ Решение:</h4>
                      <ol className="space-y-2">
                        {task.solution.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="bg-green-100 text-green-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-sm text-green-700">{step}</span>
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

                {/* Видео-демонстрация (скрыто по умолчанию) */}
                {showVideos[task.id] && task.id === 1 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 text-blue-800">🎥 Видео-демонстрация</h4>
                    <p className="text-blue-600 mb-4">
                      Посмотрите, как правильно выполнить это задание:
                    </p>
                    <video 
                      width="800" 
                      height="450" 
                      controls 
                      className="rounded-lg shadow-lg w-full max-w-4xl"
                    >
                      <source src="/videos/2025-10-09 14-54-15.mkv" type="video/x-matroska" />
                      <source src="/videos/2025-10-09 14-54-15.mkv" type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                    <p className="text-sm text-gray-600 mt-2">
                      💡 В видео показаны все шаги: открытие DevTools, поиск элемента, изменение стилей
                    </p>
                  </div>
                )}
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
