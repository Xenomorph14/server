// const mongoose = require("mongoose")
// const Event = require("../models/event")

// module.exports = async (req, res) => {
//     console.log(req.body);
//     // Event.create({
        
//     // }, (err, event) => {
//     //     if (err){
//     //         return res.render("createEvent");
//     //     }
//     //     console.log(event); 
//     // });
//     let newDate = req.body.date.toString();
//     let arrayDate = newDate.split("-");
//     newDate = "";
//     for(let i=0; i<arrayDate.length; i++){
//         if (arrayDate.length-i-1 !== 0){
//             newDate += arrayDate[arrayDate.length-i-1] + "-";
//         } else {
//             newDate += arrayDate[arrayDate.length-i-1];
//         }
//     }
//     req.body.date = newDate;
//     const newStaff = new Event(req.body)
//     const saveStaff = await newStaff.save()
//     res.send(saveStaff)
    
// }

