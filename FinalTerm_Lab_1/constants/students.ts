export type Student = {
  id: string;
  name: string;
  email: string;
  department: string;
  skills: string[];
};

export const initialStudents: Student[] = [
  {
    id: "1",
    name: "Aisha Rahman",
    email: "aisha@example.com",
    department: "Computer Science",
    skills: ["React", "TypeScript", "UI Design"],
  },
  {
    id: "2",
    name: "Tanvir Hasan",
    email: "tanvir@example.com",
    department: "Software Engineering",
    skills: ["React Native", "Node.js"],
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    department: "Computer Science",
    skills: ["Python", "Data Analysis", "SQL", "Git"],
  },
  {
    id: "4",
    name: "Sakib Ahmed",
    email: "sakib@example.com",
    department: "Information Systems",
    skills: ["JavaScript", "Firebase", "Git"],
  },
];
