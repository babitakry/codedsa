import express from "express";
import { getUserController, updateuserController, uploadProfilePicController } from "../controllers/user.js";
import { authMiddleware } from "../middleware/user-auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/getuser", authMiddleware, getUserController);
router.put("/updateuser", authMiddleware, updateuserController);
router.post(
    "/upload-profile",
    authMiddleware,
    upload.single("profilepic"),
    uploadProfilePicController
);

export default router;