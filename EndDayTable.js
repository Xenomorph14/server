// const Table = require("./app/models/tableOfWork")
// const Status = require("./app/models/status")

// const { convertDate } = require("./app/utils/convertDate")

// module.exports = (req, res) => {
//     Status.find({}, (err, status) => {
//         status.forEach(element => {
//                 Table.findByIdAndUpdate(element._id, {
//                     $push : { "dateDetails" : {
//                         timeStart : element.timeStart,
//                         timeEnd : element.timeEnd,
//                         statusDay : element.statusDay,
//                         date : Date.now()
                       
//                     }}
//                 },
//                 {safe: true, upsert: true, new : true},
//                 (err, table) => {
                    
//                 })
//         });
//     })
// }
