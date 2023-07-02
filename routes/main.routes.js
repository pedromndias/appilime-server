//* This file has all the routes regarding the Main page

// Require our model:
const User = require("../models/User.model");

// Require express and create router:
const router = require("express").Router();

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET "/api/main" => Shows the mood of a user
router.get("/", isAuthenticated, async (req, res, next) => {
    // console.log("Testing getting the mood");
    try {
        // Get the user id from the payload from the isAuthenticated middleware:
        const userId = req.payload._id
        const response = await User.findById(userId).select("mood")
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/main" => Gets the mood and updates it in the User (and changes theme)
router.patch("/", isAuthenticated, async (req, res, next) => {
    // console.log("Testing editing the mood");
    const {mood} = req.body
    try {
        // Get the userID:
        const userId = req.payload._id
        // And let's update that user:
        // ? Note the findOne() and save() methods so we have enum validation (findByIdAndUpdate() skips certain Mongoose middleware and validation steps that occur when using findOne() and save()).
        const response = await User.findOne({_id: userId})
        response.mood = mood
        await response.save()
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// Export router:
module.exports = router;