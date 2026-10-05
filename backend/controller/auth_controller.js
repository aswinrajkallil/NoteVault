import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";



const register = async (req,res) =>{
    const { username, email, password } = req.body;

    const userExists = await User.findOne( { email } )

    if( userExists ){
        return res.status(400).json({message:"User already exists !!"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    res.status(201).json({
        message: "User registered successfully",
        user
    });

}

const Login = async (req,res) =>{
    const { email, password } = req.body

    const userExists = await User.findOne( { email } )
    
    if(!userExists ){
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    
    const passwordValid = await bcrypt.compare(password,userExists.password)

    if(!passwordValid ){
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const accessToken = generateToken(userExists);

    return res.status(200).json({
        message:"User Logined Successfully",
        accessToken

    })
}


export { register, Login }