const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth.controller')


// User auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.post('/user/logout', authController.logoutUser)

// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.post('/food-partner/logout', authController.logoutFoodPartner)


module.exports = router