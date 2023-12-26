const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MealSchema = new Schema({
	title: {
		type: String
	},
	ingredients: [
		{
			type: Schema.Types.ObjectId,
			ref: 'ingredients'
		}
	],
	image: {
		type: String
	},
	recipe: {
		type: String
	}
})

module.exports = mongoose.model('meals', MealSchema)
