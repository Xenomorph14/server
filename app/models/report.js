const { date } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Report = new Schema ({
    reportDetails : [
        {
            typeReport : {type : String, require:"true"},
            date : {
                dateStart : {type : String},
                dateEnd : {type : String},
            },
            content : {type: String, require:"true" }
        }
    ]
})

module.exports = mongoose.model("Report",Report)