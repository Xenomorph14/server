
const Event = require("../models/event")

module.exports = (req, res) => {
    Event.find({}, (err, event) =>{
        if(err) {
            res.json({data : {status : "Cannot access event"}})
        }
        res.json( {event})
    })
}

