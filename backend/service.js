const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MySQL pool (no need to call connect)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("DB connected successfully!");
    connection.release(); // release back to pool
  }
});

// Register student
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student registered successfully!" });
  });
});

// Get courses
app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Enroll student
app.post("/enroll", (req, res) => {
  const { student_id, course_id } = req.body;
  const sql = "INSERT INTO registrations (student_id, course_id) VALUES (?, ?)";
  db.query(sql, [student_id, course_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Enrolled successfully!" });
  });
});

// Get registrations
app.get("/registrations", (req, res) => {
  const sql = `
    SELECT s.name AS student_name, c.course_name 
    FROM registrations r
    JOIN students s ON r.student_id = s.id
    JOIN courses c ON r.course_id = c.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get students
app.get("/view-students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
