import React, { createContext, useState, useEffect } from 'react';

export const StudentContext = createContext();

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration"
];

const STATUSES = ["Active", "Inactive", "Graduated", "Suspended"];

const MOCK_STUDENTS = [
  {
    id: "STU-2026-001",
    firstName: "Alexander",
    lastName: "Wright",
    email: "alexander.wright@university.edu",
    phone: "+1 (555) 234-5678",
    dob: "2003-04-12",
    gender: "Male",
    department: "Computer Science",
    enrollmentDate: "2021-09-01",
    gpa: 3.82,
    status: "Active",
    address: "742 Evergreen Terrace, Springfield",
    avatarColor: "linear-gradient(135deg, #6366f1, #818cf8)"
  },
  {
    id: "STU-2026-002",
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.martinez@university.edu",
    phone: "+1 (555) 876-5432",
    dob: "2004-11-23",
    gender: "Female",
    department: "Information Technology",
    enrollmentDate: "2022-09-01",
    gpa: 3.91,
    status: "Active",
    address: "123 Maple Street, Riverdale",
    avatarColor: "linear-gradient(135deg, #ec4899, #f43f5e)"
  },
  {
    id: "STU-2026-003",
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus.chen@university.edu",
    phone: "+1 (555) 345-6789",
    dob: "2002-08-15",
    gender: "Male",
    department: "Computer Science",
    enrollmentDate: "2020-09-01",
    gpa: 3.45,
    status: "Graduated",
    address: "456 Oak Avenue, Metropolis",
    avatarColor: "linear-gradient(135deg, #10b981, #059669)"
  },
  {
    id: "STU-2026-004",
    firstName: "Emma",
    lastName: "Taylor",
    email: "emma.taylor@university.edu",
    phone: "+1 (555) 765-4321",
    dob: "2003-01-30",
    gender: "Female",
    department: "Electrical Engineering",
    enrollmentDate: "2021-09-01",
    gpa: 3.68,
    status: "Active",
    address: "789 Pine Lane, Gotham",
    avatarColor: "linear-gradient(135deg, #f59e0b, #d97706)"
  },
  {
    id: "STU-2026-005",
    firstName: "Liam",
    lastName: "O'Connor",
    email: "liam.oconnor@university.edu",
    phone: "+1 (555) 456-7890",
    dob: "2004-06-05",
    gender: "Male",
    department: "Mechanical Engineering",
    enrollmentDate: "2022-09-01",
    gpa: 2.92,
    status: "Inactive",
    address: "321 Cedar Boulevard, Star City",
    avatarColor: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
  },
  {
    id: "STU-2026-006",
    firstName: "Aria",
    lastName: "Patel",
    email: "aria.patel@university.edu",
    phone: "+1 (555) 987-6543",
    dob: "2003-09-18",
    gender: "Female",
    department: "Business Administration",
    enrollmentDate: "2021-09-01",
    gpa: 3.75,
    status: "Active",
    address: "555 Birch Road, Central City",
    avatarColor: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
  },
  {
    id: "STU-2026-007",
    firstName: "Lucas",
    lastName: "Jackson",
    email: "lucas.jackson@university.edu",
    phone: "+1 (555) 567-8901",
    dob: "2005-02-14",
    gender: "Male",
    department: "Civil Engineering",
    enrollmentDate: "2023-09-01",
    gpa: 3.12,
    status: "Active",
    address: "888 Elm Way, Coast City",
    avatarColor: "linear-gradient(135deg, #06b6d4, #0891b2)"
  },
  {
    id: "STU-2026-008",
    firstName: "Olivia",
    lastName: "Kim",
    email: "olivia.kim@university.edu",
    phone: "+1 (555) 098-7654",
    dob: "2002-12-05",
    gender: "Female",
    department: "Computer Science",
    enrollmentDate: "2020-09-01",
    gpa: 3.98,
    status: "Graduated",
    address: "111 Redwood Highway, Hill Valley",
    avatarColor: "linear-gradient(135deg, #10b981, #3b82f6)"
  },
  {
    id: "STU-2026-009",
    firstName: "Ethan",
    lastName: "Davis",
    email: "ethan.davis@university.edu",
    phone: "+1 (555) 678-9012",
    dob: "2003-07-22",
    gender: "Male",
    department: "Mechanical Engineering",
    enrollmentDate: "2021-09-01",
    gpa: 2.45,
    status: "Suspended",
    address: "222 Spruce Circle, Sunnydale",
    avatarColor: "linear-gradient(135deg, #ef4444, #dc2626)"
  },
  {
    id: "STU-2026-010",
    firstName: "Isabella",
    lastName: "Rossi",
    email: "isabella.rossi@university.edu",
    phone: "+1 (555) 123-9876",
    dob: "2004-10-09",
    gender: "Female",
    department: "Business Administration",
    enrollmentDate: "2022-09-01",
    gpa: 3.58,
    status: "Active",
    address: "333 Willow Terrace, Mystic Falls",
    avatarColor: "linear-gradient(135deg, #f43f5e, #db2777)"
  }
];

const GRADIENTS = [
  "linear-gradient(135deg, #6366f1, #818cf8)",
  "linear-gradient(135deg, #ec4899, #f43f5e)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  "linear-gradient(135deg, #06b6d4, #0891b2)"
];

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('sms_students');
    return saved ? JSON.parse(saved) : MOCK_STUDENTS;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sms_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('sms_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sms_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addStudent = (studentData) => {
    const randomGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    const year = new Date().getFullYear();
    const nextNum = students.length > 0 
      ? Math.max(...students.map(s => parseInt(s.id.split('-')[2]) || 0)) + 1 
      : 1;
    const formattedNum = String(nextNum).padStart(3, '0');
    const newId = `STU-${year}-${formattedNum}`;

    const newStudent = {
      id: newId,
      ...studentData,
      avatarColor: randomGradient,
      gpa: parseFloat(studentData.gpa) || 0.0
    };

    setStudents(prev => [newStudent, ...prev]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => prev.map(student => 
      student.id === id 
        ? { ...student, ...updatedData, gpa: parseFloat(updatedData.gpa) || 0.0 }
        : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const getStudentById = (id) => {
    return students.find(student => student.id === id);
  };

  return (
    <StudentContext.Provider value={{
      students,
      departments: DEPARTMENTS,
      statuses: STATUSES,
      theme,
      toggleTheme,
      addStudent,
      updateStudent,
      deleteStudent,
      getStudentById
    }}>
      {children}
    </StudentContext.Provider>
  );
};
