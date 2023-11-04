const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient
const {userValidation} = require('../../lib/validations')

const userSignup = async (req, res) => {

    try {
        const {userName,email,password,role} = req.body

        // Validate data before it is added to the database
        const {error} = userValidation(req.body);
        if(error) {
            return res.status(400).json({ message:error.details[0].message});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

    
        const user =  await prisma.user.create({

            data:{
                userName: userName.trim(),
                email: email.trim(),
                password: hashedPassword,
                role: role.trim()
            }
              
        })
        res.status(201).json(user) 
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"failed to register user"}) 
        
    }
    

}

module.exports = {userSignup}