import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/jwt.js";


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
        password:hashedPassword
    })

    res.status(201).json({
        message: "User registered successfully",
        id:user._id,
        username:user.username,
        email:user.email
    });

}

const Login = async (req,res) =>{
    const { email, password } = req.body

    const userExists = await User.findOne( { email } )
    
    if(!userExists){
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

    const refreshToken = generateRefreshToken(userExists)
    const accessToken = generateToken(userExists);

    

    userExists.refreshToken = refreshToken;
    await userExists.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    return res.status(200).json({
        message:"User Logined Successfully",
        accessToken

    })
}

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token missing"
        });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({
                message: "Invalid refresh token"
            });
        }

        const newRefreshToken = generateRefreshToken(user);
        const accessToken = generateToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        return res.status(200).json({
            accessToken
        });
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired refresh token"
        });
    }
};


export { register, Login, refreshAccessToken }