// Import Dependencies
const mongoose = require('./connection')
const Food = require('./food')

// Seed Code
// save the connection in a variable
const db = mongoose.connection;

db.on('open', () => {
	// array of starter foods
	const startFoods = [
		{ name: 'Cheddar', calories: 100 },
		{ name: 'Oats', calories: 150 },
	]

	// delete all the data that already exists(will only happen if data exists)
	Food.remove({})
        .then(deletedFoods=> {
		    console.log('this is what remove returns', deletedFoods)
		    // then we create with our seed data
            Food.create(startFoods)
                .then((data) => {
                    console.log('Here are the new seed foods', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
	    })
        .catch(error => {
            console.log(error)
            db.close()
        })
	// then we can send if we want to see that data
})