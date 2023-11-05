const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const cloudinary = require('cloudinary');
const {unlink} = require('fs');

const upload = multer({dest: "uploads/"});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    shorten: true,
    secure: true,
    ssl_detected: true
})

const getAllMovies = async (req, res) =>{
    try {
        const movies = await prisma.movie.findMany({})
        res.status(200).json(movies)        
    } catch (error) {
        res.status(400).json({message:'Bad Request'})        
    }
   
}

const getMovieById = async (req, res) =>{
    const id = parseInt(req.params.id)
    const movie = await prisma.movie.findUnique({
        where:{
            id
        }
    })
    if(movie) return res.status(200).json({movie})
    return  res.status(401).json({message:`No movie with that id ${id}`})
    
}

const createMovie = async  (req, res) =>{
    try {
        const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);
        const {title,description,releaseYear,genre,director,rating,imageUrl} = req.body;
        

        if (!title || !description || !releaseYear) {
            return res.status(400).json({ message: "Title, description, and release year are required fields" });
        }

        const movie = await prisma.movie.create({
            data:{
                title: title.trim(),
                description: description.trim(),
                releaseYear:releaseYear,
                genre:genre,
                director:director,
                rating:parseInt(rating),
                imageUrl:uploadedImage.secure_url
            }
        })
    
        // delete file from uploads folder
        unlink(req.file.path,(err)=>{
            if(err) return res.json('failed to delete file');
        });

        res.status(201).json({message:"Record Successfully created", movie})
        
    } catch (error) {
        console.log(error)
    }
    
}

const updateMovie = async (req, res) =>{
    const id = parseInt(req.params.id)
    const movie = await prisma.movie.findUnique({
        where:{
            id
        }
    })
    if(movie){
        const updateMovie = await prisma.movie.update({
            where:{
                id
            },
            data:req.body
        })
        return  res.status(200).json(updateMovie)
    } else
    return  res.status(401).json({message:`No movie with that id ${id}`})
    
}

const deleteMovieById = async (req, res) =>{
    const id = parseInt(req.params.id)
    const movie = await prisma.movie.findUnique({
        where:{
            id
        }
    })
    if(movie){
        const deleteMovie = await prisma.movie.delete({
            where:{
                id
            }
        })
        return  res.status(200).json({message:`Record Successfully Deleted`})
    } else
    return  res.status(401).json({message:`No movie with that id ${id}`})
    
}



module.exports = {getAllMovies, getMovieById,createMovie,updateMovie,deleteMovieById,upload}