'use client'

import { useState } from 'react'
import { ArrowLeft, BookOpen, Send, CheckCircle, AlertCircle, Lightbulb, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: 'suggestion',
    message: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ type: 'suggestion', message: '', email: '' })
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Произошла ошибка при отправке. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
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
                <h1 className="text-2xl font-bold text-gray-900">Книга отзывов</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Спасибо за ваш отзыв!</h2>
            <p className="text-green-700 mb-6">
              Ваше сообщение успешно отправлено. Мы обязательно рассмотрим его и при необходимости свяжемся с вами.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Вернуться на главную
              </Link>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
              >
                Отправить еще один отзыв
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
              <h1 className="text-2xl font-bold text-gray-900">Книга отзывов и предложений</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center mb-6">
            <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Поделитесь своим мнением</h2>
            <p className="text-gray-600">
              Ваши отзывы помогают нам улучшать платформу и создавать более качественные уроки для тестировщиков.
            </p>
          </div>

          {/* Feedback Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold text-red-800 mb-1">Найден баг</h3>
              <p className="text-sm text-red-600">Сообщите о проблемах на сайте</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-yellow-800 mb-1">Предложение</h3>
              <p className="text-sm text-yellow-600">Идеи по улучшению уроков</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800 mb-1">Вопрос</h3>
              <p className="text-sm text-blue-600">Задайте вопрос по урокам</p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Тип сообщения
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="bug">🐛 Найден баг</option>
                <option value="suggestion">💡 Предложение по улучшению</option>
                <option value="question">❓ Вопрос по урокам</option>
                <option value="compliment">⭐ Благодарность</option>
                <option value="other">📝 Другое</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Ваше сообщение *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Опишите проблему, предложение или задайте вопрос..."
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (необязательно)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
              <p className="text-sm text-gray-500 mt-1">
                Укажите email, если хотите получить ответ на ваше сообщение
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !formData.message.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Отправить отзыв
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Все отзывы рассматриваются в течение 1-2 рабочих дней. 
            Мы ценим ваше время и мнение!
          </p>
        </div>
      </div>
    </div>
  )
}
