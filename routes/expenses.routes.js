//* This file has all the routes regarding the Expenses

// Require our model:
const Expense = require("../models/Expense.model");

// Require express and create router:
const router = require("express").Router();

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated");


//* All the the CRUD routes.
// GET "/api/expenses" => Get all Expenses:
router.get("/", isAuthenticated, async (req, res, next) => {
    // console.log("Testing")
    try {
        // Get the user id from the payload from the isAuthenticated middleware:
        const userId = req.payload._id;
        // Get all the Expenses from our DB:
        const response = await Expense.find({creator: userId})
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// POST "/api/expenses/create" => Creates new Expense:
router.post("/create", isAuthenticated, async (req, res, next) => {
    // console.log("Testing create an expense");
    // Get variables from the req.body:
    // console.log(req.body);
    const {name, price, location, geoLocation} = req.body
    
    //*  Validation:
    // name and price fields must not be empty:
    if (!name || !price) {
        // Let's send an error:
        res.status(400).json({ errorMessage: "Name and price are mandatory" });
        // Stop the execution of the route:
        return;
    }
    
    try {
        // Get the user id from the payload from the isAuthenticated middleware:
        const userId = req.payload._id;
        // console.log(userId);
        // Create an Expense object:
        const newExpense = {
            name,
            price,
            location,
            geoLocation,
            creator: userId
        }
        // Create a new Expense:
        await Expense.create(newExpense)
        res.json("Document created")
    } catch(error) {
        next(error)
    }
})

// GET "/api/expenses/:expenseId" => Get the details of an Expense by its Id:
router.get("/:expenseId", isAuthenticated, async (req, res, next) => {
    // console.log(req.params)
    const {expenseId} = req.params

    try {
        // Search the Db for an Expense with that Id:
        const response = await Expense.findById(expenseId)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/expenses/:expenseId" => Delete an Expense by its Id:
router.delete("/:expenseId", isAuthenticated, async (req, res, next) => {
    // console.log("Testing expense delete")
    const {expenseId} = req.params;
    try {
        // Find by Id and delete:
        await Expense.findByIdAndDelete(expenseId)
        res.json("Document deleted")
    } catch (error) {
        next(error)
    }
})

// PUT "/api/expenses/:expenseId" => Gets data from an Expense and edits it:
router.put("/:expenseId", isAuthenticated, async (req, res, next) => {
    // console.log("Testing expense edit");
    const {expenseId} = req.params
    const {name, price, location, geoLocation} = req.body

    // Validation:
    if (!name || !price) {
        // If name and price fields are empty, let's send an error:
        res.status(400).json({ errorMessage: "Name and price are mandatory" });
        // Stop the execution of the route:
        return;
    }
    try {
        // Update the specific expense:
        const response = await Expense.findByIdAndUpdate(expenseId, {
            name,
            price,
            location,
            geoLocation
        }, {new:true})
        // Check if we could update the Expense:
        if (response) {
            res.json(response)
        } else {
            res.json("Expense not found (and not updated)")
        }
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/expenses" => Deletes all expenses:
router.delete("/", isAuthenticated, async (req, res, next) => {
    try {
        await Expense.deleteMany({})
        res.json("All documents deleted")
    } catch (error) {
        next(error)
    }
})

// Export router:
module.exports = router;