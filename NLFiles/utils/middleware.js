// Import Dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const FoodRouter = require('../controllers/food')
const UserRouter = require('../controllers/user')

//Create a function for the middleware to run
const middleware = (app) => {
    app.use(morgan('tiny'))
    app.use(methodOverride('_method'))
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static('public'))
    app.use(
			session({
				secret: process.env.SECRET,
				store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
				saveUninitialized: true,
				resave: false,
			})
		)
}

//Export Middleware
module.exports = middleware