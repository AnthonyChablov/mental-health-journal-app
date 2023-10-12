import express from "express";
import mongoose from "mongoose";
import journalRoutes from "./routes/journalRoutes";

// App config
require("dotenv").config();
const app = express();
const port = 3000;

// Home
app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

/* Middleware */
app.use(express.json());

// journal routes
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
