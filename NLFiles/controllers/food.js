//Import Dependencies
const express = require('express')
const Food = require('../models/food')

const router = express.Router()

//Routes
router.get('/', (req, res) => {
	// find the food
	Food.find({})
		// then render a template AFTER they're found
		.then((foods) => {
			res.render('foods/index', { foods })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})