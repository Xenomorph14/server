const Events = require("../models/event")

module.exports = (req,res) => {
    var id = req.query.deleteEvent;
    Events.findByIdAndDelete(id, (err,event) => {
        if (err){
          console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
          res.render("event");
        }
        res.redirect('/admin/event-information');
        return console.log("deleted");
    })
}