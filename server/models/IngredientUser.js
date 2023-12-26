const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientUserSchema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredients'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
    createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('ingredientUsers', IngredientUserSchema)
