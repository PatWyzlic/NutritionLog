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
// index ALL goals route
router.get('/', (req, res) => {
	// find the foods
	Goal.find({})
		// then render a template AFTER they're found
		.then((goals) => {
			let arrayLength = goals.length
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('goals/index', { goals, arrayLength, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// index that shows only the user's goals
router.get('/goals', (req, res) => {
	// find the goals
	Goal.find({ username: req.session.username })
		// then render a template AFTER they're found
		.then((goals) => {
			console.log(goals.length)
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('foods/index', { goals, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

router.get('/new', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn

	res.render('goals/new', { username, loggedIn })
})

// index that shows only the user's foods
router.post('/new', (req, res) => {
	let theUsername = req.session.username
    let weight = req.body.weight
	let goalWeight = req.body.goal_weight
	let calorieGoal = req.body.calorie_goal;
	const newGoals = {
		username: theUsername,
		weight: weight,
		goal_weight: goalWeight,
		calorie_goal: calorieGoal
	}
	console.log(newGoals)
	Goal.create(newGoals)
	res.redirect('/goals')
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const goalId = req.params.id
	// find the goal
	Goal.findById(goalId)
		// -->render if there is a goal
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

// update route -> sends a put request to our database
router.put('/:id', (req, res) => {
	// get the id
	const goalId = req.params.id
	Goal.findByIdAndUpdate(goalId, req.body, { new: true })
		// if successful -> redirect to the food page
		.then((food) => {
			req.body.weight
			console.log('the updated food', food)

			res.redirect(`/foods/${food.id}`)
		})
		// if an error, display that
		.catch((error) => res.json(error))
})



// Export the Router
module.exports = router