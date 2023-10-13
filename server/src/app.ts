import express from "express";
import mongoose from "mongoose";
import journalRoutes from "./routes/journalRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "express";

//passport
const passport = require("passport");
// global passport object into the congifuration function
require("./config/passport")(passport);

// App config
require("dotenv").config();
const app = express();
const port = 3000;

/* Middleware */
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(passport.initialize()); // initialize the passport object on every request
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});
app.use("/api/journal", journalRoutes);
app.use("/users", userRoutes);

// Connect to your MongoDB database
mongoose
  .connect(String(process.env.MONGO_URI))
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Server started
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
