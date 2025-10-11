'use client'

import { useState } from 'react'
import { ArrowLeft, File, Clock, BookOpen, Code, Globe, Bug } from 'lucide-react'
import Link from 'next/link'

export default function OpenAPIPage() {
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
              <File className="w-8 h-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-gray-900">OpenAPI & Swagger</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white text-center mb-12">
          <div className="flex justify-center mb-4">
            <Clock className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Уроки скоро будут готовы!</h2>
          <p className="text-xl text-emerald-100 mb-6">
            Мы работаем над созданием интерактивных уроков по OpenAPI и Swagger
          </p>
          <div className="bg-white/20 rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">Ожидайте в ближайшее время</p>
          </div>
        </div>

        {/* What to Expect */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <File className="w-8 h-8 text-emerald-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">OpenAPI спецификации</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Создание и редактирование OpenAPI схем
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Валидация API документации
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Генерация клиентского кода
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Автоматическое тестирование API
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Интеграция с CI/CD
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Swagger инструменты</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Swagger UI для документации
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Swagger Editor для редактирования
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Swagger Codegen для генерации
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Тестирование через Swagger UI
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Мониторинг и аналитика API
              </li>
            </ul>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Прогресс разработки</h3>
            <span className="text-sm text-gray-500">В разработке</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-gray-600">
            Мы активно работаем над созданием качественных уроков по OpenAPI и Swagger. 
            Следите за обновлениями!
          </p>
        </div>

        {/* Alternative Learning */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Пока изучайте другие темы</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/devtools" className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors">
              <Code className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">DevTools</p>
            </Link>
            <Link href="/api" className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">API</p>
            </Link>
            <Link href="/postman-lessons" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
              <File className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Postman</p>
            </Link>
            <Link href="/functional" className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 transition-colors">
              <Bug className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Функциональное</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


