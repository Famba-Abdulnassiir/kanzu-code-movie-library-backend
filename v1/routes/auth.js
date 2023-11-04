const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController')

route.post('/', authController.loginUser);

module.exports = route;