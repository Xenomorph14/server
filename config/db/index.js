const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://pastetu:111122223333@cluster0.ngzva.mongodb.net/hrmdatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('useFindAndModify', false);
    // mongoose.connect(uri, { useFindAndModify: false });
    console.log("Connect succesfully!!");
  } catch (error) {
    console.log("Connect failure!!!!");
  }
}

module.exports = { connect };
