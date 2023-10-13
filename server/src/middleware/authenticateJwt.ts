import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Error } from "mongoose";
import { IUser } from "../models/user";

// Define a middleware function that uses passport.authenticate
export function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: IUser) => {
      if (err) {
        return next(err); // Pass any authentication errors to the error handling middleware
      }

      if (!user) {
        // Unauthorized: JWT token is invalid or expired
        res.status(401).json({ message: "Unauthorized" });
      } else {
        // Authentication successful, store the user in the request object
        (req as any).user = user;
        next();
      }
    }
  )(req, res, next);
}
