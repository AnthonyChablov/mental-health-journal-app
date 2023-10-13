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
