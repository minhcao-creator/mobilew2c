const express = require('express')

const MealUser = require('../models/MealUser')

const read = async (req, res) => {
    try {
        const meals = await MealUser.find({ user: req.userId }).populate('meal', [
            'title', 'image', 'recipe'
        ])
        res.json({ success: true, meals })
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    const { meals } = req.body
    const user = req.userId
    try {
        await meals.map(async (meal) => {
            const newMeal = new MealUser({ meal, user })
            await newMeal.save()
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req, res) => {
    try {
        const meal = await MealUser.findOneAndDelete({_id: req.params.id})
        if (meal) {
            res.json({
                success: true,
                message: 'Delete meal successfully'
            })
        }
        else {
            console.log(req.params.id)
            res.json ({
                success: true,
                message: 'meal invalid'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
    
}

module.exports = { read, create, remove }