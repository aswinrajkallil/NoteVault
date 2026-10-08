import jwt from 'jsonwebtoken'

const middleware = (req, res, next)=>{
    try{

        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({

            })
    }

        const token = authHeader.split(" ")[1];

        console.log(token);

        const decoded = jwt.verify( token,process.env.JWT_SECRET );

        console.log(decoded);

        console.log(req.headers);
        
        console.log("middleware is running !!!!!!!");

        req.user = decoded;
        next()
    }catch(e){
        console.log(e);

    return res.status(401).json({
            success: false,
            message: "Authorization token required"
        });
    }
 }  

 export default  middleware 