//* This file has all the routes regarding the Expenses

// Require our model:
const Expenses = require("../models/Expense.model")

// Require express and create router:
const router = require("express").Router();

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated")

//* All the the CRUD routes.



// Export router:
module.exports = router;