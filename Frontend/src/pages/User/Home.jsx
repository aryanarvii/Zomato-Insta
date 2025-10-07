
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    // // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    // const demoVideos = [
    //     {
    //         _id: '1',
    //         src: 'https://ik.imagekit.io/dqjvcaqtjw/12888336_1080_1920_30fps_LKE6jBmF2.mp4?updatedAt=1759508016493',
    //         description: 'Delicious pasta recipe',
    //         storeUrl: '/create-food',
    //     },
    //     {
    //         _id: '2',
    //         src: 'https://ik.imagekit.io/dqjvcaqtjw/12888336_1080_1920_30fps_LKE6jBmF2.mp4?updatedAt=1759508016493',
    //         description: 'Delicious pasta recipe',
    //         storeUrl: '/create-food',
    //     },

    //     {
    //         _id: '3',
    //         src: 'https://ik.imagekit.io/dqjvcaqtjw/12888336_1080_1920_30fps_LKE6jBmF2.mp4?updatedAt=1759508016493',
    //         description: 'Delicious pasta recipe',
    //         storeUrl: '/create-food',
    //     } 
    // ]

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

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

    async function saveVideo(item) {
        
        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home
