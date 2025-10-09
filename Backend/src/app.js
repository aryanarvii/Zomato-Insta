// create server

const express = require("express");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors')

const app = express();


// app.use(
//   cors({
//     origin: [
//       "https://tastetube-lkkjcj108-aryan-arvinds-projects.vercel.app/",  // frontend deployed URL
//       "http://localhost:5173"                // for local testing
//     ],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "https://tastetube-theta.vercel.app",                   // your main frontend
  "https://tastetube-lkkjcj108-aryan-arvinds-projects.vercel.app", // preview domain (Vercel auto-generated)
  "http://localhost:5173",                                // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


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