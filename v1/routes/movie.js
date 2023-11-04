const express = require('express');
const route = express.Router();

const {authenticate}= require('../../middleware/authenticate')
const movieController = require('../controllers/movieController')


route.get('/', movieController.getAllMovies);
route.get('/:id',movieController.getMovieById);
route.post('/', authenticate, movieController.createMovie);
route.put('/:id', authenticate, movieController.updateMovie);
route.delete('/:id',authenticate, movieController.deleteMovieById);




module.exports = route;