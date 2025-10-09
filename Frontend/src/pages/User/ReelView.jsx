import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const ReelView = () => {
    const { reelId } = useParams()
    const navigate = useNavigate()
    const [videos, setVideos] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Fetch all videos to create a feed starting from the selected reel
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food`, { withCredentials: true })
            .then(response => {
                const allVideos = response.data.foodItems || []
                const startIndex = allVideos.findIndex(video => video._id === reelId)
                
                if (startIndex !== -1) {
                    // Reorder videos to start from the selected reel
                    const reorderedVideos = [
                        ...allVideos.slice(startIndex),
                        ...allVideos.slice(0, startIndex)
                    ]
                    setVideos(reorderedVideos)
                    setCurrentIndex(0)
                } else {
                    setVideos(allVideos)
                }
            })
            .catch(() => {
                // Handle error - maybe redirect back to home
                navigate('/home')
            })
    }, [reelId, navigate])

    const handleBack = () => {
        navigate('/home')
    }

    const handleLike = async (item) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food/like`, 
                { foodId: item._id }, 
                { withCredentials: true }
            )

            if (response.data.like) {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
                ))
            } else {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount || 0) - 1) } : v
                ))
            }
        } catch (error) {
            console.error('Error liking video:', error)
        }
    }

    const handleSave = async (item) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/food/save`, 
                { foodId: item._id }, 
                { withCredentials: true }
            )

            if (response.data.save) {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, saveCount: (v.saveCount || 0) + 1 } : v
                ))
            } else {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, saveCount: Math.max(0, (v.saveCount || 0) - 1) } : v
                ))
            }
        } catch (error) {
            console.error('Error saving video:', error)
        }
    }

    return (
        <div className="reel-view-page">
            <button 
                className="back-button"
                onClick={handleBack}
                aria-label="Go back to home"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </button>
            
            <ReelFeed
                items={videos}
                onLike={handleLike}
                onSave={handleSave}
                emptyMessage="No videos available."
            />
        </div>
    )
}

export default ReelView
