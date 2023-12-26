const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const MealController = require('../controllers/meal')

router.get('/', verifyToken, MealController.read)

router.post('/', verifyToken, MealController.create)

router.post('/render', verifyToken, MealController.render)


module.exports = router
