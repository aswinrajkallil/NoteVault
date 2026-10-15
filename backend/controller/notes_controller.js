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


const getNote = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        if (note) {
            return res.status(200).json({
                success: true,
                message: "note fetched",
                data: note
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
            message: "Something went wrong!!" + e
        });
    }
};
const createNote = async (req, res) =>{
    try{

        const newNote  = await Note.create({
                ...req.body,
                user: req.user.id
            })
        
       
        
        return res.status(201).json({
            success:true,
            message:"Note created successfully",
            data:newNote
        })
        
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
        
    }
}

const updateNote = async (req,res)=>{
    try{
        const noteId = req.params.id;
        const updatedNote = await Note.findOneAndUpdate(
                {
                    _id: noteId,
                    user: req.user.id
                },
                req.body,
                { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
                data: null
            });
        }

            return res.status(200).json({
            success:true,
            message:"Note updated successfully",
            data:updatedNote
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
        
    }
}

const deleteNote = async (req,res)=>{
    try{
        const noteId = req.params.id;
        const deletedNote = await Note.findOneAndDelete({
                    _id: noteId,
                    user: req.user.id
                })

        if (!deletedNote) {
            return res.status(404).json({
            success:false,
            message: "Note not found",
            data:deletedNote
        })
            }

            return res.status(200).json({
            success:true,
            message:"Note deleted successfully",
            data:deletedNote
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
        
    }
}

export { getAllNotes, createNote, updateNote, deleteNote, getNote };