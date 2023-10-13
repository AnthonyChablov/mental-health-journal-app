import express from "express";
import mongoose from "mongoose";
import journalRoutes from "./routes/journalRoutes";
import cors from "express";
const passport = require("passport");

// App config
require("dotenv").config();
const app = express();
const port = 3000;

/* Middleware */
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});
app.use("/api/journal", journalRoutes);

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
