const express = require('express');
const router = express.Router();
const {authenticate}= require('../../middleware/authenticate')

const {getAllComments, createComment,deleteCommentById, updateComment} = require('../controllers/commentsController')


router.get('/',authenticate,getAllComments);
router.post('/',authenticate,createComment);
router.put('/:id',authenticate,updateComment);
router.delete('/:id',authenticate,deleteCommentById);



module.exports = router;