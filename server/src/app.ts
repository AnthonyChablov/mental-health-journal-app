import express from 'express';
import mongoose from "mongoose";

// App config
require("dotenv").config();
const app = express();
const port = 3000;

// Home t
app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

// Connect to your MongoDB database
mongoose
  .connect(process.env.MONGO_URI as string)
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
