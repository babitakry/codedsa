import jwt from "jsonwebtoken"

// creating the middleware
export const authMiddleware = (req, res, next)=>{
    try{
        const token = req.body?.token || req.cookies?.token || req.header("Authorization").replace("Bearer ","");

        // validation
        if(!token){
            return res.status(400).json({ // bad request
                success:false,
                message:"Missing Token"
            })
        }

        //token verification
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            return res.status(401).json({ //Unauthorized
                success: false,
                message: "JWT Verification Failed"
            })
        }

        // assiginging the custom data like user to request -> it will be accessed by req.user
        req.user=payload;
        // after successful token verification, use next()
        next();
    }catch(error){
        console.log("error in middleware",error);
        return res.status(500).json({
            success: false,
            message:"Internal Server Error in auth middleware"
        })
    }
}