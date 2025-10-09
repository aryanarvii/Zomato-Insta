import React from 'react'

class AuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Auth Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'var(--color-bg)',
          padding: 'var(--space-6)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
            Authentication Error
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            There was an issue with authentication. Please try logging in again.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('user')
              window.location.href = '/'
            }}
            style={{
              background: 'var(--color-accent)',
              color: 'white',
              border: 'none',
              padding: 'var(--space-3) var(--space-6)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Go to Login
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default AuthErrorBoundary
