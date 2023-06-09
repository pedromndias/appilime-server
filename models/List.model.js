const { Schema, model } = require("mongoose");

const listSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: 20
        },
        // Note how each List will have a creator (DB Relation to a "User"):
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const List = model("List", listSchema);

module.exports = List;
