'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  Trophy,
  Lightbulb,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast'

interface Task {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  points: number
  test_data: any
  hints: string[]
  is_active: boolean
  created_at: string
}

interface TestResult {
  score: number
  max_score: number
  passed: boolean
  feedback: string
  experience_gained: number
}

export default function TaskPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated, updateUser } = useAuth()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [userAnswer, setUserAnswer] = useState<any>({})
  const [showHints, setShowHints] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchTask(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [startTime])

  const fetchTask = async (taskId: string) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setTask(data)
        setStartTime(Date.now())
      } else {
        toast.error('Задание не найдено')
        router.push('/tasks')
      }
    } catch (error) {
      console.error('Error fetching task:', error)
      toast.error('Ошибка загрузки задания')
    } finally {
      setLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!isAuthenticated) {
      toast.error('Необходимо войти в систему')
      return
    }

    setSubmitting(true)
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task?.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answer: userAnswer,
          time_spent: timeSpent
        })
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
        
        if (data.passed) {
          toast.success(`Задание выполнено! Получено ${data.experience_gained} опыта`)
          updateUser({
            experience: (user?.experience || 0) + data.experience_gained,
            total_score: (user?.total_score || 0) + data.score
          })
        } else {
          toast.error('Задание не выполнено. Попробуйте еще раз!')
        }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Ошибка отправки ответа')
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      toast.error('Ошибка соединения')
    } finally {
      setSubmitting(false)
    }
  }

  const resetTask = () => {
    setResult(null)
    setUserAnswer({})
    setShowHints(false)
    setStartTime(Date.now())
    setTimeSpent(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success-100 text-success-800'
      case 'medium': return 'bg-warning-100 text-warning-800'
      case 'hard': return 'bg-danger-100 text-danger-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Задание не найдено</h2>
          <Link href="/tasks" className="btn btn-primary">
            Вернуться к заданиям
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/tasks" className="btn btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`badge ${getDifficultyColor(task.difficulty)}`}>
                    {task.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>{task.points} очков</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(timeSpent)}</span>
                  </div>
                </div>
              </div>
            </div>
            {result && (
              <button onClick={resetTask} className="btn btn-secondary">
                <RotateCcw className="w-4 h-4 mr-2" />
                Заново
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Описание задания
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {task.description}
                </p>
              </div>
            </motion.div>

            {/* Test Data */}
            {task.test_data && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6 mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Тестовые данные
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(task.test_data, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}

            {/* Answer Form */}
            {!result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ваш ответ
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Опишите найденные проблемы или результаты тестирования:
                    </label>
                    <textarea
                      value={userAnswer.description || ''}
                      onChange={(e) => setUserAnswer({
                        ...userAnswer,
                        description: e.target.value
                      })}
                      rows={6}
                      className="input"
                      placeholder="Введите ваш ответ..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Список найденных багов (если есть):
                    </label>
                    <textarea
                      value={userAnswer.bugs || ''}
                      onChange={(e) => setUserAnswer({
                        ...userAnswer,
                        bugs: e.target.value
                      })}
                      rows={4}
                      className="input"
                      placeholder="Опишите найденные баги..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Рекомендации по улучшению:
                    </label>
                    <textarea
                      value={userAnswer.recommendations || ''}
                      onChange={(e) => setUserAnswer({
                        ...userAnswer,
                        recommendations: e.target.value
                      })}
                      rows={4}
                      className="input"
                      placeholder="Ваши рекомендации..."
                    />
                  </div>

                  <button
                    onClick={submitAnswer}
                    disabled={submitting || !userAnswer.description}
                    className="btn btn-primary w-full"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Отправка...
                      </div>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Отправить ответ
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-6"
              >
                <div className="text-center mb-6">
                  {result.passed ? (
                    <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-danger-600 mx-auto mb-4" />
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${
                    result.passed ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {result.passed ? 'Задание выполнено!' : 'Задание не выполнено'}
                  </h3>
                  <p className="text-gray-600">
                    {result.feedback}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {result.score} / {result.max_score}
                    </div>
                    <div className="text-sm text-gray-600">Очки</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-600">
                      +{result.experience_gained}
                    </div>
                    <div className="text-sm text-gray-600">Опыт</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link href="/tasks" className="btn btn-primary flex-1">
                    К заданиям
                  </Link>
                  <button onClick={resetTask} className="btn btn-secondary">
                    Попробовать снова
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Hints */}
            {task.hints && task.hints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-warning-600" />
                    Подсказки
                  </h3>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="btn btn-secondary text-sm"
                  >
                    {showHints ? 'Скрыть' : 'Показать'}
                  </button>
                </div>
                
                {showHints && (
                  <div className="space-y-3">
                    {task.hints.map((hint, index) => (
                      <div key={index} className="bg-warning-50 border border-warning-200 rounded-lg p-3">
                        <p className="text-sm text-warning-800">
                          {hint}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Прогресс
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Время выполнения</span>
                    <span>{formatTime(timeSpent)}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill bg-primary-600" 
                      style={{ width: `${Math.min((timeSpent / 1800) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Заполненность ответа</span>
                    <span>{Object.keys(userAnswer).length > 0 ? '50%' : '0%'}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill bg-success-600" 
                      style={{ width: `${Object.keys(userAnswer).length > 0 ? 50 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
