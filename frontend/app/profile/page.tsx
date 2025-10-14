'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Target, 
  Settings, 
  LogOut,
  Edit3,
  Save,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, logout, updateUser, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    
    setEditData({
      username: user.username,
      email: user.email
    })
  }, [user, router])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!editData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно'
    } else if (editData.username.length < 3) {
      newErrors.username = 'Имя пользователя должно содержать минимум 3 символа'
    } else if (editData.username.length > 20) {
      newErrors.username = 'Имя пользователя не должно превышать 20 символов'
    } else if (!/^[a-zA-Z0-9_]+$/.test(editData.username)) {
      newErrors.username = 'Имя пользователя может содержать только буквы, цифры и подчеркивания'
    }
    
    if (!editData.email.trim()) {
      newErrors.email = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      newErrors.email = 'Введите корректный email адрес'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const success = await updateProfile(editData)
      if (success) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      username: user?.username || '',
      email: user?.email || ''
    })
    setErrors({})
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData({
      ...editData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gradient">Профиль</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="btn btn-secondary">
                Панель управления
              </Link>
              <button
                onClick={logout}
                className="btn btn-outline flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Информация о профиле</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Редактировать
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading || Object.keys(errors).length > 0}
                      className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      Сохранить
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Отмена
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя пользователя
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        name="username"
                        type="text"
                        value={editData.username}
                        onChange={handleChange}
                        className={`input ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Введите имя пользователя"
                      />
                      {errors.username && (
                        <p className="mt-1 text-xs text-red-600">{errors.username}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-lg text-gray-900">{user.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleChange}
                        className={`input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Введите email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-lg text-gray-900">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата регистрации
                  </label>
                  <p className="text-lg text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Уровень</p>
                      <p className="text-lg font-semibold text-gray-900">{user.level}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Опыт</p>
                      <p className="text-lg font-semibold text-gray-900">{user.experience}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Общий счет</p>
                      <p className="text-lg font-semibold text-gray-900">{user.total_score}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
              <div className="space-y-3">
                <Link href="/devtools" className="btn btn-outline w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  DevTools уроки
                </Link>
                <Link href="/postman-lessons" className="btn btn-outline w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Postman уроки
                </Link>
                <Link href="/tasks" className="btn btn-outline w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Задания
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
