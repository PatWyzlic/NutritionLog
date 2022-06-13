// import dependencies
const mongoose = require('./connection')

// define our user model
// pull the schema and model constructors from mongoose
const { Schema, model } = mongoose

// Make a user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: false
    },
    calorieGoal: {
        type: Number,
        required: false
    }
})

// Make a user model
const User = model("User", userSchema)

// export our user model
module.exports = User