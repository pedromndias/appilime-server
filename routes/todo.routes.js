//* This file has all the routes regarding a single Todo

// Require our model:
const Todo = require("../models/Todo.model")

// Require express and create router:
const router = require("express").Router();

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated")

//* All the the CRUD routes.
// GET "/api/todo/:todoListId" => Get all the Todos with list as this list (todoListId):
router.get("/:todoListId", isAuthenticated, async (req, res, next) => {
    const {todoListId} = req.params

    try {
        const response = await Todo.find({list: todoListId})
        res.json(response)
    } catch (error) {
        next(error)
    }
})


// POST "/api/todo/:todoListId" => Adds a single Todo to the DB and sends it to the Frontend:
router.post("/:todoListId", isAuthenticated, async (req, res, next) => {

    try {
        // res.json("Testing creating a todo")

        // Get the name from the req.body
        const {name} = req.body;
        // Get the params:
        const {todoListId} = req.params;

        // Get the payload from the isAuthenticated middleware and access the id of the user that is logged in:
        const userId = req.payload._id
        console.log(userId);

        const newTodo = {
            name,
            list: todoListId,
            creator: userId
        }
        // Create a new Todo:
        await Todo.create(newTodo)
        res.json("Document created")


    } catch(error) {
        next(error)
    }
})

// PATCH "/api/todo/:todoListId" => Gets the id from a single Todo and changes its isChecked property
router.patch("/:todoId", isAuthenticated, async (req, res, next) => {
    
    const {todoId} = req.params
    const {isChecked} = req.body
    console.log(todoId)
    console.log(isChecked);
    try {
        const response = await Todo.findByIdAndUpdate(todoId, {
            isChecked
        },{new: true})
        res.json(response)

    } catch (error) {
        next(error)
    }
})


// DELETE "/api/todo/:todoListId" => Delete all single Todo that are checked on that Todo List
router.delete("/:todoListId", isAuthenticated, async (req, res, next) => {
    // res.json("Testing delete isChecked Todos")
    const {todoListId} = req.params

    try {
        
        // Delete all Todos with isChecked from the specific list with id todoListId:
        await Todo.deleteMany({isChecked: true, list: todoListId})
        res.json("Todos deleted")
    } catch (error) {
        next(error)
    }
})


// Export router:
module.exports = router;