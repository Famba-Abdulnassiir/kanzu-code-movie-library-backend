const express = require('express');
const route = express.Router();

const {authenticate}= require('../../middleware/authenticate')
const {getAllMovies, getMovieById,createMovie,updateMovie,deleteMovieById,upload} = require('../controllers/movieController')


route.get('/',getAllMovies);
route.get('/:id',getMovieById);
route.post('/', authenticate,upload.single('imageUrl'), createMovie);
route.put('/:id', authenticate, updateMovie);
route.delete('/:id',authenticate,deleteMovieById);




module.exports = route;