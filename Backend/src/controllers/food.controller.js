
const foodModel = require('../models/food.model')
const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodPartner.model')
const storageService = require('../services/storage.service')
const { v4: uuid } = require("uuid");
const likeModel = require('../models/likes.model');
const saveFoodModel = require('../models/saveFood.model');


async function createFood(req, res) {
    console.log(req.body)

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, req.file.originalname)

    if ( req.body.name ==="" || !req.file) {
        return res.status(400).json({
            message: "All fields are required" 
        })
    }

    try {
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        }) 
    
    
        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        })
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error", error: error.message 
        });
    }

}

async function getFoodItems(req, res){
    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "Food Items fetched successfully",
        foodItems
    })
}

async function likeFood(req, res){
    
    const {foodId} = req.body
    
    const user = req.user

    const isUserLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isUserLiked){
        await likeModel.deleteOne({
        user: user._id,
        food: foodId
        })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc : {likeCount: -1}
    })

        return res.status(200).json({
            message:"Food Unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc : {likeCount: +1}
    })

    return res.status(200).json({
        message:"Food liked successfully",
        like
    })
}

async function saveFood(req, res){
    
    const {foodId} = req.body
    const user = req.user

    const hasUserSaved = await saveFoodModel.findOne({
        user: user._id,
        food: foodId
    })

    if(hasUserSaved){
        await saveFoodModel.deleteOne({
        user: user._id,
        food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc : {saveCount: -1}
        })

        return res.status(200).json({
            message:"Food unsaved successfully"
        })
    }

    const save = await saveFoodModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc : {saveCount: +1}
    })

    return res.status(200).json({
        message:"Food saved successfully",
        save
    })
}

async function getSavedFood(req, res){
    const user = req.user

    const savedFoods = await saveFoodModel.find({user: user._id}).populate("food")

    if(!savedFoods || savedFoods.length === 0){
        return res.status(404).json({
            message: "No Saved Foods found!"
        })
    }

    res.status(201).json({
        message: "Saved foods fetched successfully",
        savedFoods
    })
}



module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFood,
}