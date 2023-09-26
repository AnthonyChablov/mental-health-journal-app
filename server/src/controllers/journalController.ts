import {Request, Response} from 'express';
import { NextFunction } from 'express';

export async function getJournalsController(req: Request, res:Response, next:NextFunction){
    res.send('123');
}

export async function getJournalController(req: Request, res:Response, next:NextFunction){
    res.send('123');
}