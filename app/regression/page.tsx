'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import PostmanTester from '../components/PostmanTester';
import { 
  Zap, Send, Folder, Settings, History, CheckCircle, 
  AlertTriangle, Clock, Download, Copy, Save, Play, ChevronRight,
  BookOpen, Target, Trophy, Users, Code, Shield, Globe, Database,
  RefreshCw, Bot, GitBranch, Monitor, Database as DbIcon
} from 'lucide-react';

interface RegressionTask {
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

interface RegressionLesson {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tasks: RegressionTask[];
}

export default function RegressionLessonsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  // Load completed tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('regression-lessons-completed');
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, []);

  // Save completed tasks to localStorage
  const saveCompletedTasks = (tasks: Record<number, boolean>) => {
    setCompletedTasks(tasks);
    localStorage.setItem('regression-lessons-completed', JSON.stringify(tasks));
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

  const currentLesson: RegressionLesson = {
    id: 'regression',
    title: 'Регрессионное тестирование',
    description: 'Изучите автоматизированное тестирование изменений и обеспечение качества при обновлениях',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-purple-500',
    tasks: [
      {
        id: 1,
        title: "Основы регрессионного тестирования",
        description: "Поймите что такое регрессионное тестирование и когда его применять",
        category: "Basics",
        completed: completedTasks[1] || false,
        challenge: "Используйте встроенный API тестер: протестируйте API до и после изменений, чтобы понять концепцию регрессии.",
        beforeImage: "/screenshots/regression/basics-before.svg",
        afterImage: "/screenshots/regression/basics-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Выполните базовые тесты:",
            "  • GET /api/tasks - проверьте список задач",
            "  • POST /api/tasks - создайте новую задачу",
            "  • GET /api/tasks/1 - получите конкретную задачу",
            "3. Зафиксируйте результаты:",
            "  • Запомните статус коды",
            "  • Запомните структуру ответов",
            "  • Запомните время выполнения",
            "4. Поймите концепцию регрессии:",
            "  • Регрессия = ухудшение функциональности",
            "  • Регрессионное тестирование = проверка, что ничего не сломалось",
            "  • Применяется после изменений в коде"
          ],
          tips: [
            "Регрессионное тестирование проверяет, что новые изменения не сломали существующую функциональность",
            "Выполняется после каждого обновления или изменения в системе",
            "Может быть ручным или автоматизированным",
            "Критически важно для поддержания качества продукта"
          ]
        }
      },
      {
        id: 2,
        title: "Автоматизация регрессионных тестов",
        description: "Научитесь создавать и запускать автоматические регрессионные тесты",
        category: "Automation",
        completed: completedTasks[2] || false,
        challenge: "Используйте встроенный API тестер: создайте набор тестов, которые можно запускать многократно для проверки API.",
        beforeImage: "/screenshots/regression/automation-before.svg",
        afterImage: "/screenshots/regression/automation-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Создайте набор регрессионных тестов:",
            "  • Тест 1: GET /api/tasks (проверка статуса 200)",
            "  • Тест 2: POST /api/tasks (проверка статуса 201)",
            "  • Тест 3: GET /api/tasks/1 (проверка статуса 200)",
            "3. Добавьте проверки в тесты:",
            "  • Проверка статус кодов",
            "  • Проверка структуры ответов",
            "  • Проверка времени выполнения",
            "4. Сохраните тесты в коллекцию:",
            "  • Создайте коллекцию 'Regression Tests'",
            "  • Сохраните все тесты в коллекцию",
            "5. Запустите тесты несколько раз:",
            "  • Убедитесь в стабильности результатов",
            "  • Проверьте воспроизводимость"
          ],
          tips: [
            "Автоматизация позволяет запускать тесты быстро и часто",
            "Регрессионные тесты должны быть стабильными и воспроизводимыми",
            "Используйте коллекции для группировки связанных тестов",
            "Документируйте тесты для понимания их назначения"
          ]
        }
      },
      {
        id: 3,
        title: "API регрессионное тестирование",
        description: "Специализированные техники тестирования API на регрессию",
        category: "API",
        completed: completedTasks[3] || false,
        challenge: "Используйте встроенный API тестер: протестируйте API на совместимость, производительность и стабильность.",
        beforeImage: "/screenshots/regression/api-before.svg",
        afterImage: "/screenshots/regression/api-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Протестируйте совместимость API:",
            "  • Проверьте все эндпоинты",
            "  • Убедитесь в корректности схем данных",
            "  • Проверьте обработку ошибок",
            "3. Протестируйте производительность:",
            "  • Измерьте время ответа",
            "  • Проверьте стабильность времени",
            "  • Сравните с предыдущими версиями",
            "4. Протестируйте стабильность:",
            "  • Запустите тесты несколько раз",
            "  • Проверьте консистентность результатов",
            "  • Убедитесь в отсутствии флакинесса",
            "5. Документируйте результаты:",
            "  • Зафиксируйте базовые метрики",
            "  • Создайте отчет о тестировании"
          ],
          tips: [
            "API регрессионное тестирование фокусируется на интерфейсах",
            "Проверяйте не только функциональность, но и производительность",
            "Следите за изменениями в схеме данных",
            "Тестируйте обратную совместимость при обновлениях"
          ]
        }
      },
      {
        id: 4,
        title: "UI регрессионное тестирование",
        description: "Тестирование пользовательского интерфейса на регрессию",
        category: "UI",
        completed: completedTasks[4] || false,
        challenge: "Изучите веб-страницу нашего приложения: проверьте визуальные элементы, функциональность и отзывчивость.",
        beforeImage: "/screenshots/regression/ui-before.svg",
        afterImage: "/screenshots/regression/ui-after.svg",
        solution: {
          steps: [
            "1. Откройте главную страницу приложения",
            "2. Проверьте визуальные элементы:",
            "  • Заголовки и текст отображаются корректно",
            "  • Кнопки и ссылки работают",
            "  • Цвета и шрифты соответствуют дизайну",
            "3. Проверьте функциональность:",
            "  • Навигация между страницами",
            "  • Формы работают корректно",
            "  • Интерактивные элементы реагируют",
            "4. Проверьте отзывчивость:",
            "  • Измените размер окна браузера",
            "  • Проверьте на мобильном устройстве",
            "  • Убедитесь в адаптивности",
            "5. Зафиксируйте результаты:",
            "  • Сделайте скриншоты проблемных мест",
            "  • Задокументируйте найденные дефекты",
            "  • Сравните с предыдущими версиями"
          ],
          tips: [
            "UI регрессионное тестирование проверяет визуальные изменения",
            "Используйте скриншоты для сравнения версий",
            "Тестируйте на разных устройствах и разрешениях",
            "Проверяйте как функциональность, так и внешний вид"
          ]
        }
      },
      {
        id: 5,
        title: "CI/CD и непрерывное тестирование",
        description: "Интеграция регрессионных тестов в процесс разработки",
        category: "CI/CD",
        completed: completedTasks[5] || false,
        challenge: "Используйте встроенный API тестер: создайте набор тестов, которые можно интегрировать в CI/CD пайплайн.",
        beforeImage: "/screenshots/regression/cicd-before.svg",
        afterImage: "/screenshots/regression/cicd-after.svg",
        solution: {
          steps: [
            "1. Используйте встроенный API тестер выше",
            "2. Создайте критичные тесты:",
            "  • Тесты основных функций",
            "  • Тесты критичных путей",
            "  • Тесты интеграции",
            "3. Оптимизируйте тесты для CI/CD:",
            "  • Быстрые и стабильные тесты",
            "  • Независимые друг от друга",
            "  • Четкие критерии прохождения",
            "4. Создайте smoke-тесты:",
            "  • Базовые проверки работоспособности",
            "  • Быстрые тесты для быстрой обратной связи",
            "  • Критичные функции приложения",
            "5. Планируйте интеграцию:",
            "  • Определите момент запуска тестов",
            "  • Настройте уведомления о результатах",
            "  • Создайте отчеты о тестировании"
          ],
          tips: [
            "CI/CD интеграция позволяет запускать тесты автоматически",
            "Smoke-тесты должны быть быстрыми и надежными",
            "Настройте уведомления о падении тестов",
            "Документируйте процесс для команды разработки"
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
                <Zap className="w-6 h-6 text-purple-600" />
                Регрессионное тестирование
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/postman" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                <Send className="w-4 h-4" />
                Открыть Postman
              </Link>
              {user ? (
                <span className="text-sm text-gray-600">Привет, {user.username}!</span>
              ) : (
                <Link href="/login" className="text-sm text-purple-600 hover:text-purple-700">
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
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
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
                    ? 'border-purple-500 text-purple-600'
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
                    ? 'border-purple-500 text-purple-600'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое регрессионное тестирование?</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Регрессионное тестирование — это тип тестирования, направленный на проверку того, 
                  что новые изменения в коде не нарушили существующую функциональность. 
                  Оно выполняется после каждого обновления или изменения в системе.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Основные принципы:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li><strong>Предотвращение регрессии:</strong> Выявление ухудшения функциональности</li>
                  <li><strong>Стабильность системы:</strong> Обеспечение работоспособности после изменений</li>
                  <li><strong>Автоматизация:</strong> Выполнение тестов без участия человека</li>
                  <li><strong>Непрерывность:</strong> Регулярное выполнение в процессе разработки</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Типы регрессионного тестирования:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">По объему:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Полное регрессионное тестирование</li>
                      <li>• Частичное регрессионное тестирование</li>
                      <li>• Селективное регрессионное тестирование</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">По области:</h4>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Функциональное регрессионное</li>
                      <li>• UI регрессионное</li>
                      <li>• API регрессионное</li>
                      <li>• Производительности</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Стратегии регрессионного тестирования</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Автоматизация:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Smoke тесты:</strong> Быстрые проверки основной функциональности</li>
                    <li><strong>Sanity тесты:</strong> Проверка конкретных изменений</li>
                    <li><strong>Полные регрессионные:</strong> Комплексная проверка системы</li>
                    <li><strong>CI/CD интеграция:</strong> Автоматический запуск при изменениях</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Инструменты:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Postman/Newman:</strong> API тестирование</li>
                    <li><strong>Selenium:</strong> UI автоматизация</li>
                    <li><strong>Jest/Cypress:</strong> Frontend тестирование</li>
                    <li><strong>Jenkins/GitHub Actions:</strong> CI/CD пайплайны</li>
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
                Используйте встроенный API тестер для выполнения практических заданий по регрессионному тестированию. 
                Создавайте автоматизированные тесты и проверяйте стабильность API!
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
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-purple-900 mb-2">🎯 Задание:</h4>
                      <p className="text-purple-800">{task.challenge}</p>
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
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
