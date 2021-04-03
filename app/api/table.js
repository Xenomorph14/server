
const Table = require('../models/tableOfWork')
const express = require("express")
const router = express.Router()

router.get("/:id", (req, res) => {
    const id = req.params.id
    Table.findById(id, (err, table) => {
        if (!err) {
            res.json({table})
        }
    })
})

module.exports = router