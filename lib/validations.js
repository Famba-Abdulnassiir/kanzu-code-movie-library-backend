const Joi = require('joi')


const userValidation =  (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(50).required(),
        role: Joi.string().optional()
    });

    return schema.validate(data);

};

const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(50).required()
    });

    return schema.validate(data)

}

const movieValidation =(data) => {
    const schema = Joi.object ({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().required(),
        releaseYear: Joi.number().min(1800).max(2023).required(), 
        director:  Joi.string().min(3).max(50).required(),
        rating:  Joi.number().min(1).max(100).required(),
        imageUrl: Joi.string().optional(), 
        trailorUrl: Joi.string().optional(),
    })

    return schema.validate(data);
}
module.exports = {userValidation, loginValidation, movieValidation};