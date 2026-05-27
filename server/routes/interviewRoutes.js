import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { evaluateAnswer, generateQuestions, getInterviewHistory } from "../controllers/interviewController.js";


const router = express.Router();

router.post("/generate",authMiddleware,generateQuestions)
router.post("/evaluate",authMiddleware,evaluateAnswer);


export default router;