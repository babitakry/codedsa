import express from "express";
import { getUserController, updateuserController } from "../controllers/user.js";
import { authMiddleware } from "../middleware/user-auth.js";

const router = express.Router();

router.get("/getuser", authMiddleware, getUserController);
router.put("/updateuser/:id",authMiddleware, updateuserController);

export default router;