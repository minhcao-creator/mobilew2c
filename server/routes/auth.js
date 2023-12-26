const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')
const UserController = require('../controllers/user')

// @route GET /auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, UserController.getUser)

// @route POST /auth/register
// @desc Register user
// @access Public
router.post('/register', UserController.register)

// @route POST /auth/login
// @desc Login user
// @access Public
router.post('/login', UserController.login)

router.put('/', verifyToken, UserController.editProfile)

module.exports = router
