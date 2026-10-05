import mongoose from "mongoose";

const noteSchema =new  mongoose.Schema({
        heading:{type:String},
        content:{type:String},
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model("Note", noteSchema)

export default Note