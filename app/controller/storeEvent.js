const mongoose = require("mongoose")
const Event = require("../models/event")
const flash = require("express-flash")
const { authSchema } = require("../../middleware/checkFormEvent")


module.exports =async (req, res, next) => {
    try{
        const result = await authSchema.validateAsync(req.body)
        console.log(req.body.date);
        const newEvent = new Event(result)
        const saveEvent = await newEvent.save()
        req.flash('create', "Create successfully")
        res.redirect("/admin/createEvent")

    }catch(err){
        if (err.isJoi === true ) {
            req.flash('createFailed', `${err}`);
            res.redirect("/admin/createEvent")
        }
                next()
    }
}

// else{
//     req.flash('createFailed', "Cannot create");
//     res.redirect("/admin/createEvent")
// }    

