const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let articles = []; // Temporary in-memory storage

// API to Upload Article
app.post("/api/upload-article", (req, res) => {
  const { title, content, doctorId } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and Content are required" });
  }

  const newArticle = {
    id: articles.length + 1,
    title,
    content,
    doctorId,
  };

  articles.push(newArticle); // Store article in memory

  res.status(201).json({ message: "Article uploaded successfully!", article: newArticle });
});

app.listen(5000, () => console.log("Server running on port 5000"));
