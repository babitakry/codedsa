import express from "express";
import { adminUserController } from "../controllers/admin.js";

const router = express.Router();

router.get("/users", adminUserController);

export default router;