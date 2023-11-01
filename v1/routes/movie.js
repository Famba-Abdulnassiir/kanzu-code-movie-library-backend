const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController')

//Get all movies
router.get('/', movieController.getAllMovies);

module.exports = router;