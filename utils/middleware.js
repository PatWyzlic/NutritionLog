// Import Dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoConnect = require('connect-mongo')
var path = require ('path');
const MongoDBStore = require('connect-mongodb-session')(session);
const FoodRouter = require('../controllers/food')
const UserRouter = require('../controllers/user')
const GoalRouter = require('../controllers/goal')

//Create a function for the middleware to run
const middleware = (app) => {
    app.use(morgan('tiny'))
    app.use(methodOverride('_method'))
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.join(__dirname + '../public')));
	app.set('views', __dirname + 'views');
    app.use(
			session({
				secret: process.env.SECRET,
				store: MongoConnect.create({ mongoUrl: process.env.DATABASE_URL }),
				saveUninitialized: true,
				resave: false,
			})
		)
		
}

//Export Middleware
module.exports = middleware