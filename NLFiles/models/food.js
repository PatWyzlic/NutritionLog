// import dependencies
const mongoose = require('./connection')

//Define foods model
const { Schema, model } = mongoose

// make our fruits schema
const foodSchema = new Schema({
    name: { type: String },
    calories: { type: Number}
}, { timestamps: true })

// make our fruit model
const Food = model("Food", foodSchema)

// Export our Model
module.exports = Food