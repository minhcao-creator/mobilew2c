const express = require('express')

const IngredientUser = require('../models/IngredientUser')
const Ingredient = require('../models/Ingredient')

const read = async (req, res) => {
    var foodData0 = []
    var foodData1 = []
    var foodData2 = []
    var foodData3 = []
    var foodData4 = []
    try {
        const ingredients = await IngredientUser.find({ user: req.userId }).populate('ingredient', [
            'title', 'description', 'image', 'type'
        ])
        console.log(ingredients)
        ingredients.map((ing) => {
            const typ = ing.ingredient.type
            const ingredientwithid = {
                _id: ing.ingredient._id,
                title: ing.ingredient.title,
                description: ing.ingredient.description,
                image: ing.ingredient.image,
                id: ing.id
            }
            if (typ === 0) {
                foodData0.push(ingredientwithid)
                // console.log(foodData0)
            }
            if (typ === 1) foodData1.push(ingredientwithid)
            if (typ === 2) foodData2.push(ingredientwithid)
            if (typ === 3) foodData3.push(ingredientwithid)
            if (typ === 4) foodData4.push(ingredientwithid)

        })
        const data = [
            {
                name: 'Củ',
                foodData: foodData0
            },
            {
                name: 'Rau',
                foodData: foodData1
            },
            {
                name: 'Cá',
                foodData: foodData2
            },
            {
                name: 'Thịt',
                foodData: foodData3
            },
            {
                name: 'Nấm',
                foodData: foodData4
            }
        ]
        // console.log(data)
        res.json({ success: true, data })
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    try {
        const newIngredientUser = new IngredientUser({ ingredient: req.body.ingredientId, user: req.userId })
        await newIngredientUser.save()
        res.json({ success: true, newIngredientUser })
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req, res) => {
    try {
        const ingredient = await IngredientUser.findOneAndDelete({ _id: req.params.id })
        if (ingredient) {
            res.json({
                success: true,
                message: 'Delete Ingredient successfully'
            })
        }
        else {
            console.log(req.params.id)
            res.json({
                success: true,
                message: 'Ingredient invalid'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

module.exports = { read, create, remove }