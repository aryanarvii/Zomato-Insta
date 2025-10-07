import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import PartnerRegister from '../pages/auth/FoodPartnerRegister'
import PartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/User/Home';
import Saved from '../pages/User/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/user/register" element={<UserRegister/>} />
            <Route path="/user/login" element={<UserLogin/>} />
            <Route path="/food-partner/register" element={<PartnerRegister/>} />
            <Route path="/food-partner/login" element={<PartnerLogin/>} />
            <Route path="/" element={<><Home /><BottomNav /></>} />
            <Route path="/saved" element={<><Saved /><BottomNav /></>} />
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="/food-partner/:id" element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes
