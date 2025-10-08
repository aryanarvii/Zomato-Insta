// create server

const express = require("express");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors')

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}))


app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use(express.json()) // This middleware is used so that express can read data from req.body
// by default express is not able to read the req.body

app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.use('/api/food', foodRoutes)

app.use('/api/food-partner', foodPartnerRoutes)

module.exports = app;