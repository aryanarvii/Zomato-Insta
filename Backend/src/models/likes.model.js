const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
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

const likeModel =  mongoose.model('like', likeSchema)

module.exports = likeModel