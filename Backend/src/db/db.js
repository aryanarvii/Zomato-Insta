const mongoose = require("mongoose")
const DB_NAME = require('../constants.js')


async function connectDB(){

    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then(()=> console.log("MongoDB connected successfully "))
    .catch((err)=>{
        console.log("MongoDB Connection Error: ", err)
    })
}

module.exports = connectDB