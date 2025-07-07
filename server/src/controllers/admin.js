import { User } from "../models/user.models.js";

export const adminUserController = async (req, res) => {

  try {
    const users = await User.find({});
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to fetch users" 
    });
  }
};
