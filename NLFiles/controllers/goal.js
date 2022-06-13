// Import Dependencies
const express = require('express')
const Goal = require('../models/goal')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
router.use((req, res, next) => {
	// checking the loggedin boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go next
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/user/login')
	}
})

// Routes
// index ALL foods route
router.get('/goals', (req, res) => {
	// find the foods
	Food.find({})
		// then render a template AFTER they're found
		.then((foods) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('foods/goals', { Goal, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})
