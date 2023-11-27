const express = require('express');
const router = express.Router();
const {authenticate}= require('../../middleware/authenticate')

const {userSignup,getAllUsers, getUserById, updateUser, deleteUserById }= require('../controllers/userController')


router.get('/:id',authenticate,getUserById);
router.get('/',authenticate,getAllUsers);
router.put('/:id',authenticate,updateUser);
router.delete('/:id',authenticate,deleteUserById);
router.post('/signup',userSignup);


module.exports = router;