import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AppRoutes from './Routes/AppRoutes.jsx'
import { AuthProvider } from './contexts/AuthContext'
import AuthErrorBoundary from './components/AuthErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthErrorBoundary>
      <AuthProvider>
        <AppRoutes/>
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
      </AuthProvider>
    </AuthErrorBoundary>
  )
}

export default App
