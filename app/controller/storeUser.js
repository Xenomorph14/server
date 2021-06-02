const StaffInformation = require ("../models/staffInformation")
const Status = require( "../models/status" )
const TableOfWork = require ("../models/tableOfWork")
const Report = require("../models/report") 
const bcrypt = require("bcrypt")
const { authSchema } = require("../../middleware/checkFormRegister")

const flash = require('express-flash')

module.exports = async (req, res, next) => {
   try{
     //validate newmember
     const result = await authSchema.validateAsync(req.body)
     // convert birthday
     let birthday = req.body.birthday.toString();
     birthday = birthday.toString();
     let arrayBirthday = birthday.split("-");
     birthday = "";
     for(let i=0; i<arrayBirthday.length; i++){
          if (arrayBirthday.length-i-1 !== 0){
               birthday += arrayBirthday[arrayBirthday.length-i-1] + "-";
          } else {
               birthday += arrayBirthday[arrayBirthday.length-i-1];
          }
     }
     result.birthday = birthday;
     //Check email exist
     const emailExist = await StaffInformation.findOne({ email: req.body.email })
     if (emailExist)  {
          req.flash('createUserFailed', "Email hasbeen created")
          res.redirect("/admin/createUser").end()
     }
     //Create new user
     const newStaff = new StaffInformation(result)
     const saveStaff = await newStaff.save()

 //Create  new status
      
      Status.create({ 
       _id : saveStaff._id,
       timeLocation : []
      }, (err, status ) => {
            console.log(err,status);
       }) 

//Create new table
       TableOfWork.create({
      _id : saveStaff._id,
       }, (err, table) =>{
            console.log(err, table);
       })
//Create report
       Report.create({
          _id : saveStaff._id,
       }, (err, report) => {
            console.log(err, report);
       })

   }catch(err){
        if (err.isJoi === true ) {
          req.flash('createUserFailed', `${err}`);
          res.redirect("/admin/createUser")
        } 
        next()   
     } 
req.flash('createUserSuccess'," Create successfully")     
 res.redirect("/admin/createUser")
}
