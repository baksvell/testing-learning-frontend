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
            tips: [
              "💡 Если не видите element.style, убедитесь что элемент выбран (подсвечен желтым)",
              "💡 Можно также кликнуть правой кнопкой на элемент на странице и выбрать 'Inspect'",
              "💡 Изменения видны мгновенно - не нужно сохранять файлы!",
              "💡 В панели Styles можно видеть все CSS правила, применяемые к элементу",
              "💡 element.style имеет наивысший приоритет и переопределяет другие стили"
            ]
          }
        },
        {
          id: 2,
          title: "Анализ вкладки Console",
          description: "Изучите консоль для выполнения JavaScript команд и отладки",
          category: "Console",
          completed: false,
          challenge: "Используйте консоль для выполнения JavaScript команд: выведите сообщение в консоль, найдите элемент на странице и измените заголовок страницы.",
          beforeImage: "/screenshots/devtools/console-before.svg",
          afterImage: "/screenshots/devtools/console-after.svg",
          solution: {
            steps: [
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
            tips: [
              "💡 Консоль - это JavaScript интерпретатор в браузере",
              "💡 Используйте Tab для автодополнения команд",
              "💡 Стрелка вверх ↑ показывает предыдущие команды",
              "💡 Кликните на результат в консоли для детального просмотра",
              "💡 Консоль показывает ошибки JavaScript в реальном времени"
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
              "  a) Ищите запросы к /api/ (например, /api/tasks, /api/stats)",
              "  b) Или используйте фильтр 'XHR' для AJAX запросов",
              "Изучите детали запроса:",
              "  a) Кликните на любой API запрос",
              "  b) Посмотрите вкладку 'Headers' - заголовки запроса и ответа",
              "  c) Посмотрите вкладку 'Response' - содержимое ответа",
              "  d) Посмотрите вкладку 'Timing' - время загрузки",
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
        speed: prev[taskId]?.speed || 1
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
      
      // Пауза между шагами (зависит от скорости)
      const delay = 2000 / (demoState[taskId]?.speed || 1);
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
          { type: 'highlight', selector: '.devtools-demo', message: '🎯 Находим элемент с классом "devtools-demo" на странице' },
          { type: 'simulate', action: 'openDevTools', message: '🔧 Открываем DevTools (нажмите F12)' },
          { type: 'simulate', action: 'searchElement', selector: 'devtools-demo', message: '🔍 В DevTools нажимаем Ctrl+F и ищем "devtools-demo"' },
          { type: 'simulate', action: 'clickElementStyle', message: '👆 В панели Styles кликаем в блок element.style' },
          { type: 'simulate', action: 'addCSS', property: 'color', value: 'red', message: '🎨 Добавляем CSS: color: red;' },
          { type: 'simulate', action: 'addCSS', property: 'border', value: '2px solid blue', message: '🎨 Добавляем CSS: border: 2px solid blue;' }
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
      case 'highlight':
        console.log('🎯 Highlighting element:', step.selector);
        await highlightElement(step.selector, step.message);
        break;
      case 'simulate':
        console.log('🎭 Simulating action:', step.action);
        await simulateAction(step.action, step, taskId);
        break;
    }
  };

  const highlightElement = async (selector: string, message: string) => {
    if (typeof window === 'undefined') return;
    
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      // Показываем сообщение
      showDemoMessage(message);
      
      // Добавляем подсветку
      element.classList.add('demo-highlight');
      
      // Прокручиваем к элементу
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Убираем подсветку через 2 секунды
      setTimeout(() => {
        element.classList.remove('demo-highlight');
      }, 2000);
    }
  };

  const simulateAction = async (action: string, step: any, taskId: number) => {
    if (typeof window === 'undefined') return;
    
    switch (action) {
      case 'openDevTools':
        showDemoMessage('🔧 Открываем DevTools (F12)');
        // Пытаемся открыть DevTools программно (работает не во всех браузерах)
        try {
          // Это может не работать из-за политик безопасности браузера
          if (window.console && (window.console as any).clear) {
            (window.console as any).clear();
          }
        } catch (e) {
          console.log('DevTools cannot be opened programmatically');
        }
        break;
      case 'searchElement':
        showDemoMessage('🔍 Ищем элемент в DevTools: нажмите Ctrl+F и введите "devtools-demo"');
        break;
      case 'clickElementStyle':
        showDemoMessage('👆 Кликаем в element.style в панели Styles');
        break;
      case 'addCSS':
        showDemoMessage(`🎨 Добавляем CSS: ${step.property}: ${step.value}`);
        // Эмулируем добавление CSS
        if (step.property === 'color' && step.value === 'red') {
          const element = document.querySelector('.devtools-demo') as HTMLElement;
          if (element) {
            element.style.color = 'red';
            element.style.transition = 'color 0.5s ease';
          }
        } else if (step.property === 'border' && step.value === '2px solid blue') {
          const element = document.querySelector('.devtools-demo') as HTMLElement;
          if (element) {
            element.style.border = '2px solid blue';
            element.style.transition = 'border 0.5s ease';
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
              speed: prev[1]?.speed || 1
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

  const showDemoMessage = (message: string) => {
    if (typeof window === 'undefined') return;
    
    // Создаем временное сообщение
    const messageEl = document.createElement('div');
    messageEl.className = 'demo-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #3b82f6;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageEl);
    
    // Убираем сообщение через 2 секунды
    setTimeout(() => {
      messageEl.remove();
    }, 2000);
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
                  <div className="flex gap-3 justify-center">
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
                      onClick={() => startDemo(task.id)}
                      disabled={demoState[task.id]?.isRunning}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <span>🎬</span>
                      Показать демо
                    </button>
                  </div>

                  {/* Управление демонстрацией */}
                  {demoState[task.id]?.isRunning && (
                    <div className="demo-controls">
                      <button
                        onClick={() => pauseDemo(task.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
                      >
                        {demoState[task.id]?.isPaused ? '▶️ Продолжить' : '⏸️ Пауза'}
                      </button>
                      
                      <button
                        onClick={() => resetDemo(task.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                      >
                        🔄 Сбросить
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Скорость:</span>
                        <input
                          type="range"
                          min="0.5"
                          max="3"
                          step="0.5"
                          value={demoState[task.id]?.speed || 1}
                          onChange={(e) => setDemoSpeed(task.id, parseFloat(e.target.value))}
                          className="w-20"
                        />
                        <span className="text-sm text-gray-600">{demoState[task.id]?.speed || 1}x</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="demo-progress">
                          <div 
                            className="demo-progress-bar"
                            style={{ 
                              width: `${((demoState[task.id]?.currentStep || 0) / getDemoStepsForTask(task.id).length) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
                            <span className="text-blue-500 mt-1">💡</span>
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
