'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  Clock, 
  Star, 
  Filter,
  Search,
  Trophy,
  Zap,
  Shield,
  Code,
  Bug
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'

interface Task {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  points: number
  hints: string[]
  is_active: boolean
  created_at: string
}

interface UserStats {
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

export default function TasksPage() {
  const { user, isAuthenticated } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const categories = [
    { value: 'all', label: 'Все категории', icon: <Target /> },
    { value: 'functional', label: 'Функциональное', icon: <Bug /> },
    { value: 'ui', label: 'UI/UX', icon: <Zap /> },
    { value: 'api', label: 'API', icon: <Code /> },
    { value: 'security', label: 'Безопасность', icon: <Shield /> }
  ]

  const difficulties = [
    { value: 'all', label: 'Все уровни' },
    { value: 'easy', label: 'Легкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'hard', label: 'Сложный' }
  ]

  useEffect(() => {
    fetchTasks()
    if (isAuthenticated) {
      fetchStats()
    }
  }, [isAuthenticated])

  useEffect(() => {
    filterTasks()
  }, [tasks, searchTerm, selectedCategory, selectedDifficulty])

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const filterTasks = () => {
    let filtered = tasks

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(task => task.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(task => task.difficulty === selectedDifficulty)
    }

    setFilteredTasks(filtered)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success-100 text-success-800'
      case 'medium': return 'bg-warning-100 text-warning-800'
      case 'hard': return 'bg-danger-100 text-danger-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'functional': return <Bug className="w-4 h-4" />
      case 'ui': return <Zap className="w-4 h-4" />
      case 'api': return <Code className="w-4 h-4" />
      case 'security': return <Shield className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gradient">Задания</span>
            </div>
            <Link href="/" className="btn btn-secondary">
              На главную
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        {isAuthenticated && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Выполнено заданий</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.tasks.completed} / {stats.tasks.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${stats.tasks.completion_rate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {stats.tasks.completion_rate.toFixed(1)}% выполнено
                </p>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Достижения</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.achievements.earned} / {stats.achievements.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-warning-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="progress-bar">
                  <div 
                    className="progress-fill bg-warning-600" 
                    style={{ width: `${stats.achievements.earned_rate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {stats.achievements.earned_rate.toFixed(1)}% получено
                </p>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Уровень</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user?.level || 1}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-success-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {user?.experience || 0} опыта
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск заданий..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="lg:w-48">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="input"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tasks Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(task.category)}
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {task.category}
                  </span>
                </div>
                <span className={`badge ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {task.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {task.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{task.points} очков</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>~30 мин</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={`/tasks/${task.id}`}
                  className="btn btn-primary flex-1"
                >
                  Начать
                </Link>
                {task.hints && task.hints.length > 0 && (
                  <button className="btn btn-secondary">
                    <Filter className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Задания не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
