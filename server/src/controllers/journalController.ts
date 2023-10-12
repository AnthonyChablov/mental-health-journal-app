import { Request, Response } from "express";
import { NextFunction } from "express";
import { JournalModel } from "../models/journal";

export async function createJournalController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract relevant data from the request body
    const { user_id, title, content, date, mood, tags, attachments, privacy } =
      req.body;

    // Create a new journal entry
    const newJournal = new JournalModel({
      title,
      content,
      date,
      mood,
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

/* Get All Journals */
export async function getJournalsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Use Mongoose's find method to retrieve all journals
    const journals = await JournalModel.find(); // Fetch all journals from the database
    res.status(200).json(journals);
  } catch (error) {
    console.error("Error fetching journals: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/* Get Single Journal */
export async function getJournalController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Use Mongoose's findOne method to retrieve a single journal by its unique identifier
    const journalId = req.params.id; // Assuming you have a route parameter named 'id' for the journal's unique identifier
    const journal = await JournalModel.findOne({ _id: journalId }).exec();

    if (!journal) {
      // If no journal is found, return a 404 Not Found response
      return res.status(404).json({ error: "Journal not found" });
    }

    res.status(200).json(journal);
  } catch (error) {
    console.error("Error fetching journal: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
