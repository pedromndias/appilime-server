//* This file has all the routes regarding the Todo's lists

// Require our models:
const List = require("../models/List.model");
const Todo = require("../models/Todo.model")


// Require express and create router:
const router = require("express").Router();


// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated")

//* All the the CRUD routes.
// GET "/api/lists" => Get all Todo Lists
router.get("/", isAuthenticated, async (req, res, next) => {

    // console.log("Testing")
    // res.json("Testing")

    try {
        // Get the user id from the payload from the isAuthenticated middleware:
        const userId = req.payload._id;
        // Get all Todo Lists from our DB:
        const response = await List.find({creator: userId})
        res.json(response);
    } catch (error) {
        next(error)
    }
})

// POST "/api/lists/create" => Gets details of a Todo List from the Frontend and creates a new List on our DB:
router.post("/create", isAuthenticated, async (req, res, next) => {
    //console.log("Testing create todo list")
    // Get the name from the req.body
    const {name} = req.body
    // console.log(name)

    //*  Validation:
    // name field must not be empty:
    if (!name) {
        // Let's send an error:
        res.status(400).json({ errorMessage: "Please write a list name" });
        // Stop the execution of the route:
        return;
    }

    try {
        

        // Get the payload from the isAuthenticated middleware and access the id of the user that is logged in:
        const userId = req.payload._id
        // console.log(req.payload._id)
        const newList = {
            name,
            creator: userId
        }
        // Create a new Todo List:
        await List.create(newList)
        res.json("Document created")

    } catch (error) {
        next(error)
    }
})

// GET "/api/lists/:todoListId" => Sent the Frontend details of a Todo List by its Id:
router.get("/:todoListId", isAuthenticated, async (req, res, next) => {
    // Get the params:
    // console.log(req.params)
    const {todoListId} = req.params
    
    try {
        // Search the DB for a Todo List with that Id:
        const response = await List.findById(todoListId)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/lists/:todoListId" => Deletes a Todo List by its Id:
router.delete("/:todoListId", isAuthenticated, async (req, res, next) => {
    // res.json("Testing delete")
    // Get params:
    const {todoListId} = req.params;
    try {
        // Find by Id and delete:
        await List.findByIdAndDelete(todoListId)
        // Also delete those todos with that list:
        await Todo.deleteMany({list: todoListId})
        res.json("Documents deleted")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/lists/:todoListId" => Gets data from a Todo List and edits it:
router.patch("/:todoListId", isAuthenticated, async (req, res, next) => {
    // Get the params and the req.body:
    const {todoListId} = req.params
    const {name} = req.body
    // console.log(name)
    // console.log(todoListId)
    
    //*  Validation:
    // name field must not be empty:
    if (!name) {
        // Let's send an error:
        res.status(400).json({ errorMessage: "Please write a list name" });
        // Stop the execution of the route:
        return;
    }
    try {
        // Update the specific Todo List with todoListId;
        const response = await List.findByIdAndUpdate(todoListId, {
            name
        }, {new: true})
        // console.log(response)
        // If the id is valid (represents a created List) then we show a success message:
        if (response) {
            res.json("Document updated")
        } else {
            res.json("List not found (and not updated)")
        }
    }
    catch (error) {
        console.log(error);
    }
})

// Export router:
module.exports = router;