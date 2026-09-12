const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Week 8: in-memory server-side source of truth.
let students = [
  {
    id: "1",
    name: "Aisha Rahman",
    studentId: "22-47087-1",
    email: "22-47087-1@student.aiub.edu",
    department: "CSE",
    bio: "Computer Science and Engineering student interested in mobile development.",
    skills: ["React", "TypeScript", "UI Design"],
    avatarUrl: "https://i.pravatar.cc/150?u=aisha-rahman",
  },
  {
    id: "2",
    name: "Tanvir Hasan",
    studentId: "22-47088-1",
    email: "22-47088-1@student.aiub.edu",
    department: "CSE",
    bio: "Full-stack learner focused on JavaScript and backend development.",
    skills: ["React Native", "Node.js", "Express"],
    avatarUrl: "https://i.pravatar.cc/150?u=tanvir-hasan",
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    studentId: "22-47089-1",
    email: "22-47089-1@student.aiub.edu",
    department: "CSE",
    bio: "Data-focused student exploring Python, SQL, and application development.",
    skills: ["Python", "Data Analysis", "SQL", "Git"],
    avatarUrl: "https://i.pravatar.cc/150?u=nusrat-jahan",
  },
  {
    id: "4",
    name: "Sakib Ahmed",
    studentId: "22-47090-1",
    email: "22-47090-1@student.aiub.edu",
    department: "EEE",
    bio: "Engineering student interested in JavaScript, Firebase, and connected apps.",
    skills: ["JavaScript", "Firebase", "Git"],
    avatarUrl: "https://i.pravatar.cc/150?u=sakib-ahmed",
  },
];

// GET /students — return all students, optionally filtered by q on the server.
app.get("/students", (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";

  if (!query) {
    return res.status(200).json(students);
  }

  const results = students.filter((student) => {
    const haystack = [
      student.name,
      student.studentId,
      student.email,
      student.department,
      student.bio,
      ...student.skills,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return res.status(200).json(results);
});

// GET /students/:id — Week 8 Final Lab Task 1, Feature 1.
app.get("/students/:id", (req, res) => {
  const student = students.find((item) => item.id === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  return res.status(200).json(student);
});

// POST /students — create a student and assign the id on the server.
app.post("/students", (req, res) => {
  const { name, studentId, email, department, bio, skills, avatarUrl } = req.body ?? {};

  if (!name || !department) {
    return res.status(400).json({ error: "name and department are required" });
  }

  const newStudent = {
    id: Date.now().toString(),
    name: String(name).trim(),
    studentId: String(studentId ?? "").trim(),
    email: String(email ?? "").trim(),
    department: String(department).trim(),
    bio: String(bio ?? "").trim(),
    skills: Array.isArray(skills) ? skills.map(String).filter(Boolean) : [],
    avatarUrl: avatarUrl ?? `https://i.pravatar.cc/150?u=${Date.now()}`,
  };

  students.unshift(newStudent);
  return res.status(201).json(newStudent);
});

// PATCH /students/:id — Week 8 Final Lab Task 1, Feature 2.
app.patch("/students/:id", (req, res) => {
  const index = students.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const allowedFields = ["name", "studentId", "email", "department", "bio", "skills", "avatarUrl"];
  const updates = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body ?? {}, field)) {
      updates[field] = req.body[field];
    }
  }

  students[index] = { ...students[index], ...updates };
  return res.status(200).json(students[index]);
});

// DELETE /students/:id — remove a student and return 204 on success.
app.delete("/students/:id", (req, res) => {
  const before = students.length;
  students = students.filter((student) => student.id !== req.params.id);

  if (students.length === before) {
    return res.status(404).json({ error: "Student not found" });
  }

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
