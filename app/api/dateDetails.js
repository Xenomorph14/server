
const table = require("../models/tableOfWork")
const express = require("express")
const router = express.Router()

router.get("/:id", (req, res) => {
    const id = req.params.id;
    table.findById(id, (err, table) => {
        res.json({ data : {
            timeStart : table.timeStart,
            timeEnd : table.timeEnd,
            statusDay : table.statusDay,
            date : table.Date
        }})
    })
})