const Report = require("../models/report")

module.exports = (req,res) => {
    let id = req.query.deleteReport;
    // console.log(id);
    let m, n,id2;

    
    Report.find((error,reports) => {
      if (error){
        console.log("Lỗi tìm kiếm, đối tượng tìm kiếm không tồn tại!");
        res.render("reportInformation");
      }
      console.log("ở đây");
      // console.log(reports);
      // Duyệt từng tập báo cáo của nhân viên
      function takeId() {
        for (let i = 0; i < reports.length; i++ ){
          if (reports[i].reportDetails.length !== 0) {
            for (let j = 0; j < reports[i].reportDetails.length; j++) {
              if (reports[i].reportDetails[j].id === undefined){
                console.log("id không tồn tại");
              } else {
                if (reports[i].reportDetails[j].id === id) {
                  m = i; n = j;
                  id2 = reports[i].id;
                  console.log(id2);
                  // return id2 = reports[i].id;
                  Report.findById(id2, (error,rep)=>{
                    if (error){
                      console.log("lỗi");
                    }
                    console.log("-----");
                    console.log(rep);
                    console.log("-----");
                    console.log(id2);
                    console.log(n);
                    console.log(rep.reportDetails[n]);
                    rep.reportDetails[n].remove();
                    rep.save();
                    return res.redirect('/admin/report-information');
                  })
                }
              }
            }
          }
        }
      }
      takeId();
      console.log("id2");
      
    })
    
    
    // console.log(id2);
    // let id3 = id2;
    // console.log(id2);


    // res.reload(); 
    // res.redirect('back');
    // res.redirect('/admin/report-information');
    // return console.log("deleted");
}