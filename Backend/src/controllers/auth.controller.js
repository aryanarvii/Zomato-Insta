const userModel = require('../models/user.model.js')
const foodPartnerModel = require('../models/foodPartner.model.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    const {fullName, email, password} = req.body

    // check does the user exists already
    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await userModel.create({
        fullName, email, password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // must be true for HTTPS (Render + Vercel)
        sameSite: "none",    // required when frontend and backend have different domains
        })
    res
    .status(200)
    .json({
        message: "User successfully registered",
        user:{
            _id: user._id,
            fullName: user.fullName,
            email:user.email
        }
    })
}

async function loginUser(req, res){
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user?.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res
    .status(200)
    .cookie("token", token, {
        httpOnly: true,
        secure: true,        // must be true for HTTPS (Render + Vercel)
        sameSite: "none",    // required when frontend and backend have different domains
        })
    .json({
        message:"User logged in successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function logoutUser(req, res){
    res
    .clearCookie("token")
    .status(200)
    .json({
        message:"User logged out successfully"
    })
}




// FOOD PARTNER AUTHS

async function registerFoodPartner(req, res) {
    const {name, email, password, phone, address, contactName } = req.body

    // check does the user exists already
    const isFoodPartnerExist = await foodPartnerModel.findOne({
        email
    })

    if(isFoodPartnerExist){
        return res.status(400).json({
            message: "Food Partner already exists with this email"
        })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const foodPartner = await foodPartnerModel.create({
        name, email, password: hashedPassword, address, phone, contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // must be true for HTTPS (Render + Vercel)
        sameSite: "none",    // required when frontend and backend have different domains
        })
    res
    .status(200)
    .json({
        message: "Food Partner successfully registered",
        foodPartner:{
            _id: foodPartner._id,
            name: foodPartner.name,
            email:foodPartner.email,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName,
            address:foodPartner.address,
        }
    })
}

async function loginFoodPartner(req, res){
    const {email, password} = req.body

    const foodPartner = await foodPartnerModel.findOne({email})

    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, foodPartner?.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

    res
    .status(200)
    .cookie("token", token, {
        httpOnly: true,
        secure: true,        // must be true for HTTPS (Render + Vercel)
        sameSite: "none",    // required when frontend and backend have different domains
        })
    .json({
        message:"Food Partner logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            name: foodPartner.name,
            email:foodPartner.email,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName,
            address:foodPartner.address,
        }
    })

}

async function logoutFoodPartner(req, res){
    res
    .clearCookie("token")
    .status(200)
    .json({
        message:"Food Partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
    
}