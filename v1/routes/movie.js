const express = require('express');
const route = express.Router();

const {authenticate}= require('../../middleware/authenticate')
const {getAllMovies, getMovieById,createMovie,updateMovie,deleteMovieById,upload, postImage} = require('../controllers/movieController')


route.get('/',getAllMovies);
route.get('/:id',getMovieById);
route.post('/uploadImage',authenticate, upload.single('imageUrl'), postImage);
route.post('/',authenticate, createMovie);
route.put('/:id', authenticate, updateMovie);
route.delete('/:id',authenticate,deleteMovieById);




module.exports = route;