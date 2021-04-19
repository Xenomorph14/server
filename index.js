if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const db = require("./config/db");
const jwt = require("jsonwebtoken");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const initializePassport = require("./passport-config");
const cors = require("cors")
initializePassport(
  passport,
  (uname) => admins.find((admin) => admin.uname === uname),
  (id) => admins.find((admin) => admin.id === id)
);

//Set view engine
// const ejs = require("ejs
app.set("view engine", "ejs");
app.set("views", "views/examples");
app.use(express.static("views"));
//Parser
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// app.use(bodyParser.raw());

app.use(flash());
app.use(
  session({
    secret: '98c00efe44d70207991595b328a8809a9ff45e04459f644b4a0442dcde979f97b20a86365da4fd213e87807138a44296aaeeb0a7b6ec8c9baca3cf181ee31478',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.json());
//Connect Db
db.connect();

//Fake data
const admins = [
  {
    id: "123123",
    uname: "admin",
    psw: "admin",
  },
];

//Controller

// const loginAdmin = require("./app/controller/loginAdmin")
const home = require("./app/controller/loginAdminControl");
const create = require("./app/controller/createUser");
const storeUser = require("./app/controller/storeUser");
const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");
const authenticateToken = require("./middleware/authenticateToken");
const logoutAdmin = require("./app/controller/logoutAdmin");
const loginUser = require("./app/api/loginUser")
const loginToken = require("./app/api/loginToken")
const location = require("./app/api/location")
const userInfo = require("./app/api/userInfo")
const storeTimeLine = require("./app/api/storeTimeLine")
const createEvent1 = require("./app/controller/createEvent")
const aptiEvent = require("./app/api/event")
const userTable = require("./app/api/table")
const storeEvent = require("./app/controller/storeEvent")
const updateUserControl = require("./app/controller/updateUser")
const storeUpdateUser = require("./app/controller/storeUpdateUser")
const storeReport = require("./app/api/storeReport")
const userReport = require("./app/api/report")
//Model

app.use(cors())
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "https://hrmapplication.herokuapp.com/");
  // res.header("Access-Control-Allow-Credentials", "true")
  // res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.get("/admin/login", checkNotAuthenticated, home);
app.get("/admin/createUser", checkAuthenticated, create);
app.post(
  "/admin/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/admin/createUser",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);
app.post("/admin/storeUser", storeUser);
app.get("/admin/logout", logoutAdmin);
app.get("/admin/createEvent", checkAuthenticated, createEvent1)
app.post("/admin/storeEvent", storeEvent)
// app.post("/admin/endStatus", endStatus)
app.get("/admin/updateUser", updateUserControl)
app.get("/admin/storeUpdateUser", storeUpdateUser)

//Api
app.post("/loginToken", loginToken);
app.use("/location", authenticateToken, location)
app.use("/storeTimeLine", authenticateToken, storeTimeLine)
app.use("/userInfo", authenticateToken, userInfo)
app.get("/user/login", authenticateToken, loginUser)
app.get("/event", authenticateToken, aptiEvent)
app.use("/table", authenticateToken, userTable)
app.use("/user/report", authenticateToken, userReport)
app.use("/user/storeReport", authenticateToken, storeReport)


// Cron tab

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
const cron = require("node-cron")
const shell = require("shelljs");
const Status = require("./app/models/status")
const Table = require("./app/models/tableOfWork")
cron.schedule("* */22 * * *", function () {
  Status.find({}, (err, status) => {
    status.forEach(element => {
      Table.findByIdAndUpdate(element._id, {
        $push: {
          "dateDetails": {
            timeStart: element.timeStart,
            timeEnd: element.timeEnd,
            statusDay: element.statusDay,
            date: Date.now()

          }
        }
      },
        { safe: true, upsert: true, new: true },
        (err, table) => {

        })
    });
  })
})

cron.schedule("* */23 * * *", function () {
  Status.updateMany({
    statusDay : "1",
    timeStart : "",
    timeEnd : "",
    timeLine : []
  }, (err, status) => {
      
  })
})


// Nhat add
const Report = require('./app/models/report')
const Events = require('./app/models/event')
const StaffInformation = require('./app/models/staffInformation')

const createEvent = require("./app/controller-Nhat/createEvent")
// const event = require("./app/controller-Nhat/event");
const updateUser = require("./app/controller-Nhat/updateUser");
const updateEvent = require("./app/controller-Nhat/updateEvent");
const renderCreateEvent = require("./app/controller-Nhat/renderCreateEvent");
const renderUpdateUser = require("./app/controller-Nhat/renderUpdateUser");
const renderUpdateEvent = require("./app/controller-Nhat/renderUpdateEvent");
app.get("/admin/updateUser", checkAuthenticated, renderUpdateUser);
app.get("/admin/createEvent", checkAuthenticated, renderCreateEvent);
app.post("/admin/updateUser", checkAuthenticated, updateUser);
app.post("/admin/updateEvent", checkAuthenticated, updateEvent);
// app.post("/admin/createEvent", createEvent);
app.get("/admin/user-information", checkAuthenticated,(req,res) => {
  StaffInformation.find({}, function (err,user) {
    res.render("userInformation", {
      userList: user,
    })
  })
})
app.get("/admin/report-information", checkAuthenticated, (req,res) => {
  Report.find({}, function (err,report) {
    res.render("reportInformation", {
      reportLists: report,
    })
  })
})
app.get("/admin/event-information", checkAuthenticated, (req,res) => {
  Events.find({}, function (err,event) {
    res.render("event", {
      eventList: event,
    })
  })
})
app.get("/admin/update", checkAuthenticated, (req,res) => {
  let idSearch = req.query.searchId;
  console.log(idSearch);
  res.render('updateUser', {
    userInfo: idSearch
  });
})
app.get("/admin/updateEventElement", checkAuthenticated, (req,res) => {
  let idSearch = req.query.searchId;
  console.log(idSearch);
  res.render('updateEvent', {
    eventInfor: idSearch
  });
})
app.get('/admin/searchMember', checkAuthenticated, function(req, res){
  var id = req.query.search;
  StaffInformation.findById(id, (err,member) => {
    res.render('user', {
      user: member
    });
  })
})

app.get('/admin/searchMember', checkAuthenticated, function(req, res){
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
})





//App listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
