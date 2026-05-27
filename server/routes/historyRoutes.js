import express from "express";

import { getInterviewHistory, getSingleInterview }
from "../controllers/historyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/history",
  authMiddleware,
  getInterviewHistory
);


router.get("/interview/:id",authMiddleware,getSingleInterview);
export default router;