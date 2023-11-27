const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const { unlink } = require('fs');
const cloudinary = require('../../config/cloudinary');
const { movieValidation } = require('../../lib/validations');

const upload = multer({ dest: 'uploads/' });

const postImage = async (req, res) => {
    try {
        const imageUrl = await cloudinary.v2.uploader.upload(req.file.path);
        res.status(200).json({ imageUrl });
        unlink(req.file.path, (err) => {
            if (err) res.json('Failed to delete file');
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({
            include: {
                comments: {},
                genres: { select: { genre: true } },
                orders: {}
            }
        });
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

const getMovieById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const movie = await prisma.movie.findUnique({
            where: { id },
            include: {
                comments: {},
                genres: { select: { genre: true } },
                orders: {}
            }
        });
        if (movie) return res.status(200).json({ movie });
        return res.status(404).json({ message: `No movie with id ${id}` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createMovie = async (req, res) => {
    try {
        const { title, description, releaseYear, genre, director, rating, imageUrl, trailorUrl } = req.body;
        const { error } = movieValidation(req.body);

        if (error) return res.status(400).json({ message: error.details[0].message });

        if (!title || !description || !releaseYear) {
            return res.status(400).json({ message: 'Title, description, and release year are required fields' });
        }

        const movie = await prisma.movie.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                releaseYear: parseInt(releaseYear),
                genre,
                director,
                rating: parseInt(rating),
                imageUrl,
                // trailorUrl: trailorUrl.trim()
            }
        });

        res.status(201).json({ message: 'Record Successfully created', movie });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to create movie' });
    }
};

const updateMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const movie = await prisma.movie.findUnique({ where: { id } });

        if (!movie) return res.status(404).json({ message: `No movie with id ${id}` });

        const updatedMovie = await prisma.movie.update({
            where: { id },
            data: req.body
        });

        return res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
};

const deleteMovieById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const movie = await prisma.movie.findUnique({ where: { id } });

        if (!movie) return res.status(404).json({ message: `No movie with id ${id}` });

        await prisma.movie.delete({ where: { id } });

        return res.status(200).json({ message: 'Record Successfully Deleted' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovieById, upload, postImage };

