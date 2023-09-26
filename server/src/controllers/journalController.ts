import {Request, Response} from 'express';
import { NextFunction } from 'express';
import { JournalModel } from '../models/Journal';
export async function getJournalsController(req: Request, res:Response, next:NextFunction){
    res.send('123');
}

export async function getJournalController(req: Request, res:Response, next:NextFunction){
    res.send('123');
}

export async function createJournalController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        
      // Extract relevant data from the request body
      const {
        user_id,
        title,
        content,
        date,
        mood,
        location,
        tags,
        attachments,
        privacy,
      } = req.body;
  
      // Create a new journal entry
      const newJournal = new JournalModel({
        user_id,
        title,
        content,
        date,
        mood,
        location,
        tags,
        attachments,
        privacy,
      });
  
      // Persist the new journal entry to the database
      const createdJournal = await newJournal.save();
  
      // Send the created journal entry back to the user
      res.json(createdJournal);
    } catch (error) {
      next(error);
    }
  }