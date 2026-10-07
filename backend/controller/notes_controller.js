import Note from "../models/Note.js";

const getAllNotes = async (req, res) => {
    try {
        const allNotes = await Note.find({});

        if (allNotes.length > 0) {
            return res.status(200).json({
                success: true,
                message: "All notes fetched",
                data: allNotes
            });
        }

        return res.status(404).json({
            success: false,
            message: "No notes found",
            data: []
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
    }
};


const createNote = async (req, res) =>{
    try{

        const newNotes  = await Note.create(req.body)

       
        
        return res.status(201).json({
            success:true,
            message:"Note created successfully",
            data:newNotes
        })
        
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
        
    }
}

export { getAllNotes, createNote };