const Joi = require("joi")
const moment = require("moment")
// validate register
 const authSchema = Joi.object({
        name : Joi.string().min(2).required(), 
        date : Joi.date().min("now"),
        position : Joi.string().min(2),
    })

module.exports = { authSchema }