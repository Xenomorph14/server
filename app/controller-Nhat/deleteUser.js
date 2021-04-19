const StaffInformation = require("../models/staffInformation")
const Status  = require("../models/status");
const Table = require("../models/tableOfWork")
const Report = require("../models/report");

module.exports = (req,res) => {
  var id = req.query.deleteUser;
  StaffInformation.findByIdAndDelete(id, (err,member) => {
      if (err){
        console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
        res.render("userInformation");
      }
      console.log("aaaa");
      // res.redirect('/admin/user-information');
      return console.log("deleted");
  })
  Status.findByIdAndDelete(id, (err,member) => {
    if (err){
      console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
      res.render("userInformation");
    }
    console.log("aaaa");
    // res.redirect('/admin/user-information');
    return console.log("deleted");
  })
  Table.findByIdAndDelete(id, (err,member) => {
    if (err){
      console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
      res.render("userInformation");
    }
    console.log("aaaa");
    res.redirect('/admin/user-information');
    return console.log("deleted");
  })
  Report.findByIdAndDelete(id, (err,member) => {
    if (err){
      console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
      res.render("userInformation");
    }
    console.log("aaaa");
    res.redirect('/admin/user-information');
    return console.log("deleted");
  })
}