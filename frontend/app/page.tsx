'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bug, 
  Target, 
  Trophy, 
  Users, 
  BookOpen, 
  Zap,
  Shield,
  Code,
  Play,
  Star,
  Globe,
  File,
  Database
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalAchievements: 0,
    completionRate: 0
  })

  useEffect(() => {
    // Загружаем статистику
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error)
  }, [])

  const futureFeatures = [
    {
      icon: <File className="w-8 h-8" />,
      title: "Swagger/OpenAPI",
      description: "Изучение документации API, тестирование с помощью Swagger UI, валидация схем",
      color: "text-blue-600"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "SQL Тренировка",
      description: "Практика SQL запросов, тестирование баз данных, работа с данными и миграциями",
      color: "text-green-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "REST API Тестирование",
      description: "Углубленное изучение REST API, тестирование различных HTTP методов и статус-кодов",
      color: "text-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "API Безопасность",
      description: "Тестирование безопасности API, аутентификация, авторизация, защита от атак",
      color: "text-orange-600"
    }
  ]

      // Categories for testing tools - focused on essential tools
      const categories = [
        { name: "DevTools", icon: <Code />, count: 6, color: "bg-indigo-500", href: "/devtools" },
        { name: "Postman", icon: <Globe />, count: 5, color: "bg-blue-500", href: "/postman-lessons" }
      ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Bug className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gradient">TestMaster</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/devtools" className="text-gray-600 hover:text-primary-600 transition-colors">
                DevTools
              </Link>
              <Link href="/postman-lessons" className="text-gray-600 hover:text-primary-600 transition-colors">
                Postman
              </Link>
              <Link href="/tasks" className="text-gray-600 hover:text-primary-600 transition-colors">
                Задания
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                Панель
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Привет, {user?.username}!
                  </span>
                  <Link href="/profile" className="btn btn-secondary">
                    Профиль
                  </Link>
                  <Link href="/dashboard" className="btn btn-primary">
                    Панель управления
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="btn btn-secondary">
                    Войти
                  </Link>
                  <Link href="/register" className="btn btn-primary">
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Изучайте инструменты
              <span className="text-gradient block">тестирования</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Практическая платформа для изучения профессиональных инструментов тестирования. 
              DevTools, Postman и другие инструменты с реальными примерами.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/devtools" className="btn btn-primary text-lg px-8 py-3">
                <Code className="w-5 h-5 mr-2" />
                DevTools
              </Link>
              <Link href="/postman-lessons" className="btn btn-secondary text-lg px-8 py-3">
                <Globe className="w-5 h-5 mr-2" />
                Postman
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Пользователей", value: stats.totalUsers, icon: <Users /> },
              { label: "Заданий", value: stats.totalTasks, icon: <Target /> },
              { label: "Достижений", value: stats.totalAchievements, icon: <Trophy /> },
              { label: "Успешность", value: `${stats.completionRate}%`, icon: <Star /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Планируемые инструменты
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              В разработке: Swagger/OpenAPI, SQL тренировка и другие профессиональные инструменты
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 ${feature.color} rounded-lg mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Инструменты тестирования
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Изучайте профессиональные инструменты для тестирования веб-приложений
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${category.color} text-white rounded-lg mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.count} {category.name === 'DevTools' ? 'уроков' : 'заданий'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {category.name === 'DevTools' && 'Изучение инструментов разработчика браузера: Console, Elements, Network, Sources и другие'}
                  {category.name === 'Postman' && 'Профессиональное тестирование API: коллекции, переменные, тесты и автоматизация'}
                </p>
                <Link 
                  href={category.href || `/tasks?category=${category.name.toLowerCase()}`}
                  className="btn w-full btn-primary"
                >
                  {category.name === 'DevTools' ? 'Изучить' : 'Начать'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Готовы изучить инструменты?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Начните с DevTools или Postman - профессиональные инструменты для тестирования веб-приложений
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/devtools" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                <Code className="w-5 h-5 mr-2" />
                DevTools
              </Link>
              <Link href="/postman-lessons" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                <Globe className="w-5 h-5 mr-2" />
                Postman
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bug className="w-6 h-6 text-primary-400" />
                <span className="text-xl font-bold">TestMaster</span>
              </div>
              <p className="text-gray-400">
                Платформа для изучения профессиональных инструментов тестирования
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Инструменты</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/devtools" className="hover:text-white transition-colors">DevTools</Link></li>
                <li><Link href="/postman-lessons" className="hover:text-white transition-colors">Postman</Link></li>
                <li><Link href="/tasks" className="hover:text-white transition-colors">Задания</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Панель управления</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">В разработке</h3>
              <ul className="space-y-2 text-gray-400">
                <li><span className="text-gray-500">Swagger/OpenAPI</span></li>
                <li><span className="text-gray-500">SQL Тренировка</span></li>
                <li><span className="text-gray-500">REST API Тестирование</span></li>
                <li><span className="text-gray-500">API Безопасность</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Помощь</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Конфиденциальность</Link></li>
                <li><Link href="/admin/feedback" className="hover:text-white transition-colors text-xs">👁️ Просмотр отзывов</Link></li>
              </ul>
              
              {/* Книга отзывов */}
              <div className="mt-6">
                <Link 
                  href="/feedback" 
                  className="group flex items-center space-x-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="relative">
                    <BookOpen className="w-6 h-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Книга отзывов</div>
                    <div className="text-xs text-amber-100">Жалобы и предложения</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TestMaster. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}