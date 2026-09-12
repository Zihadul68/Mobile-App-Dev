export type Student = {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
};

// Kept as a local reference dataset for the Week 6/7 learning stages.
// Week 8 replaces the live app's source of truth with server/index.js.
export const initialStudents: Student[] = [
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
