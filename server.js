//Import dependencies
require('dotenv').config()
const express = require('express')
const api_key = process.env.API_KEY

//Create app
const app = require('liquid-express-views')(express())

//Require routers
const FoodRouter = require('./controllers/food')
const UserRouter = require('./controllers/user')
const GoalRouter = require('./controllers/goal')
const HomeRouter = require('./controllers/home')
const middleware = require('./utils/middleware')

//Include middleware
middleware(app)


//Routes
app.use('/goals', GoalRouter)
app.use('/foods', FoodRouter)
app.use('/user', UserRouter)
app.use('/', HomeRouter)

//Listen to the server
const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
    console.log(`app is listening to port ${PORT}`)
})