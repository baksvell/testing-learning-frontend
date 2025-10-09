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
          description: "Научитесь инспектировать и редактировать HTML/CSS",
          category: "Elements",
          completed: false,
          instructions: [
            "Откройте DevTools (F12 или Ctrl+Shift+I)",
            "Перейдите на вкладку Elements",
            "Найдите элемент с классом 'devtools-demo' на этой странице",
            "Измените цвет текста этого элемента на красный",
            "Добавьте border: 2px solid blue к элементу"
          ],
          hints: [
            "Используйте Ctrl+F для поиска элементов",
            "Кликните правой кнопкой на элемент и выберите 'Inspect'",
            "В панели Styles найдите свойство color"
          ]
        },
        {
          id: 2,
          title: "Анализ вкладки Console",
          description: "Изучите консоль для отладки и тестирования",
          category: "Console",
          completed: false,
          instructions: [
            "Откройте вкладку Console в DevTools",
            "Выполните команду: console.log('Привет, DevTools!')",
            "Выполните команду: document.querySelector('.devtools-demo')",
            "Проверьте, что в консоли отображаются результаты"
          ],
          hints: [
            "Консоль позволяет выполнять JavaScript код",
            "Используйте Tab для автодополнения команд",
            "Стрелка вверх показывает предыдущие команды"
          ]
        },
        {
          id: 3,
          title: "Мониторинг Network",
          description: "Изучите сетевые запросы и производительность",
          category: "Network",
          completed: false,
          instructions: [
            "Откройте вкладку Network в DevTools",
            "Обновите страницу (F5)",
            "Найдите запрос к API (обычно к /api/tasks)",
            "Кликните на запрос и изучите его детали",
            "Проверьте время загрузки и размер ответа"
          ],
          hints: [
            "Network показывает все HTTP запросы",
            "Кликните на запрос для детальной информации",
            "Используйте фильтры для поиска конкретных запросов"
          ]
        },
        {
          id: 4,
          title: "Отладка в Sources",
          description: "Научитесь использовать отладчик JavaScript",
          category: "Sources",
          completed: false,
          instructions: [
            "Откройте вкладку Sources в DevTools",
            "Найдите файл page.tsx в папке devtools",
            "Поставьте breakpoint на строке с useState",
            "Обновите страницу и посмотрите, как работает отладчик",
            "Используйте кнопки Step Over, Step Into для навигации"
          ],
          hints: [
            "Breakpoints останавливают выполнение кода",
            "Используйте F10 для Step Over, F11 для Step Into",
            "В панели Scope можно видеть значения переменных"
          ]
        },
        {
          id: 5,
          title: "Анализ Performance",
          description: "Изучите производительность веб-приложения",
          category: "Performance",
          completed: false,
          instructions: [
            "Откройте вкладку Performance в DevTools",
            "Нажмите кнопку Record (круглая кнопка)",
            "Выполните несколько действий на странице",
            "Остановите запись и изучите результаты",
            "Найдите узкие места в производительности"
          ],
          hints: [
            "Performance помогает найти медленные операции",
            "Красные полосы указывают на проблемы",
            "Изучите Call Tree для детального анализа"
          ]
        },
        {
          id: 6,
          title: "Мобильная эмуляция",
          description: "Научитесь тестировать адаптивный дизайн",
          category: "Device",
          completed: false,
          instructions: [
            "Нажмите Ctrl+Shift+M для мобильной эмуляции",
            "Выберите устройство iPhone 12",
            "Проверьте, как выглядит сайт на мобильном",
            "Попробуйте разные ориентации экрана",
            "Используйте Throttling для эмуляции медленного интернета"
          ],
          hints: [
            "Мобильная эмуляция помогает тестировать адаптивность",
            "Throttling эмулирует медленные сети",
            "Проверяйте touch события и жесты"
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
