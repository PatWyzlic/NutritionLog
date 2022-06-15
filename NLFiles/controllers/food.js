// Import Dependencies
const express = require('express')
const Food = require('../models/food')
const YOUR_API_KEY = process.env.API_KEY
const fetch = require("node-fetch")
const mongoose = require('../models/connection')
const db = mongoose.connection;


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
	Food.find({})
		// then render a template AFTER they're found
		.then((foods) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			// console.log(foods)
			res.render('foods/index', { foods })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// index that shows only the user's foods
router.get('/mine', (req, res) => {
	// find the foods
	Food.find({ username: req.session.username })
		// then render a template AFTER they're found
		.then((foods) => {
			// console.log(foods)
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('foods/index', { foods, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn

	res.render('foods/new', { username, loggedIn })
})

// create -> POST route that calls the db and makes a new document
router.post('/', (req, res) => {
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    let query = req.body.query
    let headersList = {
        "X-API-KEY": "1RT14o/KGYDrVlJRZFVwDg==3XTvEdFI8JODs5hr"
        }
    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, { 
        method: "GET",
        headers: headersList
    })
    .then(function(response) {
        return response.json()
        //res.render('foods/index', { foodData })
    })
    .then((food) => {
        console.log(food)
        let test = food.items[0].sugar_g;
        const newFoods = {
            name: query,
            username: username,
            "items": [
              {
                "sugar_g": test
                
              }
            ]
        }
        Food.create(newFoods)
        console.log(test)
    })
    .catch(function(error){
        console.log(error)
    })
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const foodId = req.params.id
	// find the food
	Food.findById(foodId)
		// -->render if there is a food
		.then((food) => {
			console.log('edit food', food)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('foods/edit', { foods, username, loggedIn })
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
	const foodId = req.params.id
	Food.findByIdAndUpdate(foodId, req.body, { new: true })
		// if successful -> redirect to the food page
		.then((food) => {
			console.log('the updated food', food)

			res.redirect(`/foods/${food.id}`)
		})
		// if an error, display that
		.catch((error) => res.json(error))
})

// show route
router.get('/:id', (req, res) => {
	// first, we need to get the id
	const foodId = req.params.id
	// then we can find a food by its id
	Food.findById(foodId)
		// once found, we can render a view with the data
		.then((food) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('foods/show', { food, username, loggedIn })
		})
		// if there is an error, show that instead
		.catch((err) => {
			console.log(err)
			res.json({ err })
		})
})

// delete route
router.delete('/:id', (req, res) => {
	// get the food id
	const foodId = req.params.id
	// delete the food
	Food.findByIdAndRemove(foodId)
		.then((food) => {
			console.log('this is the response from FBID', food)
			res.redirect('/foods')
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// Export the Router
module.exports = router