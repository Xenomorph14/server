const StaffInformation = require('../models/staffInformation')
//search member by email
module.exports = (req, res) => {
    var email = req.query.search;
    StaffInformation.find((err,members) => {
      if (err){
        console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
        res.render("userInformation");
      }
      var data = members.filter(function(item){
        return item.email === email
      });
      let id = data[0].id;
      StaffInformation.findById(id, (err,member) => {
        if (err){
          console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
          res.render("userInformation");
        }
        res.render('user', {
          user: member
        });
      })
    })
  }