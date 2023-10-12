import express from "express";
import {
  createJournalController,
  getJournalsController,
  getJournalController,
} from "../controllers/journalController";

const router = express.Router();

/* Journal Routes */
router.get("/", getJournalsController);
router.get("/:journalId", getJournalController);
router.post("/", createJournalController);

export default router;
