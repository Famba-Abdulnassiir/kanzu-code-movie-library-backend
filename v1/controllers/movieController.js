const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


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
    const movie = await prisma.movie.create({
        data:req.body
    })
    console.log(req.body)
    res.status(201).json({message:"Record Successfully created", movie})
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



module.exports = {getAllMovies, getMovieById,createMovie,updateMovie,deleteMovieById}