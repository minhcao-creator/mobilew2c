const express = require('express')

const Meal = require('../models/Meal')

const read = async (req, res) => {
    try {
        const meals = await Meal.find().populate(
            'ingredients', ['title']
        )
        res.json({
            success: true,
            meals
        })
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    const data = req.body
    try {
        const newMeal = new Meal(data)
        await newMeal.save()
        res.json({
            success: true,
            newMeal
        })
    } catch (error) {
        console.log(error)
    }
}

const render = async (req, res) => {
    var ingredients = req.body.ingredients
    // console.log(ingredients)
    var size = ingredients.length
    const meals = await Meal.find().populate(
        'ingredients', ['title']
    )
    var size_m = meals.length
    var data = []
    for (var j = 0; j < size_m; j++) {
        meal = meals[j].ingredients
        // console.log(meal)
        if (meal.every(m => ingredients.includes(m.title))) {
            console.log(meal)
            data.push(meals[j])
            meal.map(m => {
                for (var i = 0; i < size; i++) {
                    if (ingredients[i] === m.title) {
                        console.log('oke')
                        ingredients.splice(i, 1)
                        i = size
                        size--
                    }
                }
            })
        }
        if (size == 0) j = size_m

    }
    res.json({
        success: true,
        data
    })

}

module.exports = { read, create, render }