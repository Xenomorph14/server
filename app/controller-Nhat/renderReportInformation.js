const Report = require("../models/report");


module.exports = (req,res) => {
    Report.find({}, function (err,report) {
      res.render("reportInformation", {
        reportLists: report,
      })
    })
  }