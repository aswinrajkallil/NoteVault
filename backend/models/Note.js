import mongoose from "mongoose";

const noteSchema =new  mongoose.Schema({
        heading:{type:String},
        content:{type:String},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model("Note", noteSchema)

export default Note