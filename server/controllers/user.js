const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

// @route POST api/auth/register
// @desc Register user
// @access Public
const register = async (req, res) => {
	const { username, password, phone, email } = req.body

	// Simple validation
	if (!email || !password || !username)
		return res
			.status(400)
			.json({ success: false, message: 'Missing email and/or password and/or username' })

	try {
		// Check for existing user
		const user = await User.findOne({ email })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Email already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, email, password: hashedPassword, phone })
		await newUser.save()

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			'' + process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

// @route POST api/auth/login
// @desc Login user
// @access Public
const login = async (req, res) => {
	const { email, password } = req.body

	// Simple validation
	if (!email || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing email and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ email })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect email or password' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect email or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			'' + process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

const editProfile = async (req, res) => {
	const { username, password, phone, email } = req.body

	// Simple validation
	if (!email || !password || !username)
		return res
			.status(400)
			.json({ success: false, message: 'Missing email and/or password and/or username' })

	try {
		// Check for existing user
		const currentUser = await User.findOne({ _id: req.userId })
		const user = await User.findOne({ email })
		if (user && JSON.stringify(currentUser) !== JSON.stringify(user)) {
			return res.status(400).json({
				success: false,
				message: 'Email already taken'
			})
		}
		const filter = { _id: req.userId }
		const hashedPassword = await argon2.hash(password)
		const update = { username, email, password: hashedPassword, phone }
		const userNow = await User.findOneAndUpdate(filter, update, { new: true })

		res.json({
			success: true,
			message: 'User updated successfully',
			userNow
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

module.exports = { getUser, login, register, editProfile }
