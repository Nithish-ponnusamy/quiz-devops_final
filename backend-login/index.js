const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

// Replace with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://nithinithish271:nithish1230@cluster0.cbw99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET='4953546c308be3088b28807c767bd35e99818434d130a588e5e6d90b6d1d326e';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  language: String,
});
const User = mongoose.model("User", userSchema);

// Marks Schema
const marksSchema = new mongoose.Schema({
  id: String,
  totalMarks: Number,
});
const Marks = mongoose.model("Marks", marksSchema);

// Store marks
app.post("/marks", async (req, res) => {
  const { id, totalMarks } = req.body;
  try {
    const mark = new Marks({ id, totalMarks });
    await mark.save();
    res.json({ message: "Marks stored successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error storing marks" });
  }
});

// Get marks by id
app.get("/marks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Marks.findOne({ id });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving marks" });
  }
});

// Register user
app.post("/register", async (req, res) => {
  const { username, language } = req.body;
  try {
    const user = new User({ username, language });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, language } = req.body;
  try {
    const user = await User.findOne({ username, language });
    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
