import { User } from "../models/user.models.js";


export const updateuserController = async (req, res) => {
    const data = req.body;
    console.log("Data.....", data);

    // const params = req.params;
    // console.log("Params....", params);
    const user_id = req.user.data.user_id;

    try {
        const { 
            username,
            summary, 
            country, 
            college, 
            language_used, 
            social_links, 
        } = data;
        
        const updateuser = await User.findByIdAndUpdate(user_id, {
            username: username,
            summary: summary,
            country: country,
            college: college,
            language_used: language_used,
            social_links: social_links,
        });
        await updateuser.save();

        return res.status(201).json({
            success: true,
            message: "User Profile Updated Successfully",
            data: data
        }) ;
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"Internal Server Error in Updating User......"
        });
    }
}