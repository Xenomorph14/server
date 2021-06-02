const mongoose = require("mongoose")
const Event = require("../models/event")
const flash = require("express-flash")
const { authSchema } = require("../../middleware/checkFormEvent")


module.exports =async (req, res, next) => {
    try{
        // console.log(req.body);
        const result = await authSchema.validateAsync(req.body);
        let date = req.body.date.toString();
        date = date.toString();
        let arrayBirthday = date.split("-");
        date = "";
            for(let i=0; i<arrayBirthday.length; i++){
                if (arrayBirthday.length-i-1 !== 0){
                    date += arrayBirthday[arrayBirthday.length-i-1] + "-";
                } else {
                    date += arrayBirthday[arrayBirthday.length-i-1];
                }
            }
        result.date = date;
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