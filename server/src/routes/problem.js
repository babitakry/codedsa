import express from "express";
import { createProblem, deleteProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/problem.js";
import { adminauthMiddleware } from "../middleware/admin-auth.js";

const router = express.Router();

router.post("/createproblem",adminauthMiddleware, createProblem);
router.get("/getproblem/:id", getProblemById);
router.get("/getallproblem", getAllProblems);
router.put("/updateproblem/:id", adminauthMiddleware, updateProblem);
router.delete("/deleteproblem/:id", adminauthMiddleware, deleteProblem);

export default router;