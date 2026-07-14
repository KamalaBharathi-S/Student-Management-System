import React, { createContext, useState, useEffect } from 'react';
import studentService from '../services/studentService';
import { DEPARTMENTS, STATUSES } from '../data/students';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    return studentService.getStudents();
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sms_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('sms_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const reloadStudents = () => {
    setStudents(studentService.getStudents());
  };

  const addStudent = (studentData) => {
    const newStudent = studentService.addStudent(studentData);
    reloadStudents();
    return newStudent;
  };

  const updateStudent = (id, studentData) => {
    studentService.updateStudent(id, studentData);
    reloadStudents();
  };

  const deleteStudent = (id) => {
    studentService.deleteStudent(id);
    reloadStudents();
  };

  const deleteStudentsBulk = (ids) => {
    studentService.deleteStudentsBulk(ids);
    reloadStudents();
  };

  const getStudentById = (id) => {
    return studentService.getStudentById(id);
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
      deleteStudentsBulk,
      getStudentById
    }}>
      {children}
    </StudentContext.Provider>
  );
};
export default StudentContext;
