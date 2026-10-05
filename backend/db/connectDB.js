import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected Successfully !!");
        
    }catch(e){
        console.log("Failed to connect Mongo DB 🛑🛑   ,   " +e);
        
        
    }
}

export default connectDB