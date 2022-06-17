// Import
const express = require('express')
const Food = require('../models/food')
const YOUR_API_KEY = process.env.API_KEY
const mongoose = require('../models/connection')
const db = mongoose.connection;

// Creation of router
const router = express.Router()

// Middleware for authorization and router
router.use((req, res, next) => {
	// Check if user is logged in
	if (req.session.loggedIn) {
		// if they're logged in, go next
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/user/login')
	}
})

// Routes
// Index all foods route
router.get('/', (req, res) => {
	// find the foods
	Food.find({})
		// Render all foods
		.then((foods) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('foods/index', { foods, username})
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// Show user foods only
router.get('/mine', (req, res) => {
	// Find the foods
	Food.find({ username: req.session.username })
		// Render user foods only
		.then((foods) => {
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

// new route
router.get('/new', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	//Render the new food page
	res.render('foods/new', { username, loggedIn })
})

router.post('/new', (req, res) => {
	// Set variables to push into schema
    let username = req.session.username
    let name = req.body.name
	let sugar = req.body.sugar_g;
    let fiber = req.body.fiber_g;
    let servingSize = req.body.serving_size_g;
    let sodium = req.body.sodium_mg;
    let potassium = req.body.potassium_mg;
    let fatSaturated = req.body.fat_saturated_g;
    let fatTotal = req.body.fat_total_g;
    let calories = req.body.calories;
    let cholesterol = req.body.cholesterol_mg;
    let protein = req.body.protein_g;
    let carbohydrates = req.body.carbohydrates_total_g;
        const newFoods = {
            name: name,
            username: username,
            "items": [
            {
                "sugar_g": sugar,
                "fiber_g": fiber,
                "serving_size_g": servingSize,
                "sodium_mg": sodium,
                "name": name,
                "potassium_mg": potassium,
                "fat_saturated_g": fatSaturated,
                "fat_total_g": fatTotal,
                "calories": calories,
                "cholesterol_mg": cholesterol,
                "protein_g": protein,
                "carbohydrates_total_g": carbohydrates
            }
            ]
        }
		//Create the new food object
        Food.create(newFoods)
		//Take user back to their main page
        res.redirect('/foods/mine')
})

// Post info fetched from API into new food
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
        let test2 = food.items[0].fiber_g;
        let test3 = food.items[0].serving_size_g;
        let test4 = food.items[0].sodium_mg;
        let test5 = food.items[0].name;
        let test6 = food.items[0].potassium_mg;
        let test7 = food.items[0].fat_saturated_g;
        let test8 = food.items[0].fat_total_g;
        let test9 = food.items[0].calories;
        let test10 = food.items[0].cholesterol_mg;
        let test11 = food.items[0].protein_g;
        let test12 = food.items[0].carbohydrates_total_g;
        const newFoods = {
            name: test5,
            username: username,
            "items": [
            {
                "sugar_g": test,
                "fiber_g": test2,
                "serving_size_g": test3,
                "sodium_mg": test4,
                "name": test5,
                "potassium_mg": test6,
                "fat_saturated_g": test7,
                "fat_total_g": test8,
                "calories": test9,
                "cholesterol_mg": test10,
                "protein_g": test11,
                "carbohydrates_total_g": test12
            }
            ]
        }
		//Create new food taken from API
        Food.create(newFoods)
        res.redirect('/foods')
    })
    .catch(function(error){
        console.log(error)
    })
})

// Route to edit
router.get('/:id/edit', (req, res) => {
	// Setting id of food to variable
	const foodId = req.params.id
	// find the food
	Food.findById(foodId)
		// Render
		.then((food) => {
			console.log('edit food', food)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('foods/edit', { food, username, loggedIn })
		})
		// Error
		.catch((err) => {
			console.log(err)
			res.json(err)
		})
})

// Put route 
router.put('/:id', (req, res) => {
	// get the id
	const foodId = req.params.id
	const username = req.session.username
	console.log(req.body)
        const newFoods = {
			name: req.body.name,
			username: username,
			"items": [
			{
				"sugar_g": req.body.sugar_g,
				"fiber_g": req.body.fiber_g,
				"serving_size_g": req.body.serving_size_g,
				"sodium_mg": req.body.sodium_mg,
				"name": req.body.name,
				"potassium_mg": req.body.potassium_mg,
				"fat_saturated_g": req.body.fat_saturated_g,
				"fat_total_g": req.body.fat_total_g,
				"calories": req.body.calories,
				"cholesterol_mg": req.body.cholesterol_mg,
				"protein_g": req.body.protein_g,
				"carbohydrates_total_g": req.body.carbohydrates_total_g
			},
			]
		}
	Food.findOneAndUpdate(foodId, {$set: newFoods})
		// Redirect to specific food that was changed
		.then((food) => {
			console.log('the updated food', food)
			res.redirect(`/foods/${food.id}`)
		})
		// Error catch
		.catch((error) => res.json(error))
})

// show route
router.get('/:id', (req, res) => {
	// Get id
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
			res.redirect('/foods/mine')
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// Export the Router
module.exports = router