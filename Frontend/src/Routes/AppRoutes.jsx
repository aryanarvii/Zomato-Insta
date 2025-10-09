import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/User/Home';
import ReelView from '../pages/User/ReelView';
import Saved from '../pages/User/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import PartnerDashboard from '../pages/food-partner/Dashboard';
import Profile from '../pages/User/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<ChooseRegister />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            <Route path="/home" element={
                <ProtectedRoute>
                    <><Home /><BottomNav /></>
                </ProtectedRoute>
            } />
            <Route path="/reel/:reelId" element={
                <ProtectedRoute>
                    <ReelView />
                </ProtectedRoute>
            } />
            <Route path="/saved" element={
                <ProtectedRoute>
                    <><Saved /><BottomNav /></>
                </ProtectedRoute>
            } />
            <Route path="/partner/dashboard" element={
                <ProtectedRoute>
                    <PartnerDashboard />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/create-food" element={
                <ProtectedRoute>
                    <CreateFood />
                </ProtectedRoute>
            } />
            {/* Reserved for partner public profile if needed later */}
        </Routes>
    </Router>
  )
}

export default AppRoutes
