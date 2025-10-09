import React, { useMemo } from 'react'
import '../../styles/profile.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import BackButton from '../../components/BackButton'

const StatCard = ({ label, value, trend }) => {
  return (
    <div className="profile-card" style={{gap:'8px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{color:'var(--color-text-secondary)', fontSize:'.85rem'}}>{label}</span>
        {typeof trend === 'number' && (
          <span style={{color: trend >= 0 ? 'var(--color-accent)' : 'var(--color-danger)', fontWeight:600}}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div style={{fontSize:'1.6rem', fontWeight:700}}>{value}</div>
    </div>
  )
}

const QuickAction = ({ to, label, description }) => {
  return (
    <Link to={to} className="profile-card" style={{textDecoration:'none'}}>
      <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
        <div style={{fontWeight:700}}>{label}</div>
        <div className="small-note">{description}</div>
      </div>
    </Link>
  )
}

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const stats = useMemo(() => ({
    totalItems: 12,
    weeklyViews: 1340,
    saves: 220,
    orders: 86,
    revenue: '₹42,300'
  }), [])

  return (
    <div className="profile-page">
      <header className="profile-header" style={{alignItems:'flex-start', gap:'12px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{position:'fixed', top: 12, left: 12, zIndex: 10}}><BackButton /></div>
          <div className="profile-avatar" aria-hidden="true">🍜</div>
          <div>
            <h1 className="profile-title">Partner Dashboard</h1>
            <p className="profile-subtitle">Welcome{user?.name ? `, ${user.name}` : ''}. Manage your menu, view analytics, and grow your business.</p>
          </div>
        </div>
        <div style={{display:'flex', gap:'8px'}}>
          <button className="auth-submit" onClick={() => navigate('/create-food')}>Create Food Item</button>
          <button className="auth-submit" style={{background:'var(--color-danger)'}} onClick={() => {
            // immediate logout UX
            try { localStorage.removeItem('user') } catch {}
            navigate('/')
          }}>Logout</button>
        </div>
      </header>

      <main className="profile-content">
        <section className="profile-section">
          <h2 className="section-heading">Analytics</h2>
          <div className="profile-grid">
            <StatCard label="Total Menu Items" value={stats.totalItems} trend={4} />
            <StatCard label="Weekly Views" value={stats.weeklyViews} trend={12} />
            <StatCard label="Saves" value={stats.saves} trend={8} />
            <StatCard label="Orders (7d)" value={stats.orders} trend={-3} />
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-heading">Quick Actions</h2>
          <div className="profile-grid">
            <QuickAction to="/create-food" label="Add New Food" description="Upload a short reel and details to list a new item." />
            <QuickAction to="/food-partner/profile" label="Edit Store Profile" description="Update your store info, address, and timings." />
            <QuickAction to="/saved" label="View Saved Reels" description="See items saved by you for inspiration." />
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-heading">Tips</h2>
          <div className="profile-card">
            <ul style={{margin:0, paddingLeft:'18px', lineHeight:1.6}}>
              <li>Keep your food reels short (10-20s) and well-lit.</li>
              <li>Use trending music and add clear descriptions.</li>
              <li>Respond to comments to boost engagement and trust.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard


