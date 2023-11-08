const dotenv = require('dotenv')
dotenv.config()
const { auth } = require('express-openid-connect');

 
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.auth2_Secret,
  baseURL: 'http://localhost:8080',
  clientID: process.env.auth2ClientID,
  issuerBaseURL: process.env.issuerBaseURL 
};

 



module.exports = config