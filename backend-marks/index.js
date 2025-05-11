const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3002;

app.use(bodyParser.json());

let marks = []; // In-memory storage

app.post("/marks", (req, res) => {
  const { id, totalMarks } = req.body;
  marks.push({ id, totalMarks });
  res.json({ message: "Marks stored successfully" });
});

app.get("/marks/:id", (req, res) => {
  const { id } = req.params;
  const record = marks.find((m) => m.id === id);
  if (record) {
    res.json(record);
  } else {
    res.status(404).json({ message: "Record not found" });
  }
});

app.listen(PORT, () => console.log(`Marks backend running on port ${PORT}`));
