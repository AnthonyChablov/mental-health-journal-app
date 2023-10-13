import fs from "fs";
import path from "path";
import { UserModel } from "../models/user";
import { Error } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";

const pathToKey = path.join(__dirname, "../secret/", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

/* Authorization: Bearer <token> */ // for our bearer token expects this exact syntax

/* JWT Options */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the request's Authorization header as a bearer token
  secretOrKey: PUB_KEY, // Use the public key (PUB_KEY) to verify JWT signatures
  algorithms: ["RS256"], // Specify that RS256 algorithm is used to issue and validate JWTs
};

const strategy = new Strategy(options, (payload: any, done: any) => {
  // the JWT payload is going to have a subfield that will include a unique id about the user
  UserModel.findOne({ _id: payload.sub })
    .then((user) => {
      return user ? done(null, user) : done(null, false);
    })
    .catch((err: Error) => done(err, null));
}); // In passport you dont have a specific way you are required to verify an authentication
// We can use whatever code logic we can choose, in this case we are using mongoDB

// 4:57:57
module.exports = (passport: any) => {
  passport.use(strategy);
};
