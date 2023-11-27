const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


const getAllComments = async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany({})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}


const createComment = async (req, res) => {
    try {
        const { movieId, userId, content } = req.body;
        if (!movieId || !userId || !content) {
            return res.status(400).json({ message: "MovieId, userId and content are required fields" });
        }

        const comment = await prisma.comment.create({
            data: {
                movieId: movieId,
                userId: userId,
                content: content.trim()
            }
        })
        res.status(201).json({ message: "Record Successfully created", comment })
    } catch (error) {
        console.log(error)
    }

}

const updateComment = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const userId = req.body.userId;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id },
        });

        if (!comment) {
            return res.status(404).json({ message: `No comment with id ${id} was found` });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You are not allowed to update this comment' });
        }

        const updatedComment = await prisma.comment.update({
            where: { id },
            data: req.body,
        });

        return res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
};


const deleteCommentById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const userId = req.body.userId;

    try {
 
        const comment = await prisma.comment.findUnique({
            where: { id },
        });

        if (!comment) {
            return res.status(404).json({ message: `No comment with id ${id} was found` });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You are not allowed to delete this comment' });
        }

        await prisma.comment.delete({
            where: { id },
        });

        return res.status(200).json({ message: 'Record Successfully Deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllComments, createComment, deleteCommentById, updateComment }