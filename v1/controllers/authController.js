const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const primsa = new PrismaClient();
const jwt = require('jsonwebtoken')
const {loginValidation} = require('../../lib/validations');



const loginUser = async (req, res) => {
 
        const { email, password } = req.body

        //Validate data before proceed to login
        const {error} = loginValidation (req.body)
        if(error){
            return res.status(400).json({ message:error.details[0].message});
        }

        if (!email || !password) {
            res.status(400).json({ Message: "Please Ensure Email and Password Feilds are filled" })
        }

        const userExists = await primsa.user.findFirst({
            where: { email }
        })

        if (!userExists) {
            return res.status(404).json({ message: "User not found Check your Email and try again" })
        }

        try {
                   
            if (await bcrypt.compare(password, userExists.password)) {

                const user = {
                    email:userExists.email,
                    password:userExists.password
                }
                
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1800})
                res.status(200).json({ status:"OK" , access_token:token })

            } else {
                res.status(404).json({ message: "Invalid password" })
            }

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "internal Server Error" })
        }    

}

module.exports = { loginUser }