import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    // Since there's no /api/auth/me endpoint, we'll check localStorage for auth state
    // and let the actual API calls handle authentication validation
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('user')
        setUser(null)
      }
    }
    setLoading(false)
  }

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = async () => {
    try {
      // Determine logout endpoint based on user type
      const logoutEndpoint = user?.userType === 'food-partner' 
        ? '/api/auth/food-partner/logout'
        : '/api/auth/user/logout'
      
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}${logoutEndpoint}`, {}, { 
        withCredentials: true 
      })
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    } finally {
      setUser(null)
      localStorage.removeItem('user')
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
