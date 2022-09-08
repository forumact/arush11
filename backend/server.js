const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// const setCurrentUser  = require('./middleware/checkuser');
const session = require("express-session");
const flash = require("connect-flash");
var _ = require("lodash");
const chalk = require("chalk");
require("dotenv").config();
const ejs = require("ejs");
// var db = require('./db');
// var db = require('./database/db')

var cors = require('cors');


const StartServer = async () => {
  const { databaseConnection } = require("./database");
  await databaseConnection();

  const log = console.log;
  // import the routes
  const routes = require("./routes/frontendRoutes");
  // import the API routes
  const apiroutes = require("./routes/apiRoutes");
  // import the Backend routes
  const backendroutes = require("./routes/backendRoutes");
  const testapiroutes = require("./routes/testapiRoutes");

  const demoroutes = require("./routes/demoRoutes")
  const app = express();
  app.use(cors());
  //Cookie Definition
  app.use(cookieParser());
  //Session Definition
  app.use(
    session({
      secret: "flashblog",
      saveUninitialized: true,
      resave: true,
    })
  );
  // Flash message
  app.use(flash());
  // Set Template Engine
  app.use(expressLayouts);
  app.set("layout", "./layouts/full-width");
  app.set("view engine", "ejs");
  //Local message
  app.use(function (req, res, next) {
    res.locals.message = req.flash();
    next();
  });
  // Static Files
  app.use("/static", express.static(__dirname + "/public"));
  //json Parser
  app.use(express.json());
  //body Parser
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  //body Parser
  app.use(bodyParser.json());
  // Routes
  app.use("/", routes); //to use the routes
  app.use("/api", apiroutes); //to use the routes
  app.use("/testapi", testapiroutes); //to use the routes
  app.use("/admin", backendroutes); //to use the routes
  app.use("/demo", demoroutes); //to use the routes

  // app.get('*', setCurrentUser);
  // Page not found
  app.get("*", function (req, res) {
    res.render("404");
  });
  // Server message
  app
    .listen(process.env.PORT || 5000, () => {
      log(chalk.cyan(`Welcome to the RA11 on port  ${process.env.PORT}`));
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
