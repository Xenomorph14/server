const Joi = require("joi")

// validate register
 const authSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name : Joi.string().min(2).required(), 
        birthday: Joi.date().required(),
        position : Joi.string().min(2),
        department : Joi.string().min(2),
        phonenumber : Joi.string().length(10)      
    })

module.exports = { authSchema }