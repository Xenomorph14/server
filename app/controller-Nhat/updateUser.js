const { model } = require("mongoose");
const StaffInformation = require("../models/staffInformation");
const bcrypt = require("bcrypt");
// var popupS = require('popups');

module.exports = (req, res) => {
  let id = req.body.id;
  StaffInformation.findById(id, (error, staffInformation) => {
    if (error) {
      res.redirect("/createMember");
      return console.log("Lỗi rồi baby");
    }
    // convert type of birthday
    let newBirthday = req.body.newBirthday;
    newBirthday =
      newBirthday.toString() || staffInformation.birthday.toString();
    let arrayBirthday = newBirthday.split("-");
    newBirthday = "";
    for (let i = 0; i < arrayBirthday.length; i++) {
      if (arrayBirthday.length - i - 1 !== 0) {
        newBirthday += arrayBirthday[arrayBirthday.length - i - 1] + "-";
      } else {
        newBirthday += arrayBirthday[arrayBirthday.length - i - 1];
      }
    }
    // console.log("success");
    // get input information
    let newEmail = req.body.newEmail;
    newEmail = newEmail || staffInformation.email;
    let newPassword = req.body.newPassword;
    newPassword = bcrypt.hashSync(newPassword, 10) || staffInformation.password;
    // newPassword = bcrypt.hashSync(newPassword, 10);
    // console.log(newPassword);
    let newName = req.body.newName;
    newName = newName || staffInformation.name;
    let newPosition = req.body.newPosition;
    newPosition = newPosition.position;
    let newDepartment = req.body.newDepartment;
    newDepartment = newDepartment || staffInformation.department;
    let newPhonenumber = req.body.newPhonenumber;
    newPhonenumber = newPhonenumber || staffInformation.phonenumber;

    // // validate input information
    // switch (newEmail) {
    //   case "":
    //     newEmail = staffInformation.email;
    //     break;
    //   case null:
    //     newEmail = staffInformation.email;
    //     break;
    // }
    // switch (newPassword) {
    //   case "":
    //     newPassword = staffInformation.password;
    //     break;
    //   case null:
    //     newPassword = staffInformation.password;
    //     break;
    // }
    // switch (newName) {
    //   case "":
    //     newName = staffInformation.name;
    //     break;
    //   case null:
    //     newName = staffInformation.name;
    //     break;
    // }
    // switch (newBirthday) {
    //   case "":
    //     newBirthday = staffInformation.birthday;
    //     break;
    //   case null:
    //     newBirthday = staffInformation.birthday;
    //     break;
    // }
    // switch (newPosition) {
    //   case "":
    //     newPosition = staffInformation.position;
    //     break;
    //   case null:
    //     newPosition = staffInformation.position;
    //     break;
    // }
    // switch (newDepartment) {
    //   case "":
    //     newDepartment = staffInformation.department;
    //     break;
    //   case null:
    //     newDepartment = staffInformation.department;
    //     break;
    // }
    // switch (newPhonenumber) {
    //   case "":
    //     newPhonenumber = staffInformation.phonenumber;
    //     break;
    //   case null:
    //     newPhonenumber = staffInformation.phonenumber;
    //     break;
    // }
    StaffInformation.findByIdAndUpdate(
      id,
      {
        email: newEmail,
        password: newPassword,
        name: newName,
        birthday: newBirthday,
        position: newPosition,
        department: newDepartment,
        phonenumber: newPhonenumber,
      },
      { new: true },
      (err, staffInfo) => {
        if (err) {
          console.log("error");
          res.render("updateUser");
        }
        console.log(staffInfo);
        console.log("updated");
        return res.redirect("/admin/user-information");
      }
    );
  });
};
