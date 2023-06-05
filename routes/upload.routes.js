//* This file has the routes to upload a profile picture:

// Require our model:
const User = require("../models/User.model")

// Require express and create router:
const router = require("express").Router();

// Require our middlewares:
const isAuthenticated = require("../middlewares/isAuthenticated");
const uploader = require("../middlewares/cloudinary.config")

// POST "/api/upload" => Upload file to Cloudinary:
router.post("/", uploader.single("image"), (req, res, next) => {
    console.log("file is: ", req.file);
  
    if (!req.file) {
      next("No file uploaded!");
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    res.json({ imageUrl: req.file.path });
  });

// Export router:
module.exports = router;