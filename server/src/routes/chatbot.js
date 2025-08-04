import e from "express";
import chatbotController from "../controllers/chatbot.js";

const router = e.Router();

router.get("/", chatbotController);

export default router;