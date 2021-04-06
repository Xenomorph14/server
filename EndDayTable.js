const express = require("express");
const { cat } = require("shelljs");
const app = express();
const router = express.Router()
const Status = require("./app/models/status")
const Table = require("./app/models/tableOfWork")


router.post("/admin/endDay", (req, res) =>{
    try{
        Status.find({}, (err, status) => {
            status.forEach(element => {
                        Table.findByIdAndUpdate(element._id, {
                        $push : { "dateDetails" : {
                            timeStart : element.timeStart,
                            timeEnd : element.timeEnd,
                            statusDay : element.statusDay,
                            date : Date.now()
                           
                        }}
                    },
                    {safe: true, upsert: true, new : true},
                    (err, table) => {
                        
                    })
            });
        })
    }catch (err) {

    }
})

module.exports = router




