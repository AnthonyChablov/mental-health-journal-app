import express from "express";
import {
  createJournalController,
  getJournalsController,
  getJournalController,
  deleteJournalController,
  updateJournalController,
} from "../controllers/journalController";

const router = express.Router();

/* Journal Routes */
router.get("/", getJournalsController);
router.get("/:journalId", getJournalController);
router.post("/", createJournalController);
router.delete("/:journalId", deleteJournalController);
router.put("/:journalId", updateJournalController);

export default router;
