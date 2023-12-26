const express = require("express");
const TeachableMachine = require("@sashido/teachablemachine-node");
const { createCanvas, loadImage } = require("canvas")
const fs = require("fs")
const IngredientUser = require('../models/IngredientUser')
const Ingredient = require('../models/Ingredient')


const recogImage = async (req, res) => {
	const model = new TeachableMachine({
		modelUrl: "https://teachablemachine.withgoogle.com/models/8eKP0euVB/"
	});
	const { photo } = req.body
	console.log(photo)
	await fs.writeFileSync("programming.txt", photo);
	// const url = data.toString()
	// console.log(url)
	return model.classify({
		imageUrl: photo,
	}).then(async (predictions) => {
		console.log(predictions);
		const ingredient = await Ingredient.findOne({ title: predictions[0].class })
		const newIngredientUser = new IngredientUser({ ingredient: ingredient._id, user: req.userId })
		await newIngredientUser.save()
		// res.json({ success: true, newIngredientUser })
		return res.json(predictions[0]);
	}).catch((e) => {
		console.error(e);
		res.status(500).send("Something went wrong!")
	});
};

module.exports = recogImage