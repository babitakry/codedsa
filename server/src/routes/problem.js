import express from "express";
import { createProblem, deleteProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/problem.js";

const router = express.Router();

router.post("/createproblem", createProblem);
router.get("/getproblem/:id", getProblemById);
router.get("/getallproblem", getAllProblems);
router.put("/updateproblem/:id", updateProblem);
router.delete("/deleteproblem/:id", deleteProblem);

export default router;