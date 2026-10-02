import express from "express";
import {
  runCode,
  submitCode,
  getProblemSubmissions,
  getUserSubmissions,
  getAllSubmissions,
  getSubmissionById,
} from "../controllers/judge.controller.js";
import { authMiddleware } from "../middleware/user-auth.js";

const router = express.Router();

// Code execution routes (requires authentication)
router.post("/run", authMiddleware, runCode);
router.post("/submit", authMiddleware, submitCode);

// Submissions retrieval routes
router.get("/submissions/problem/:problemId", authMiddleware, getProblemSubmissions);
router.get("/submissions/user", authMiddleware, getUserSubmissions);
router.get("/submissions/all", getAllSubmissions);
router.get("/submissions/:id", authMiddleware, getSubmissionById);

export default router;
