import express from "express";
import { loginController, signupController, verifyTokenController } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/user-auth.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/verify-token",authMiddleware, verifyTokenController );

export default router;