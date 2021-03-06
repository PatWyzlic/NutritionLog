// import dependencies
const mongoose = require('./connection')

//Define foods model
const { Schema, model } = mongoose

// make our foods schema
const foodSchema = new Schema({
        name: String,
        username: String,
        "items": [
        {
            "sugar_g": Number,
            "fiber_g": Number,
            "serving_size_g": Number,
            "sodium_mg": Number,
            "name": String,
            "potassium_mg": Number,
            "fat_saturated_g": Number,
            "fat_total_g": Number,
            "calories": Number,
            "cholesterol_mg": Number,
            "protein_g": Number,
            "carbohydrates_total_g": Number
        },
        ]
    }, { timestamps: true })

// make our food model
const Food = model("Food", foodSchema)

// Export our Model
module.exports = Food