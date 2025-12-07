const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// Database Connection

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

// Register a new student
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.status(500).send("Error registering student");
    res.send("🎉 Student registered successfully!");
  });
});

// Get all courses
app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).send("Error fetching courses");
    res.json(results);
  });
});

// Enroll in a course
app.post("/enroll", (req, res) => {
  const { student_id, course_id } = req.body;
  const sql = "INSERT INTO registrations (student_id, course_id) VALUES (?, ?)";
  db.query(sql, [student_id, course_id], (err) => {
    if (err) return res.status(500).send("Error enrolling in course");
    res.send("✅ Enrolled successfully!");
  });
});

// View all registrations
app.get("/registrations", (req, res) => {
  const sql = `
    SELECT s.name AS student_name, c.course_name 
    FROM registrations r
    JOIN students s ON r.student_id = s.id
    JOIN courses c ON r.course_id = c.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching registrations");
    res.json(results);
  });
});

// Add this new route to view students
app.get("/view-students", async (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
