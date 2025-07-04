const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Atlas URI and JWT
const MONGO_URI = 'mongodb+srv://nithinithish271:nithish1230@cluster0.cbw99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = '4953546c308be3088b28807c767bd35e99818434d130a588e5e6d90b6d1d326e';

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Allow all origins temporarily for Kubernetes testing
app.use(cors());
app.use(bodyParser.json());

// ✅ Debug incoming requests
app.use((req, res, next) => {
  console.log(`🔎 ${req.method} ${req.url} --`, req.body);
  next();
});

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  language: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// ✅ Marks Schema
const marksSchema = new mongoose.Schema({
  id: { type: String, required: true },
  totalMarks: { type: Number, required: true }
});
const Marks = mongoose.model("Marks", marksSchema);

// ✅ Register User
app.post("/register", async (req, res) => {
  const { username, language } = req.body;

  if (!username || !language) {
    return res.status(400).json({ message: "Username and language are required" });
  }

  try {
    const user = new User({ username, language });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// ✅ Login User
app.post("/login", async (req, res) => {
  const { username, language } = req.body;

  if (!username || !language) {
    return res.status(400).json({ message: "Username and language are required" });
  }

  try {
    const user = await User.findOne({ username, language });
    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// ✅ Store Marks
app.post("/marks", async (req, res) => {
  const { id, totalMarks } = req.body;

  if (!id || totalMarks === undefined) {
    return res.status(400).json({ message: "ID and totalMarks are required" });
  }

  try {
    const mark = new Marks({ id, totalMarks });
    await mark.save();
    res.json({ message: "Marks stored successfully" });
  } catch (err) {
    console.error("Store marks error:", err);
    res.status(500).json({ message: "Error storing marks" });
  }
});

// ✅ Get Marks by ID
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
    console.error("Get marks error:", err);
    res.status(500).json({ message: "Error retrieving marks" });
  }
});

// ✅ Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
