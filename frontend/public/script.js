// Base URL of live backend
const BASE_URL = "https://courseregistration-production.up.railway.app";

// Helper to show notifications
function showMessage(msg, type = "success") {
  const div = document.createElement("div");
  div.textContent = msg;
  div.className = `notification ${type}`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

// Register Student
async function registerStudent() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    showMessage("Please fill all fields!", "error");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const msg = await res.text();
    showMessage(msg, "success");
    clearRegisterForm();
  } catch (err) {
    showMessage("Error registering student!", "error");
    console.error(err);
  }
}

// Load Courses
async function loadCourses() {
  try {
    const res = await fetch(`${BASE_URL}/courses`);
    const courses = await res.json();

    const list = document.getElementById("courseList");
    list.innerHTML = "";
    courses.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.id}. ${c.course_name} (${c.instructor || "N/A"}) - ${c.credits || "N/A"} credits`;
      list.appendChild(li);
    });
  } catch (err) {
    showMessage("Error loading courses!", "error");
    console.error(err);
  }
}

// Enroll in Course
async function enrollCourse() {
  const student_id = document.getElementById("student_id").value.trim();
  const course_id = document.getElementById("course_id").value.trim();

  if (!student_id || !course_id) {
    showMessage("Please enter both Student ID and Course ID", "error");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id, course_id })
    });
    const msg = await res.text();
    showMessage(msg, "success");
    clearEnrollForm();
  } catch (err) {
    showMessage("Error enrolling in course!", "error");
    console.error(err);
  }
}

// View Registrations
async function viewRegistrations() {
  try {
    const res = await fetch(`${BASE_URL}/registrations`);
    const registrations = await res.json();

    const list = document.getElementById("registrationList");
    list.innerHTML = "";
    registrations.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `${r.student_name} → ${r.course_name}`;
      list.appendChild(li);
    });
  } catch (err) {
    showMessage("Error fetching registrations!", "error");
    console.error(err);
  }
}

// View Students
async function viewStudents() {
  try {
    const res = await fetch(`${BASE_URL}/view-students`);
    const students = await res.json();

    const list = document.getElementById("studentList");
    list.innerHTML = "";
    students.forEach(s => {
      const li = document.createElement("li");
      li.textContent = `${s.id}. ${s.name} (${s.email})`;
      list.appendChild(li);
    });
  } catch (err) {
    showMessage("Error fetching students!", "error");
    console.error(err);
  }
}

// Clear forms
function clearRegisterForm() {
  document.getElementById("name").value = '';
  document.getElementById("email").value = '';
  document.getElementById("password").value = '';
}

function clearEnrollForm() {
  document.getElementById("student_id").value = '';
  document.getElementById("course_id").value = '';
}
