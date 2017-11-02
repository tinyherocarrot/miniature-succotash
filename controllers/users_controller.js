// Node Dependencies
// ----------------------------------------------------
var express = require("express");
var router = express.Router();

var models = require('../models'); // All Models


// Extracts the sequelize connection from the models object
var sequelizeConnection = models.sequelize;

// Sync the tables
sequelizeConnection.sync();


// Routes
// ----------------------------------------------------

// Index Redirect
router.get("/", function(req, res) {
  res.redirect("/users");
});

// Index Page
router.get("/users", function(req, res) {
  // Sequelize Query to get all users from database
  models.users.findAll({}).then(function(data){
    // Wrapping the array of returned users in a object so it can be referenced inside our handlebars
    var userObject = { users: data };
    res.render("index", userObject);
  });
});

module.exports = router;
