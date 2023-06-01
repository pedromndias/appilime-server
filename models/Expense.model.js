const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        geoLocation: [Number],
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"    
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
