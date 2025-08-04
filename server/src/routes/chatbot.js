import e from "express";
import chatbotController from "../controllers/chatbot.js";

const router = e.Router();

router.post("/", chatbotController);

export default router;