const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: 25
        },
        // Note how each Todo will belong to a List (DB Relation):
        list: {
            type: Schema.Types.ObjectId,
            ref: "List"
    
        },
        isChecked: {
            type: Boolean,
            default: false
        },
        // Note how each Todo will have also a creator (DB Relation to a "User"):
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
