const staffInfo = require("../models/staffInformation")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const e = require("cors")
router.post("/:id", (req, res) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    let id = req.params.id
    const data = JSON.parse(Object.keys(req.body)[0])
    const newPassword = data.newPassword.trim()
    const currentPassword = data.currentPassword.trim()
    if(newPassword === currentPassword ){
      return   res.json({ data: { status: "New password is same your current password" } })
    }
    if(newPassword.length < 6){
      return  res.json({ data: { status: "New password is invalid" } })
    }
    staffInfo.findById(id, (err, staff) => {
        const exactPass = staff.password
        bcrypt.compare(currentPassword, exactPass, (error, same) => {
            if (same) {
                bcrypt.hash(newPassword, 10, (err, hash) => {
                        if (!err) {
                        staffInfo.findByIdAndUpdate(id, { password: hash, token : "" }, (err, staff) => {})
                          return  res.json({ data: { status: "Change password successfully" } })
                        }
                })
            }else{
               return res.json({ data: { status: "Current password is incorrectly" } })
            }
        })
    })
}
)

module.exports = router

