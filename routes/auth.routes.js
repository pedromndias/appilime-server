//* This file has all the routes regarding authentication

const router = require("express").Router();
// Require bcrypt to encrypt password:
const bcrypt = require("bcryptjs");
// Require jsonwebtoken (to create Token):
const jwt = require("jsonwebtoken")

// Require our middleware:
const isAuthenticated = require("../middlewares/isAuthenticated")

// Require our models:
const User = require("../models/User.model");
const List = require("../models/List.model");
const Todo = require("../models/Todo.model");
const Expense = require("../models/Expense.model");

// POST "/api/auth/signup" => Register a new user:
router.post("/signup", async (req, res, next) => {
    // ? Postman tests:
    // ? res.json("Testing signup")
    // ? Add properties in x-www-form-urlencoded in Body
    // Get the req.body and destructure:
    // console.log(req.body)
    const {username, email, password} = req.body

    //* Server Validations:
    // All fields must not be empty:
    if (!username || !email || !password) {
        // In case any of the fields are empty, show code error 400 (Bad Request):
        res.status(400).json({ errorMessage: "All the fields are mandatory" });
        // Stop the execution of the route:
        return;
    }
    // Password validation with Regular Expressions:
    const regexPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/gm
    if (regexPattern.test(password) === false) {
        res.status(400).json({ errorMessage:"Your password is not strong enough. You need at least 8 characters, 1 capital letter, 1 lowercase letter, 1 special character and 1 numeric character."})
        return;
    }
    

    //* Async validations:
    try {
        // Check if username is already used:
        const foundUsername = await User.findOne({ username: username });
        if (foundUsername) {
            res.status(400).json({ errorMessage: "User already registered" });
            return;
        }
        // Check if email is already used:
        const foundEmail = await User.findOne({email: email});
        if(foundEmail !== null) {
            res.status(400).json({ errorMessage: "Email already in use"});
            return;
        }

        //* If all good then let's encrypt the password:
        // Generate salt:
        const salt = await bcrypt.genSalt(10);
        // Hash password:
        const hashPassword = await bcrypt.hash(password, salt);
        // console.log(hashPassword)
        // res.json(hashPassword)

        //* If not registered we create a new user:
        await User.create({
            username,
            email,
            password: hashPassword
        })
        res.json("User created")

    } catch (error) {
        next(error)
    }

    
})

// POST "/api/auth/login" => Validates user's credentials:
router.post("/login", async (req, res, next) => {
    // console.log(req.body)
    const {email, password} = req.body;

    //* Validations:
    // Check if all fields are not empty:
    if (!email || !password) {
        res.status(400).json({ errorMessage: "All the fields are mandatory" });
        return;
    }
    
    try {
        // Check if the email exists:
        const foundUser = await User.findOne({email: email})
        if (!foundUser) {
            res.status(400).json({errorMessage: "User not registered"});
            return;
        }

        // Check if the password is correct:
        const isPasswordCorrect = await bcrypt.compare(
            password,
            foundUser.password
        );
        if(!isPasswordCorrect) {
            res.status(400).json({errorMessage: "Password is not correct"})
            return;
        }
        
        //* If all is good, let's create a Token for future authentication:
        // Create payload (with essential data):
        const payload = {
            _id: foundUser._id,
            email: foundUser.email
        }
        // Create Token (with payload, secret word and token configurations):
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "7d"}
        )
        // Send it to the Frontend:
        res.json({authToken: authToken})

    } catch (error) {
        next(error)
    }
})


// GET "/api/auth/verify" => Tell the Frontend if the user is logged in (validation):
router.get("/verify", isAuthenticated, (req, res, next) => {
    // ? Here we will get and validate the token (isAuthenticated middleware). Then extract the payload and tell the Frontend who is the user of the Token. We also need to install express-jwt to create that middleware.
    // console.log(req.payload)
    // req.payload is the active user. Let's send it to the Frontend:
    res.status(200).json({payload: req.payload})
})

module.exports = router;
