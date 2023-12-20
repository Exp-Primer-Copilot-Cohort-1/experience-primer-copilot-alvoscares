// Create web server application.
// This file is the entry point for the web server application.
// It creates the Express application, configures it and runs it.

// Load the Express package as a module
const express = require("express");
// Load the path package as a module
const path = require("path");
// Load the body-parser package as a module
const bodyParser = require("body-parser");
// Load the express-handlebars package as a module
const exphbs = require("express-handlebars");
// Load the express-session package as a module
const session = require("express-session");
// Load the express-validator package as a module
const expressValidator = require("express-validator");
// Load the connect-flash package as a module
const flash = require("connect-flash");
// Load the passport package as a module
const passport = require("passport");
// Load the mongoose package as a module
const mongoose = require("mongoose");
// Load the config module
const config = require("./config/database");

// Connect to the database
mongoose.connect(config.database);
// Get the connection status
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});
// Get the connection error
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

// Create the Express application object
const app = express();

// Load the route files
const index = require("./routes/index");
const users = require("./routes/users");

// Load the passport configuration file
require("./config/passport")(passport);

// Set up the view engine
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout: "layout"}));
app.set("view engine", "handlebars");

// Set up the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up the static directory
app.use(express.static(path.join(__dirname, "public")));

// Set up the express-session middleware
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}));

// Set up the passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up the express-validator middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split(".")
    , root = namespace.shift()
    ,


