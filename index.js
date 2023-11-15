const express = require ('express');
const app = express();
const movieRoute = require('./v1/routes/movie');
const userRoute = require('./v1/routes/user');
const authUser = require('./v1/routes/auth');
const { auth } = require('express-openid-connect');
const config = require('./config/googleAuth');
const cors = require('cors')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });

app.use('/api/v1/movies', movieRoute);
app.use ('/api/v1/users/signup',userRoute)
app.use('/api/v1/auth/login',authUser);


app.use("*", (req,res)=> {
    res.status(404).json({message:"Route not Found try api/v1/movies to navigate to home page."})
})

const PORT = 8080 || process.env.PORT;
app.listen(PORT,() => {
    console.log(`App is running at http://localhost:${PORT}`)
})