
const { env } = require("shelljs")
const Event = require("../models/event")
const { convert } = require("../utils/dateFormat")

module.exports = (req, res) => {
    

    Event.find({}, (err, event) =>{
        if(err) {
            res.json({data : {status : "Cannot access event"}})
        }
        for( let i= 0; i< event.length; i++) {
            event[i].date = convert(event[i].date)
        }
        res.json({ event })
    })
}

// { data : {
//     date : convert.toLocaleDateString(),
//     name : event.name,
//     position : event.position
// } }