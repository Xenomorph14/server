const Report = require("../models/report");
const StaffInformation = require("../models/staffInformation");

module.exports = (req,res) => {
    Report.find({}, function (err,report) {
      res.render("reportInformation", {
        reportLists: report,
      })
    })
  }