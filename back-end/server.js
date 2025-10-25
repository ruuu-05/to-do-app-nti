const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app = express();
const PORT = 3000;
const MONGO_URI = dotenv.config().parsed.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", todoRoutes);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY5M2U3NzY0NzZiN2Q1ZWQyNGIwODMiLCJpYXQiOjE3NTE3Mjc5MDd9.Lveld_bfG3nrghmOJNvJB9cuIgZVbfKXH25YtK_SVx8

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to the To-Do API 👋");
    });

    app.listen(PORT, () => {
      console.log(`✅ Server running: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));
