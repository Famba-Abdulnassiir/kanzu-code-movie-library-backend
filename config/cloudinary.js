
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    shorten: true,
    secure: true,
    ssl_detected: true
})

module.exports = cloudinary;