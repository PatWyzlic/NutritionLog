// import dependencies
require('dotenv').config()
const mongoose = require('mongoose')

// database connection
// here we are setting up inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL

// establish connection
mongoose.connect(DATABASE_URL, err => {
	if(err) throw err;
	console.log('connected to MongoDB')
});

// events for when our connection opens/closes/errors
mongoose.connection
	.on('open', () => console.log('Connected to Mongoose'))
	.on('close', () => console.log('Disconnected from Mongoose'))
	.on('error', (error) => console.log(error))

// export our connection
module.exports = mongoose