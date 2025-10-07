import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    saveCount: item.food.saveCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: Math.max(0, (v.saveCount ?? 1) - 1) } : v))
        } catch {
            // noop
        }
    }

    async function likeVideo(item) {
        console.log(item)
        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            onLike={likeVideo}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved