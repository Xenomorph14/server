const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Event = new Schema({ 
    name : {type: String, require:"true", default:"Mai tang thang quang anh"},
    date : { type: String, require:"true" },
    position : { type : String, require:"true", default:"67/6 Nam du" }
 })

 module.exports = mongoose.model("Event", Event)
