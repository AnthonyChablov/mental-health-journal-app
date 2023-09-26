import {Request, Response} from 'express';
import { NextFunction } from 'express';
import { JournalModel } from '../models/Journal';

// Create 
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

// Rear
// Get ALL journals
export async function getJournalsController(req: Request, res:Response, next:NextFunction){
    try{
        //const authenticatedUserId = req.session.userId;
    
        // const todos = await TodoModel.find({userId: authenticatedUserId}); 
    
        /* if (!todos){
            return res.status(400).send('No tasks exist');
        }
        res.json(todos); */
    } catch(error){
        next(error)
    }
}
// Get ONE journal
export async function getJournalController(req: Request, res:Response, next:NextFunction){
    try{
        const journalId = req.params.journalId;
        const journal = await JournalModel.findById(journalId);
        if (!journal){
            return res.status(400).send('No task of this id exists');
        }
        res.json(journal);
    }catch(error){
        next(error);
    }
}

// Update Journal
export async function updateTodoController(req: Request, res:Response, next:NextFunction){
    try {
        const journalId = req.params.journalId;
        const journal = await JournalModel.findById(journalId);

        if (!journal){
            return res.status(400).send('No task of this id exists');
        }

        // update journal elems
        journal.title = req.body.title;
        journal.content = req.body.content;
        journal.date = req.body.date;
        journal.mood = req.body.mood;
        journal.location = req.body.location;
        journal.tags = req.body.tags;
        journal.privacy = req.body.privacy;

        await journal.save();
        res.json(journal);
    } catch(error){
        next(error);
    }
}

// Delete Journal Model
export async function deleteTodoController(req: Request, res:Response, next:NextFunction){

    try{
        // get the todo id
        const todoId = req.params.todoId;

        // go into db and find that id then delete
        const todo = await JournalModel.findByIdAndDelete(todoId);

        // return deleted todo to user
        res.json(todo);
    } catch(error){
        next(error);
    }
}