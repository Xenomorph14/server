const StaffInformation = require("../models/staffInformation")

module.exports = (req,res) => {
    StaffInformation.find({}, function (err,user) {
      res.render("userInformation", {
        userList: user,
      })
    })
}