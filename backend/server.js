import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db/connectDB.js";
import router from "./routes/auth_route.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const PORT = process.env.PORT

connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Welcome to Home Page !!")
})


app.use('/api',router)


// app.post('/api/notes',(req,res)=>{
//     console.log(req.body);
//     res.json(req.body);

// })

app.get('/api/notes',(req,res)=>{
    const notes = [
        { text: "Learn React" },
        { text: "Learn Express" },
        { text: "Learn MongoDB" }
    ];
    res.json(notes)
})








app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})