const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        fullName: {
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
        }
    },
    {
        timestamps: true
    }

)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;