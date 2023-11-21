import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { MongoClient } from "mongodb";
import { ISession } from "../models/session";
import SessionModel from "../models/session";
import { Types } from "mongoose";

export async function authenticateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Create a new MongoClient
  const client = new MongoClient(process.env.MONGO_URI ?? "");

  const token = req.headers.authorization;
  console.log("Token", token);
  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Database and collection
    const database = client.db("mental-health-journal-app");
    const sessionsCollection = database.collection("sessions");
    const objectId = new Types.ObjectId(token);

    // Find the session in the database based on the token
    const session = await sessionsCollection.findOne({
      userId: objectId,
    });

    if (session) {
      // Session found, you can now use it as needed
      console.log("Session found:", session);
    } else {
      // Session not found
      console.log("Session not found");
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error("Error finding session:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Close the connection
    await client.close();
  }

  next();
}
