const mongoose = require('mongoose');

const saveFoodSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },

    food:{
        type: mongoose.Types.ObjectId,
        ref: 'food',
        required: true
    }

}, {timestamps: true})

const saveFoodModel =  mongoose.model('save', saveFoodSchema)

module.exports = saveFoodModel