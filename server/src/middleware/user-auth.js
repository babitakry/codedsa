import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

// creating the middleware
export const authMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // validation
        if (!token) {
            return res.status(400).json({ // bad request
                success: false,
                message: "Not Authenticated"
            })
        }

        //token verification
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            return res.status(401).json({ //Unauthorized
                success: false,
                message: "JWT Verification Failed"
            })
        }

        const user = await User.findById(payload.user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User no longer exists"
            });
        }

        // assiginging the custom data like user to request -> it will be accessed by req.user
        req.user = user;
        // after successful token verification, use next()
        next();

    } catch (error) {
        console.log("error in middleware", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in auth middleware"
        })
    }
}