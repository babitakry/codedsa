import express from "express";
import { updateuserController } from "../controllers/user.js";

const router = express.Router();

router.put("/updateuser/:id", updateuserController);

export default router;