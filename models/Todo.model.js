const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        list: {
            type: Schema.Types.ObjectId,
            ref: "List"
    
        },
        isChecked: {
            type: Boolean,
            default: false
        },
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

const Todo = model("Todo", todoSchema);

module.exports = Todo;
