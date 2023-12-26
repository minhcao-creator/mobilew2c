const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	image: {
		type: String,
		required: true
	},
	type: {
		type: Number,
		enum: [0, 1, 2, 3, 4]
	}
})

module.exports = mongoose.model('ingredients', IngredientSchema)
