import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
    const data = req.body;

    try {
        // 1. extracting the data
        const { username, password, email } = data;

        // 2. Data Validation
        if (!username || !password || !email) {
            return res.status(400).json({ //bad request == 400
                success: false,
                message: "Missing Required data"
            })
        }

        // 3. check username already exist in the database
        const user_exists = await User.findOne({ username: username })

        // 4. if user exist return 
        if (user_exists) {
            return res.status(409).json({ // conflict == 409
                success: false,
                message: "User already exists"
            })
        }

        // 5. Hash the password before inserting the user details in the database
        // We will use bcrypt -> bcrypt is used to encrypt the data
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(password, saltRounds);
        console.log("hashed_password", hashed_password);

        // 6. now save the entry in the database
        const user = new User({
            username: username,
            email: email,
            password: hashed_password
        })

        // 7. now save the data
        await user.save();

        // 8. return the success response
        return res.status(201).json({
            success: true,
            message: "User SignedUp Successfully",
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Signing Up User"
        })
    }
}

export const loginController = async (req, res) => {
    const data = req.body;
    const { username, password } = data;

    try {
        // check if user exists
        const user_exist = await User.findOne({ username: username });
        if (!user_exist) {
            return res.status(404).json({
                success: false,
                message: "Sorry, Sign Up First !!"
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user_exist.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password!"
            });
        }

        // create a JWT token
        const payload = {
            user_id: user_exist._id,
            email: user_exist.email,
            role: user_exist.role //  make sure your User model has a `role` field
        };
        

        const jwtdata = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
                data: payload
            },
            process.env.JWT_SECRET
        );

        console.log("jwt", jwtdata);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully!!",
            token: jwtdata,
            role: payload.role
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in login process"
        });
    }
};

export const verifyTokenController = async ( req, res) => {
    try{
        const user_id = req.user.data.user_id;
        if(!user_id){
            return res.status(404).json({
                success: false,
                message: "Missing user id"
            });
        }
        const userExist = await User.findById(user_id);
        if(!userExist){
            return res.status(404).json({
                success: false,
                message: "User Not Exist!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User Authentication successful !",
            role: userExist.role
        })
    }
    catch(error){
        console.log("VerifyTokenController", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error to VerifyTokenController"
        });
    }
};