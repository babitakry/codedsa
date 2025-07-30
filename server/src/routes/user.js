import express from "express";
import { updateuserController } from "../controllers/user.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.put("/updateuser/:id",authMiddleware, updateuserController);

export default router;