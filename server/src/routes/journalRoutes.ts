import express from 'express';
import {getJournalsController, getJournalController} from '../controllers/journalController';

const router = express.Router();

router.get('/', getJournalsController);
router.get('/:journalId', getJournalController);

export default router;