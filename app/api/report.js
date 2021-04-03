const Report = require("../models/report")
const express = require("express")
const router = express.Router()

router.get("/:id", (req, res) => {
    const id = req.params.id
    Report.findById(id, (err, report) => {
        if (!err) {
            res.json({ data : report })
        }
    })
    res.json({ data : { status : "Can not get report" } })
})

module.exports = router
