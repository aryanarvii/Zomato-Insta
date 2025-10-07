const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            //required: true, --> not required as sometime we login using google auth
            unique: true
        },

        phone:{
            type: String,
            required: true,
        },

        address:{
            type: String,
            required: true,
        },

        contactName:{
            type: String,
            required: true
        }

    },

    {
        timestamps: true
    }
)

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema)

module.exports = foodPartnerModel;