//* This file has all the routes regarding the Profile

// Require our model:
const User = require("../models/User.model")

// Require express and create router:
const router = require("express").Router();

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/api/profile" => Get info about a User
router.get("/", isAuthenticated, async (req, res, next) => {
    // console.log("Testing get User details")
    try {
        // Get the user id from the payload from the isAuthenticated middleware:
        const userId = req.payload._id
        const response = await User.findById(userId)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/profile/username" => Gets data from the profile and updates the User's username:
router.patch("/username", isAuthenticated, async (req, res, next) => {
    console.log("Testing editing the username");
    const {username} = req.body
    // Validation:
    if (!username) {
        // If the username is empty, let's send an error:
        res.status(400).json({ errorMessage: "Please type a username" });
        // Stop the execution of the route:
        return;
    }
    try {
        // Get the userID:
        const userId = req.payload._id
        // Update that user:
        const response = await User.findByIdAndUpdate(userId, {
            username
        }, {new:true})
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// Export router:
module.exports = router;