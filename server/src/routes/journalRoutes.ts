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
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getJournalsController
);
router.get(
  "/:journalId",
  passport.authenticate("jwt", { session: false }),
  getJournalController
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createJournalController
);
router.delete(
  "/:journalId",
  passport.authenticate("jwt", { session: false }),
  deleteJournalController
);
router.put(
  "/:journalId",
  passport.authenticate("jwt", { session: false }),
  updateJournalController
);

export default router;
