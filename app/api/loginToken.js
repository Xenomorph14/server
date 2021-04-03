const jwt = require("jsonwebtoken")
const staffInfo = require("../models/staffInformation")
const bcrypt = require("bcrypt")
module.exports = (req, res) => {
        //Authenticate user
        const dataUser = JSON.parse(Object.keys(req.body)[0]);
        const { username, password } = dataUser;
        staffInfo.findOne({ email: username }, (error, user) => {
        if (user) {
          console.log(user);
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                  const userInfo = { name: user.email };
                  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "60m",
                  });
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




