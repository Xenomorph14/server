const jwt = require("jsonwebtoken")
const staffInfo = require("../models/staffInformation")
const bcrypt = require("bcrypt")
const Staff = require("../models/staffInformation")
module.exports = (req, res) => {
        //Authenticate user
        const dataUser = JSON.parse(Object.keys(req.body)[0]);
        const { username, password } = dataUser;
        staffInfo.findOne({ email: username }, (error, user) => {
        if (user) {
          // console.log(user);
          var id = user.id
          console.log(id + "''''''''''''''''");
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                  const userInfo = { name: user.email };
                  const accessToken = jwt.sign(userInfo, "a739fda1902a8fa888e2105470e2d96c77bdfb8610456e34d27040491feacad4323b9b4e5df23c795e7a5f6c833bd49017048b1dff022d8f5509dc7b590ffa96", {
                    expiresIn: "60m",
                  });
                  
                Staff.findByIdAndUpdate(id, { token : accessToken }, (err, staff) => {
                  console.log(err);
                })
                 return res.json({ accessToken: accessToken })
                } else {
                    res.json({data : {status: "Wrong password"}})
                }
            })
        } else {
              res.json({data : {status: "Wrong Email"}})
        }
    })
}




