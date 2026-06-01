const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("Database Error:", err);
  } else {
    console.log("Connected to Aiven MySQL");
  }
});

// Create table

// API
app.get("/questions", (req, res) => {
  console.log("Questions API called");

  db.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      console.log("Query Error:", err);
      return res.status(500).json(err);
    }

    console.log("Rows:", results.length);
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
