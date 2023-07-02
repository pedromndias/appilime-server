//* This is our User model

// Require Schema and model from mongoose:
const { Schema, model } = require("mongoose");

// Create the Schema (it's an object with all the User properties):
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        imageUrl: String,
        mood: {
            type: String,
            enum: ["focus", "lazy", "excited", "melancholic"],
            default: "focus"
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

// Create a model "User" with that Schema:
const User = model("User", userSchema);

// And export the model:
module.exports = User;
