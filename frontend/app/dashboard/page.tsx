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
  Clock
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
                <Link href="/tasks" className="btn btn-primary w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Продолжить обучение
                </Link>
                <Link href="/achievements" className="btn btn-secondary w-full">
                  <Award className="w-4 h-4 mr-2" />
                  Мои достижения
                </Link>
                <Link href="/leaderboard" className="btn btn-secondary w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Рейтинг
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
                  <Link href="/tasks" className="btn btn-primary mt-4">
                    Начать обучение
                  </Link>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Функциональное', progress: 75, color: 'bg-primary-600' },
                { name: 'UI/UX', progress: 60, color: 'bg-success-600' },
                { name: 'API', progress: 45, color: 'bg-warning-600' },
                { name: 'Безопасность', progress: 30, color: 'bg-danger-600' }
              ].map((category, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${category.progress}, 100`}
                        className={category.color}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {category.progress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
