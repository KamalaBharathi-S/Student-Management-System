// ============================================================
//  Single Classroom Mock Data
//  Classroom: Class 8-A, Springdale Public School
//  Academic Year: 2025-26
// ============================================================

// ── CLASSROOM INFO ───────────────────────────────────────────
export const CLASSROOM = {
  className: '8',
  section: 'A',
  academicYear: '2025-26',
  schoolName: 'Springdale Public School',
  classTeacher: 'Mrs. Priya Sharma',
  totalStudents: 6,
};

// ── SUBJECTS TAUGHT IN THIS CLASS ───────────────────────────
export const SUBJECTS = [
  { name: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  icon: '📐' },
  { name: 'Science',        teacher: 'Mr. Rajan Iyer',     icon: '🔬' },
  { name: 'English',        teacher: 'Ms. Sunitha Nair',   icon: '📖' },
  { name: 'Tamil',          teacher: 'Ms. Sunitha Nair',   icon: '🅰' },
  { name: 'Social Studies', teacher: 'Mr. Anand Kumar',    icon: '🌍' },
];

// ── SUBJECT TEACHERS ─────────────────────────────────────────
export const TEACHERS = [
  {
    id: 'EMP-001',
    name: 'Mrs. Priya Sharma',
    username: 'teacher1',
    subject: 'Mathematics',
    isClassTeacher: true,
    qualification: 'B.Ed, M.Sc Mathematics',
    experience: 12,
    phone: '9876500001',
    email: 'priya.sharma@springdale.edu.in',
    avatarColor: 'linear-gradient(135deg, #6366f1, #818cf8)',
  },
  {
    id: 'EMP-002',
    name: 'Mr. Rajan Iyer',
    username: 'teacher_rajan',
    subject: 'Science',
    isClassTeacher: false,
    qualification: 'B.Ed, M.Sc Physics',
    experience: 20,
    phone: '9876500002',
    email: 'rajan.iyer@springdale.edu.in',
    avatarColor: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 'EMP-003',
    name: 'Ms. Sunitha Nair',
    username: 'teacher_sunitha',
    subject: 'English & Tamil',
    isClassTeacher: false,
    qualification: 'B.Ed, MA English Literature',
    experience: 10,
    phone: '9876500003',
    email: 'sunitha.nair@springdale.edu.in',
    avatarColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 'EMP-004',
    name: 'Mr. Anand Kumar',
    username: 'teacher_anand',
    subject: 'Social Studies',
    isClassTeacher: false,
    qualification: 'B.Ed, MA History',
    experience: 8,
    phone: '9876500004',
    email: 'anand.kumar@springdale.edu.in',
    avatarColor: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  },
];

// ── STUDENTS (All in Class 8-A) ──────────────────────────────
export const MOCK_STUDENTS = [
  {
    id: 'ADM-2025-001',
    name: 'Arjun Kumar',
    username: 'student1',
    rollNo: 1,
    gender: 'Male',
    dateOfBirth: '2012-06-18',
    bloodGroup: 'B+',
    phone: '9876500005',
    email: 'arjun.kumar@student.springdale.edu.in',
    address: '12, Gandhi Nagar, Chennai - 600020',
    parentName: 'Suresh Kumar',
    parentPhone: '9876500011',
    parentUsername: 'parent1',
    status: 'Active',
    avatarColor: 'linear-gradient(135deg, #6366f1, #818cf8)',
  },
  {
    id: 'ADM-2025-002',
    name: 'Meena Lakshmi',
    username: 'student_meena',
    rollNo: 2,
    gender: 'Female',
    dateOfBirth: '2012-09-30',
    bloodGroup: 'O+',
    phone: '9876500006',
    email: 'meena.lakshmi@student.springdale.edu.in',
    address: '45, Nehru Street, Chennai - 600010',
    parentName: 'Lakshmi Devi',
    parentPhone: '9876500012',
    parentUsername: 'parent_lakshmi',
    status: 'Active',
    avatarColor: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    id: 'ADM-2025-003',
    name: 'Kiran Raj',
    username: 'student_kiran',
    rollNo: 3,
    gender: 'Male',
    dateOfBirth: '2012-01-14',
    bloodGroup: 'A-',
    phone: '9876500007',
    email: 'kiran.raj@student.springdale.edu.in',
    address: '78, Patel Road, Chennai - 600015',
    parentName: 'Ramesh Raj',
    parentPhone: '9876500013',
    parentUsername: 'parent_ramesh',
    status: 'Active',
    avatarColor: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 'ADM-2025-004',
    name: 'Anitha Selvam',
    username: 'student_anitha',
    rollNo: 4,
    gender: 'Female',
    dateOfBirth: '2012-04-25',
    bloodGroup: 'AB+',
    phone: '9876500008',
    email: 'anitha.selvam@student.springdale.edu.in',
    address: '33, Anna Salai, Chennai - 600002',
    parentName: 'Geetha Selvam',
    parentPhone: '9876500014',
    parentUsername: 'parent_geetha',
    status: 'Active',
    avatarColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 'ADM-2025-005',
    name: 'Rohit Patel',
    username: 'student_rohit',
    rollNo: 5,
    gender: 'Male',
    dateOfBirth: '2012-12-03',
    bloodGroup: 'B+',
    phone: '9876500009',
    email: 'rohit.patel@student.springdale.edu.in',
    address: '56, MG Road, Chennai - 600034',
    parentName: 'Mohan Patel',
    parentPhone: '9876500015',
    parentUsername: 'parent_mohan',
    status: 'Active',
    avatarColor: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  },
  {
    id: 'ADM-2025-006',
    name: 'Divya Menon',
    username: 'student_divya',
    rollNo: 6,
    gender: 'Female',
    dateOfBirth: '2012-11-19',
    bloodGroup: 'O-',
    phone: '9876500010',
    email: 'divya.menon@student.springdale.edu.in',
    address: '11, Rajaji Nagar, Chennai - 600041',
    parentName: 'N/A',
    parentPhone: 'N/A',
    parentUsername: null,
    status: 'Active',
    avatarColor: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
];

// ── AVATAR GRADIENTS ─────────────────────────────────────────
export const GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #818cf8)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
];

// Legacy alias
export const DEPARTMENTS = SUBJECTS.map(s => s.name);
export const STATUSES = ['Active', 'Inactive', 'Leave', 'Transferred'];
