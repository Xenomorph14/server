const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const moment = require("moment")

const Status = new Schema({
    statusDay : {type: String, default: "1"},
    timeStart : { type:String, default: "" } ,
    timeEnd :  { type:String, default: "" },
    timeLine : []
})

module.exports = mongoose.model("status",Status)