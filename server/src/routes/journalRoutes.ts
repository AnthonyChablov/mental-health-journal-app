import express from "express";
import passport from "passport";
import {
  createJournalController,
  getJournalsController,
  getJournalController,
  deleteJournalController,
  updateJournalController,
} from "../controllers/journalController";

const router = express.Router();

/* Journal Routes */
router.get("/:userId", getJournalsController);
router.get("/:userId/:journalId", getJournalController);
router.post("/:userId", createJournalController);
router.delete("/:userId/:journalId", deleteJournalController);
router.put("/:userId/:journalId", updateJournalController);

export default router;
