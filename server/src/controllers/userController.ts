import { Request, Response } from "express";
import { NextFunction } from "express";
import { genPassword, issueJWT, validPassword } from "../utils/helpers";
import { UserModel } from "../models/user";

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  UserModel.findOne({ username: req.body.username })
    .then((user: any) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = validPassword(
        req.body.password,
        String(user.hash),
        String(user.salt)
      );

      if (isValid) {
        const tokenObject = issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
}

export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new UserModel({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user: any) => {
      const jwt = issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err: Error) => next(err));
}

export async function getLoggedInUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Use Mongoose's findOne method to retrieve a single user info by its username
    const userId = req.params.userId;
    const user = await UserModel.findOne({ _id: userId }).exec();

    if (!user) {
      // If no journal is found, return a 404 Not Found response
      return res.status(404).json({ error: "User not found" });
    }

    /* Return the user info */
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info: ", err);

    next(err);
  }
}
