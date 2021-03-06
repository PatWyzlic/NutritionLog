// import dependencies
const mongoose = require('./connection')

//Define foods model
const { Schema, model } = mongoose

// make our foods schema
const goalSchema = new Schema({
    username: { type: String, required: true},
    weight: { type: Number },
    goal_weight: { type: Number },
    calorie_goal: { type: Number},
}, { timestamps: true })

// make our food model
const Goal = model("Goal", goalSchema)

// Export our Model
module.exports = Goal