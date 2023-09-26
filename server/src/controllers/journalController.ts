import {Request, Response} from 'express';
import { NextFunction } from 'express';
import { JournalModel } from '../models/Journal';
export async function getJournalsController(req: Request, res:Response, next:NextFunction){
    res.send('123');
}

export async function getJournalController(req: Request, res:Response, next:NextFunction){
    res.send('123');
}

export async function createJournalController(req: Request, res:Response, next:NextFunction){
    try{
        // create new Journal
        const newJournal = new JournalModel({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            isDone: req.body.isDone,
        });

        // persist to db 
        const createdJournal = await newJournal.save();
        // send created todo back to user
        res.json(createdJournal);

    }catch(error){
        next(error);
    }
}