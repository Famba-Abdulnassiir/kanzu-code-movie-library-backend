const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = async (req, res, next) =>{
    const header = req.headers["authorization"];
    
    if(!header){
        return res.status(401).json({error:"Not authorized to access this resource" });
    }

    const token = header.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) return res.status(403).json({error:"Invalid token"})
        next();
        return
    })
}

module.exports = {authenticate};