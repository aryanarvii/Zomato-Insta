import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--color-bg)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--color-border)',
          borderTop: '3px solid var(--color-accent)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} replace />
}

export default ProtectedRoute
