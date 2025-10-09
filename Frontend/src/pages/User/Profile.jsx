import React from 'react'
import '../../styles/profile.css'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{position:'fixed', top: 12, left: 12, zIndex: 10}}><BackButton /></div>
          <div className="profile-avatar" aria-hidden="true">👤</div>
          <div>
            <h1 className="profile-title">Your Profile</h1>
            <p className="profile-subtitle">Manage your account and preferences.</p>
          </div>
        </div>
        <button className="auth-submit" onClick={handleLogout} aria-label="Logout">Logout</button>
      </header>

      <main className="profile-content">
        <section className="profile-section">
          <h2 className="section-heading">Account</h2>
          <div className="profile-card">
            <div style={{display:'grid', gridTemplateColumns:'140px 1fr', rowGap:'10px'}}>
              <div className="small-note">Name</div>
              <div>{user?.name || 'Foodie User'}</div>

              <div className="small-note">Email</div>
              <div>{user?.email || 'user@example.com'}</div>

              <div className="small-note">Member since</div>
              <div>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-heading">About this app</h2>
          <div className="profile-card">
            <p className="small-note">
              This is a food delivery platform. Food partners can list menu items with short video reels. Users discover, like, save, and order delicious dishes.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile


