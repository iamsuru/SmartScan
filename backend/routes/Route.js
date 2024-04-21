const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.post('/isTokenExpired', UserController.isTokenExpired)
module.exports = router