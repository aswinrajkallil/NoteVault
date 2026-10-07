import jwt from 'jsonwebtoken'

const middleware = (req, res, next)=>{


    console.log(req.headers);
    
    console.log("middleware is running !!!!!!!");
    next()
 }