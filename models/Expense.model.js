const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: 20
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        location: String,
        geoLocation: [Number],
        // Note how each Expense will have a creator (DB Relation to a "User"):
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
