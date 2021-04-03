const staffInfo = require("../models/staffInformation")
const convertDate = require("../utils/convertDate")
const express = require("express")
const router = express.Router()
const { convert } = require("../utils/dateFormat")

router.get("/:id", (req, res) =>{
    let id = req.params.id
    staffInfo.findById(id, (err, staffInfo ) => {
        res.json({  staffInfo : {
            name : staffInfo.name,
            birthday : convert(staffInfo.birthday),
            phonenumber : staffInfo.phonenumber,
            position : staffInfo.position,
            department : staffInfo.department,
            email:staffInfo.email  
          } })
    })
})

module.exports = router