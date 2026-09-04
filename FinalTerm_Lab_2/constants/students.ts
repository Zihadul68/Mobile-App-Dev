export type Student = {
  id: string;
  name: string;
  studentId: string;
  email: string;
  skills: string[];
};

export const initialStudents: Student[] = [
  {
    id: "1",
    name: "Aisha Rahman",
    studentId: "22-47087-1",
    email: "aisha@example.com",
    skills: ["React", "TypeScript", "UI Design"],
  },
  {
    id: "2",
    name: "Tanvir Hasan",
    studentId: "22-47088-1",
    email: "tanvir@example.com",
    skills: ["React Native", "Node.js"],
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    studentId: "22-47089-1",
    email: "nusrat@example.com",
    skills: ["Python", "Data Analysis", "SQL", "Git"],
  },
  {
    id: "4",
    name: "Sakib Ahmed",
    studentId: "22-47090-1",
    email: "sakib@example.com",
    skills: ["JavaScript", "Firebase", "Git"],
  },
];
