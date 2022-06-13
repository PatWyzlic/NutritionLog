// import dependencies
const mongoose = require('./connection')

//Define foods model
const { Schema, model } = mongoose

// make our foods schema
const foodSchema = new Schema({
    name: { type: String },
    calories: { type: Number},
    date : { type : Date, default: Date.now },
    username: { type: String },
}, { timestamps: true })

// make our food model
const Food = model("Food", foodSchema)

// Export our Model
module.exports = Food