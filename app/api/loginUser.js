const staffInfo = require("../models/staffInformation");

module.exports = (req, res) => {
  if(req.user.name == null){
    return res.json( { data : {
      status : "Login failed"
    } })
  }else{
    staffInfo.find(
      {
        email: req.user.name,
      },
      (err, data) => {
        if (data.length !=0) {
          return res.json({
            data: {
              status: "Login succesfully",
              id: data[0]._id,
            },
          });
       
        }
        return res.json( { data : {
          status : "Login failed"
        } })
      }
    );
  }
  
};
