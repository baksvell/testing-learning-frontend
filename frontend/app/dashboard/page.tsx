'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Trophy, 
  Target, 
  Star, 
  TrendingUp,
  Calendar,
  Award,
  Zap,
  BarChart3,
  Clock,
  Code,
  Globe,
  Play,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'

interface UserStats {
  user: {
    id: number
    username: string
    email: string
    level: number
    experience: number
    total_score: number
    created_at: string
  }
  tasks: {
    total: number
    completed: number
    completion_rate: number
  }
  achievements: {
    total: number
    earned: number
    earned_rate: number
  }
}

interface RecentActivity {
  id: number
  task_id: number
  score: number
  max_score: number
  passed: boolean
  completed_at: string
  task_title?: string
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData()
    }
  }, [isAuthenticated])

  const fetchDashboardData = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]

      const [statsResponse, activityResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/activity`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (activityResponse.ok) {
        const activityData = await activityResponse.json()
        setRecentActivity(activityData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelProgress = () => {
    if (!user) return 0
    const currentLevelExp = (user.level - 1) * 100
    const nextLevelExp = user.level * 100
    const progress = ((user.experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100
    return Math.max(0, Math.min(100, progress))
  }

  const getDevToolsProgress = () => {
    // Симулируем прогресс по DevTools (можно заменить на реальные данные)
    return Math.floor(Math.random() * 40) + 20 // 20-60%
  }

  const getPostmanProgress = () => {
    // Симулируем прогресс по Postman (можно заменить на реальные данные)
    return Math.floor(Math.random() * 30) + 10 // 10-40%
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Доступ запрещен</h2>
          <Link href="/login" className="btn btn-primary">
            Войти в систему
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
              <p className="text-gray-600">Добро пожаловать, {user.username}!</p>
            </div>
            <Link href="/" className="btn btn-secondary">
              На главную
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Уровень</p>
                <p className="text-2xl font-bold text-gray-900">{user.level}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getLevelProgress()}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {user.experience} / {user.level * 100} опыта
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Общий счет</p>
                <p className="text-2xl font-bold text-gray-900">{user.total_score}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-success-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                За все время
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Заданий выполнено</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.tasks.completed || 0} / {stats?.tasks.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-warning-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="progress-bar">
                <div 
                  className="progress-fill bg-warning-600" 
                  style={{ width: `${stats?.tasks.completion_rate || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {stats?.tasks.completion_rate.toFixed(1) || 0}% выполнено
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Достижения</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.achievements.earned || 0} / {stats?.achievements.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="progress-bar">
                <div 
                  className="progress-fill bg-purple-600" 
                  style={{ width: `${stats?.achievements.earned_rate || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {stats?.achievements.earned_rate.toFixed(1) || 0}% получено
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Быстрые действия
              </h3>
              <div className="space-y-3">
                <Link href="/devtools" className="btn btn-primary w-full">
                  <Code className="w-4 h-4 mr-2" />
                  DevTools уроки
                </Link>
                <Link href="/postman-lessons" className="btn btn-primary w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Postman уроки
                </Link>
                <Link href="/postman-demo" className="btn btn-secondary w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Демо Postman
                </Link>
                <Link href="/profile" className="btn btn-secondary w-full">
                  <User className="w-4 h-4 mr-2" />
                  Профиль
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Последняя активность
              </h3>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.passed ? 'bg-success-100' : 'bg-danger-100'
                        }`}>
                          {activity.passed ? (
                            <Zap className="w-4 h-4 text-success-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-danger-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {activity.task_title || `Задание #${activity.task_id}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(activity.completed_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          activity.passed ? 'text-success-600' : 'text-danger-600'
                        }`}>
                          {activity.score} / {activity.max_score}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.passed ? 'Выполнено' : 'Не выполнено'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Пока нет активности</p>
                  <div className="flex gap-2 mt-4">
                    <Link href="/devtools" className="btn btn-primary">
                      <Code className="w-4 h-4 mr-2" />
                      DevTools
                    </Link>
                    <Link href="/postman-lessons" className="btn btn-secondary">
                      <Globe className="w-4 h-4 mr-2" />
                      Postman
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Progress Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Прогресс по категориям
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  name: 'DevTools', 
                  progress: getDevToolsProgress(), 
                  color: 'bg-indigo-600',
                  icon: <Code className="w-6 h-6" />,
                  description: 'Инструменты разработчика',
                  lessons: 6
                },
                { 
                  name: 'Postman', 
                  progress: getPostmanProgress(), 
                  color: 'bg-blue-600',
                  icon: <Globe className="w-6 h-6" />,
                  description: 'Тестирование API',
                  lessons: 5
                }
              ].map((category, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{category.progress}%</div>
                      <div className="text-sm text-gray-600">{category.lessons} уроков</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Прогресс</span>
                      <span>{category.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link 
                    href={category.name === 'DevTools' ? '/devtools' : '/postman-lessons'}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Продолжить обучение
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
