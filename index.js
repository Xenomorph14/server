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
const createEvent = require("./app/controller/createEvent")
const event = require("./app/api/event")
const userTable = require("./app/api/table")
const storeEvent = require("./app/controller/storeEvent")
const updateUser = require("./app/controller/updateUser")
const storeUpdateUser = require("./app/controller/storeUpdateUser")
const storeReport = require("./app/api/storeReport")
const userReport = require("./app/api/report")
//Model
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
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
app.post("/loginToken", loginToken );
app.get("/admin/createEvent", checkAuthenticated, createEvent)
app.post("/admin/storeEvent", storeEvent)
// app.post("/admin/endStatus", endStatus)
app.get("/admin/updateUser", updateUser)
app.get("/admin/storeUpdateUser", storeUpdateUser)

//Api
app.use("/location", authenticateToken ,location)
app.use("/storeTimeLine", authenticateToken , storeTimeLine)
app.use("/userInfo",authenticateToken ,userInfo)
app.get("/user/login", authenticateToken, loginUser )
app.get("/event", authenticateToken , event)
app.use("/table", authenticateToken ,userTable)
app.use("/user/report",authenticateToken , userReport)
app.use("/user/storeReport",authenticateToken , storeReport)
// app.post("/admin/endTable", endTable)

// const cron = require("node-cron")
// const shell = require("shelljs")
// cron.schedule("*/5 * * * * * *", function () {
//     if (shell.exec("node autoEndDayTable.js ").code !== 0) {
//         console.log("finish");
//     }
// })

//App listen
const port = process.env.PORT || 3000;
app.listen(port , () => {
  console.log(`Listening on http://localhost:${port}/`);
});
