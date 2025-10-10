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
  File
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

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Практические задания",
      description: "Реальные сценарии тестирования с автоматической проверкой результатов",
      color: "text-primary-600"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Геймификация",
      description: "Система очков, достижений и рейтингов для мотивации обучения",
      color: "text-warning-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Безопасность",
      description: "Изучение тестирования безопасности, XSS, SQL инъекций и других уязвимостей",
      color: "text-danger-600"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "API тестирование",
      description: "Практика тестирования REST API, JSON ответов и асинхронных запросов",
      color: "text-success-600"
    }
  ]

      // Categories for testing lessons
      const categories = [
        { name: "DevTools", icon: <Code />, count: 6, color: "bg-indigo-500", href: "/devtools" },
        { name: "Postman", icon: <Globe />, count: 5, color: "bg-blue-500", href: "/postman-lessons" },
        { name: "OpenAPI", icon: <File />, count: 5, color: "bg-emerald-500", href: "/openapi" },
        { name: "Функциональное", icon: <Bug />, count: 6, color: "bg-primary-500", href: "/functional" },
        { name: "UI/UX", icon: <BookOpen />, count: 5, color: "bg-success-500", href: "/ui-ux" },
        { name: "API", icon: <Code />, count: 5, color: "bg-warning-500", href: "/api" },
        { name: "Регрессионное", icon: <Zap />, count: 5, color: "bg-purple-500", href: "/regression" },
        { name: "Безопасность", icon: <Shield />, count: 8, color: "bg-danger-500", href: "/security" }
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
              <Link href="/tasks" className="text-gray-600 hover:text-primary-600 transition-colors">
                Задания
              </Link>
              <Link href="/devtools" className="text-gray-600 hover:text-primary-600 transition-colors">
                DevTools
              </Link>
              <Link href="/postman" className="text-gray-600 hover:text-primary-600 transition-colors">
                Postman
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                Рейтинг
              </Link>
              <Link href="/achievements" className="text-gray-600 hover:text-primary-600 transition-colors">
                Достижения
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Привет, {user?.username}!
                  </span>
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
              Изучайте тестирование
              <span className="text-gradient block">интерактивно</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Практическая платформа для изучения различных видов тестирования веб-приложений. 
              Реальные задания, игровые элементы и система прогресса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tasks" className="btn btn-primary text-lg px-8 py-3">
                <Play className="w-5 h-5 mr-2" />
                Начать обучение
              </Link>
              <Link href="/about" className="btn btn-secondary text-lg px-8 py-3">
                Узнать больше
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
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Современный подход к обучению тестированию с практическими заданиями и игровыми элементами
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
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
              Категории тестирования
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Изучайте различные виды тестирования от базовых до продвинутых
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  {category.name === 'DevTools' && 'Изучение инструментов разработчика браузера'}
                  {category.name === 'Postman' && 'Профессиональное тестирование API'}
                  {category.name === 'OpenAPI' && 'Документация и тестирование API с Swagger'}
                  {category.name === 'Функциональное' && 'Тестирование функциональности приложения'}
                  {category.name === 'UI/UX' && 'Тестирование пользовательского интерфейса'}
                  {category.name === 'API' && 'Тестирование REST API и веб-сервисов'}
                  {category.name === 'Регрессионное' && 'Автоматизированное тестирование изменений'}
                  {category.name === 'Безопасность' && 'Тестирование безопасности веб-приложений'}
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
              Готовы начать обучение?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Присоединяйтесь к тысячам тестировщиков, которые уже изучают новые навыки на нашей платформе
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Zap className="w-5 h-5 mr-2" />
                Начать бесплатно
              </Link>
              <Link href="/demo" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                Посмотреть демо
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
                Интерактивная платформа для обучения тестированию веб-приложений
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Обучение</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tasks" className="hover:text-white transition-colors">Задания</Link></li>
                <li><Link href="/devtools" className="hover:text-white transition-colors">DevTools урок</Link></li>
                <li><Link href="/postman" className="hover:text-white transition-colors">Postman</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition-colors">Туториалы</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Ресурсы</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Сообщество</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">Рейтинг</Link></li>
                <li><Link href="/achievements" className="hover:text-white transition-colors">Достижения</Link></li>
                <li><Link href="/forum" className="hover:text-white transition-colors">Форум</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Помощь</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Конфиденциальность</Link></li>
              </ul>
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
