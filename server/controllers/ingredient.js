const express = require('express')

const Ingredient = require('../models/Ingredient')

const read = async (req, res) => {
    try {
        const ingredients = await Ingredient.find()
        res.json({
            success: true,
            ingredients
        })
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    const { title, description, image, type } = req.body

    try {
        const newIngredient = new Ingredient({ title, description, image, type })
        await newIngredient.save()
        res.json({ success: true, newIngredient })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { read, create }