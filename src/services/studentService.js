import { MOCK_STUDENTS, GRADIENTS } from '../data/students';

const STORAGE_KEY = 'sms_students_data';

export const studentService = {
  getStudents: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_STUDENTS));
      return MOCK_STUDENTS;
    }
    return JSON.parse(data);
  },

  saveStudents: (students) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  },

  getStudentById: (id) => {
    const students = studentService.getStudents();
    return students.find(s => s.id === id);
  },

  addStudent: (studentData) => {
    const students = studentService.getStudents();
    
    // Auto-generate id & avatar color & dates
    const randomGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    const yearPrefix = new Date().getFullYear();
    const nextNum = students.length > 0 
      ? Math.max(...students.map(s => parseInt(s.id.split('-')[2]) || 0)) + 1 
      : 1;
    const formattedNum = String(nextNum).padStart(3, '0');
    const newId = `STU-${yearPrefix}-${formattedNum}`;

    const newStudent = {
      id: newId,
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      department: studentData.department,
      year: String(studentData.year),
      gender: studentData.gender,
      dateOfBirth: studentData.dateOfBirth,
      address: studentData.address,
      createdAt: new Date().toISOString(),
      gpa: parseFloat(studentData.gpa) || 0.0,
      status: studentData.status || 'Active',
      avatarColor: randomGradient
    };

    const updated = [newStudent, ...students];
    studentService.saveStudents(updated);
    return newStudent;
  },

  updateStudent: (id, studentData) => {
    const students = studentService.getStudents();
    const updated = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          name: studentData.name,
          email: studentData.email,
          phone: studentData.phone,
          department: studentData.department,
          year: String(studentData.year),
          gender: studentData.gender,
          dateOfBirth: studentData.dateOfBirth,
          address: studentData.address,
          gpa: parseFloat(studentData.gpa) || 0.0,
          status: studentData.status
        };
      }
      return student;
    });
    studentService.saveStudents(updated);
  },

  deleteStudent: (id) => {
    const students = studentService.getStudents();
    const filtered = students.filter(s => s.id !== id);
    studentService.saveStudents(filtered);
    return filtered;
  },

  deleteStudentsBulk: (ids) => {
    const students = studentService.getStudents();
    const filtered = students.filter(s => !ids.includes(s.id));
    studentService.saveStudents(filtered);
    return filtered;
  }
};
export default studentService;
