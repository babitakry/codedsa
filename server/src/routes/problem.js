import express from "express";
import { createProblem, getAllProblems, getProblemById } from "../controllers/problem.js";

const router = express.Router();

router.post("/createproblem", createProblem);
router.get("/getproblem/:id", getProblemById);
router.get("/getallproblem", getAllProblems);

export default router;