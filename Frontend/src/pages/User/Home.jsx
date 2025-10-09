
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../styles/home.css'
import AvatarButton from '../../components/AvatarButton'
import '../../styles/reels.css'

const Home = () => {
    const [todaysDeals, setTodaysDeals] = useState([])
    const [recommended, setRecommended] = useState([])
    const [newFood, setNewFood] = useState([])
    const [trending, setTrending] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch different categories of food items
        Promise.all([
            axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food?category=todays-deals`, { withCredentials: true }),
            axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food?category=recommended`, { withCredentials: true }),
            axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food?category=new`, { withCredentials: true }),
            axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food?category=trending`, { withCredentials: true })
        ])
        .then(([dealsRes, recRes, newRes, trendRes]) => {
            setTodaysDeals(dealsRes.data.foodItems || [])
            setRecommended(recRes.data.foodItems || [])
            setNewFood(newRes.data.foodItems || [])
            setTrending(trendRes.data.foodItems || [])
        })
        .catch(() => {
            // Fallback to general food items if category endpoints don't exist
            axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food`, { withCredentials: true })
                .then(response => {
                    const items = response.data.foodItems || []
                    setTodaysDeals(items.slice(0, 5))
                    setRecommended(items.slice(5, 10))
                    setNewFood(items.slice(10, 15))
                    setTrending(items.slice(15, 20))
                })
                .catch(() => { /* noop: optionally handle error */ })
        })
    }, [])

    const handleReelClick = (reelId) => {
        navigate(`/reel/${reelId}`)
    }

    const FoodSection = ({ title, items, emptyMessage }) => (
        <div className="food-section">
            <h2 className="section-title">{title}</h2>
            <div className="food-cards-container">
                {items.length === 0 ? (
                    <div className="empty-section">
                        <p>{emptyMessage}</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div 
                            key={item._id} 
                            className="food-card"
                            onClick={() => handleReelClick(item._id)}
                        >
                            <div className="food-card-video">
                                <video
                                    src={item.video}
                                    muted
                                    playsInline
                                    loop
                                    preload="metadata"
                                />
                                <div className="food-card-overlay">
                                    <div className="food-card-actions">
                                        <div className="action-item">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                                            </svg>
                                            <span>{item.likeCount || 0}</span>
                                        </div>
                                        <div className="action-item">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                                            </svg>
                                            <span>{item.saveCount || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="food-card-content">
                                <p className="food-card-description">{item.description}</p>
                                {item.foodPartner && (
                                    <span className="food-card-partner">by {item.foodPartner}</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

    return (
        <div className="home-page">
            <div className="home-header" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div>
                    <h1>Discover Amazing Food</h1>
                    <p>Explore delicious recipes and find your next favorite dish</p>
                </div>
                <AvatarButton onClick={() => navigate('/profile')} />
            </div>
            
            <div className="home-content">
                <FoodSection 
                    title="🔥 Today's Deals" 
                    items={todaysDeals} 
                    emptyMessage="No deals available today"
                />
                
                <FoodSection 
                    title="💡 What You May Like" 
                    items={recommended} 
                    emptyMessage="No recommendations yet"
                />
                
                <FoodSection 
                    title="🆕 New Food to Try" 
                    items={newFood} 
                    emptyMessage="No new items available"
                />
                
                <FoodSection 
                    title="📈 Trending Now" 
                    items={trending} 
                    emptyMessage="No trending items"
                />
            </div>
        </div>
    )
}

export default Home
