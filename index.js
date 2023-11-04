const express = require ('express');
const app = express();
const movieRoute = require('./v1/routes/movie');
const userRoute = require('./v1/routes/user');
const authUser = require('./v1/routes/auth')

app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/movies', movieRoute);
app.use ('/users/signup',userRoute)
app.use('/login',authUser);


app.use("*", (req,res)=> {
    res.status(404).json({message:"Route not Found try api/v1/movies to navigate to home page."})
})

const PORT = 8080 || process.env.PORT;
app.listen(PORT,() => {
    console.log(`App is running at http://localhost:${PORT}`)
})