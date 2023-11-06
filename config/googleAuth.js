const { auth } = require('express-openid-connect');
const dotenv = require('dotenv')
dotenv.config()
 
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: auth2_Secret ,
  baseURL: 'http://localhost:8080',
  clientID: auth2ClientID,
  issuerBaseURL: issuerBaseURL 
};

 



module.exports = config