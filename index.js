const express = require ('express');
const app = express();
const movieRoute = require('.//v1/routes/movie');

app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/movies', movieRoute);

const PORT = 8080 || process.env.PORT;
app.listen(PORT,() => {
    console.log(`App is running at http://localhost:${PORT}`)
})