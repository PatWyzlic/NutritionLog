// Import Dependencies
const mongoose = require('./connection')
const Food = require('./food')

// Seed Code
// save the connection in a variable
const db = mongoose.connection;

db.on('open', () => {
	// array of starter foods
	const startFoods = {
        name: 'pizza',
        "items": [
          {
            "sugar_g": 13.3,
            "fiber_g": 4,
            "serving_size_g": 283.495,
            "sodium_mg": 8,
            "name": "onion",
            "potassium_mg": 99,
            "fat_saturated_g": 0.1,
            "fat_total_g": 0.5,
            "calories": 126.7,
            "cholesterol_mg": 0,
            "protein_g": 3.9,
            "carbohydrates_total_g": 28.6
          }
        ]
    }
	

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