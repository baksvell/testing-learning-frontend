'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BookOpen, Eye, Trash2, Filter, Search } from 'lucide-react'
import Link from 'next/link'

interface Feedback {
  id: string
  type: string
  message: string
  email: string
  timestamp: string
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

  useEffect(() => {
    // Загружаем отзывы из localStorage
    const storedFeedbacks = localStorage.getItem('admin_feedbacks')
    if (storedFeedbacks) {
      const parsedFeedbacks = JSON.parse(storedFeedbacks)
      setFeedbacks(parsedFeedbacks)
      setFilteredFeedbacks(parsedFeedbacks)
    }
  }, [])

  useEffect(() => {
    // Фильтрация отзывов
    let filtered = feedbacks

    if (filter !== 'all') {
      filtered = filtered.filter(feedback => feedback.type === filter)
    }

    if (searchTerm) {
      filtered = filtered.filter(feedback => 
        feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredFeedbacks(filtered)
  }, [feedbacks, filter, searchTerm])

  const deleteFeedback = (id: string) => {
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id)
    setFeedbacks(updatedFeedbacks)
    localStorage.setItem('admin_feedbacks', JSON.stringify(updatedFeedbacks))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return '🐛'
      case 'suggestion': return '💡'
      case 'question': return '❓'
      case 'compliment': return '⭐'
      default: return '📝'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug': return 'bg-red-100 text-red-800'
      case 'suggestion': return 'bg-yellow-100 text-yellow-800'
      case 'question': return 'bg-blue-100 text-blue-800'
      case 'compliment': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'bug': return 'Баг'
      case 'suggestion': return 'Предложение'
      case 'question': return 'Вопрос'
      case 'compliment': return 'Благодарность'
      default: return 'Другое'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад в главное меню
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель: Отзывы</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900">{feedbacks.length}</div>
            <div className="text-sm text-gray-500">Всего отзывов</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-red-600">
              {feedbacks.filter(f => f.type === 'bug').length}
            </div>
            <div className="text-sm text-gray-500">Багов</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {feedbacks.filter(f => f.type === 'suggestion').length}
            </div>
            <div className="text-sm text-gray-500">Предложений</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {feedbacks.filter(f => f.type === 'compliment').length}
            </div>
            <div className="text-sm text-gray-500">Благодарностей</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Поиск по сообщению или email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Все типы</option>
                <option value="bug">🐛 Баги</option>
                <option value="suggestion">💡 Предложения</option>
                <option value="question">❓ Вопросы</option>
                <option value="compliment">⭐ Благодарности</option>
                <option value="other">📝 Другое</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Отзывы ({filteredFeedbacks.length})
            </h2>
          </div>
          
          {filteredFeedbacks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Отзывов пока нет</p>
              <p className="text-sm">Отзывы появятся здесь после отправки через форму</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{getTypeIcon(feedback.type)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                          {getTypeLabel(feedback.type)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(feedback.timestamp).toLocaleString('ru-RU')}
                        </span>
                      </div>
                      
                      <p className="text-gray-900 mb-2 line-clamp-2">
                        {feedback.message}
                      </p>
                      
                      {feedback.email && (
                        <p className="text-sm text-gray-600">
                          Email: {feedback.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setSelectedFeedback(feedback)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Просмотреть полностью"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteFeedback(feedback.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for full feedback */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {getTypeIcon(selectedFeedback.type)} {getTypeLabel(selectedFeedback.type)}
                </h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Время отправки
                </label>
                <p className="text-gray-900">
                  {new Date(selectedFeedback.timestamp).toLocaleString('ru-RU')}
                </p>
              </div>
              
              {selectedFeedback.email && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedFeedback.email}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}






