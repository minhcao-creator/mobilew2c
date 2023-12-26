const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const IngredientUserController = require('../controllers/ingredientUser')
const MealUserController = require('../controllers/mealUser')

const recogImage = require('../controllers/recogImage')

router.get('/ingredients', verifyToken, IngredientUserController.read)

router.post('/ingredients', verifyToken, recogImage)

router.delete('/ingredients/:id', verifyToken, IngredientUserController.remove)

router.post('/meals', verifyToken, MealUserController.create)

router.get('/meals', verifyToken, MealUserController.read)

router.delete('/meals/:id', verifyToken, MealUserController.remove)


module.exports = router

