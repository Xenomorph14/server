const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const tableOfWork = new Schema({
    dateDetails : []
})

module.exports = mongoose.model("table_of_work",tableOfWork)