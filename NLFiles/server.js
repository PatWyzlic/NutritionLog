//Import dependencies
require('dotenv').config()
const express = require('express')

//Include required routes 
const middleware = require('./utils/middleware')

//Create app
const app = require('liquid-express-views')(express())

//Include middleware
middleware(app)

//Listen to the server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`)
})