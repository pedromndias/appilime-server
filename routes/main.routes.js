//* This file has all the routes regarding the Main page

// Require our model:
const User = require("../models/User.model");

// Require express and create router:
const router = require("express").Router();

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/api/main" => Shows the mood of a user


// PUT "/api/main" => Gets the mood and updates it in the User (and changes theme)

// Export router:
module.exports = router;