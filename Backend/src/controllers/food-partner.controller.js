const foodPartnerModel = require('../models/foodPartner.model')
const foodModel = require('../models/food.model')

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id

    if(!foodPartnerId){
        return res.status(400).json({
            message: "Food Partner ID is required"
        })
    }

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if(!foodPartner){
        return res.status(404).json({
            message: "Food Partner not found"
        })
    }

    res.status(200).json({
        message: "Food Partner fetched successfully",
        foodPartner : {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    })
}

module.exports = {
    getFoodPartnerById
}