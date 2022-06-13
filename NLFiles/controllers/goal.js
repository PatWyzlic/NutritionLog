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
router.get('/', (req, res) => {
	// find the foods
	Goal.find({})
		// then render a template AFTER they're found
		.then((goals) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			// console.log(foods)
			res.render('goals/index', { goals, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// index that shows only the user's foods
router.get('/goals', (req, res) => {
	// find the foods
	Goal.find({ username: req.session.username })
		// then render a template AFTER they're found
		.then((goals) => {
			// console.log(foods)
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('goals/index', { goals, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const weightId = req.params.id
	// find the food
	Weight.findById(weightId)
		// -->render if there is a food
		.then((goals) => {
			console.log('edit goals', goals)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('goals/edit', { goals, username, loggedIn })
		})
		// -->error if no food
		.catch((err) => {
			console.log(err)
			res.json(err)
		})
})


// Export the Router
module.exports = router