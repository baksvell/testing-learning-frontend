'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

interface User {
  id: number
  username: string
  email: string
  level: number
  experience: number
  total_score: number
  created_at: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = Cookies.get('access_token')
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        Cookies.remove('access_token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      Cookies.remove('access_token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const data = await response.json()
        Cookies.set('access_token', data.access_token, { expires: 7 })
        setUser(data.user)
        toast.success('Успешный вход в систему!')
        return true
      } else {
        const error = await response.json()
        toast.error(error.error || 'Ошибка входа')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Ошибка соединения')
      return false
    }
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })

      if (response.ok) {
        const data = await response.json()
        Cookies.set('access_token', data.access_token, { expires: 7 })
        setUser(data.user)
        toast.success('Регистрация прошла успешно!')
        return true
      } else {
        const error = await response.json()
        toast.error(error.error || 'Ошибка регистрации')
        return false
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Ошибка соединения')
      return false
    }
  }

  const logout = () => {
    Cookies.remove('access_token')
    setUser(null)
    toast.success('Вы вышли из системы')
    router.push('/')
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}



