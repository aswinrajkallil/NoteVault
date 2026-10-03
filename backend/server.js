import express from "express";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome to Home Page !!")
})

app.post('/api/notes',(req,res)=>{
    console.log(req.body);
    res.json(req.body);

})






const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})