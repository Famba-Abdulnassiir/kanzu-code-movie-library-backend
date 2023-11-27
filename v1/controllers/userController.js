const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient
const { userValidation } = require('../../lib/validations')

const userSignup = async (req, res) => {

    try {
        const { userName, email, password, role } = req.body

        // Validate data before it is added to the database
        const { error } = userValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userExists) return res.status(422).json({ message: "User already exists" })

        const user = await prisma.user.create({

            data: {
                userName: userName.trim(),
                email: email.trim(),
                password: hashedPassword,
                // role: role.trim()
            }

        })
        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "failed to register user" })

    }

}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({})
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
            id
        },

    })
    if (user) return res.status(200).json({ user })
    return res.status(401).json({ message: `No User with that id ${id} is Found` })

}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (user) {
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: req.body
        })
        return res.status(200).json(updatedUser)
    } else
        return res.status(401).json({ message: `No User with that id ${id} was found` })

}

const deleteUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (user) {
        const deleteduser = await prisma.user.delete({
            where: {
                id
            }
        })
        return res.status(200).json({ message: `Record Successfully Deleted` })
    } else
        return res.status(401).json({ message: `No User with that id ${id} was Found` })

}


module.exports = { userSignup, getAllUsers, getUserById, updateUser, deleteUserById }