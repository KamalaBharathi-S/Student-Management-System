export const initialAnnouncements = [
  {
    id: 'A001',
    title: 'Mid-Term Examination Schedule Released',
    category: 'Exam',
    description: 'The schedule for the upcoming mid-term exams has been published. Please check the attachment for details.',
    attachment: 'Midterm_Schedule.pdf',
    publishDate: '2026-07-10',
    expiryDate: '2026-07-30',
    audience: 'All Students',
    readBy: [],
  },
  {
    id: 'A002',
    title: 'Annual Tech Symposium - TechFest 2026',
    category: 'Event',
    description: 'We are thrilled to announce our annual tech symposium. Registrations are now open for all departments.',
    attachment: null,
    publishDate: '2026-07-12',
    expiryDate: '2026-08-15',
    audience: 'All Students',
    readBy: [],
  },
  {
    id: 'A003',
    title: 'Urgent: Maintenance Break',
    category: 'Urgent',
    description: 'The main server will be down for maintenance this weekend. The portal will be inaccessible.',
    attachment: null,
    publishDate: '2026-07-14',
    expiryDate: '2026-07-17',
    audience: 'All',
    readBy: [],
  }
];

export const initialDailyReports = [
  {
    id: 'R001',
    date: '2026-07-14',
    batch: 'CSE-2024',
    courseName: 'Data Structures and Algorithms',
    facultyName: 'Dr. Smith',
    topicsCovered: 'Binary Search Trees, AVL Trees, Rotations',
    attendanceSummary: '45/50 Present',
    performanceSummary: 'Most students understood the tree rotations well. Need to recap AVL balancing.',
    remarks: 'Good interactive session.',
    nextDayPlan: 'Red-Black Trees Introduction',
  },
  {
    id: 'R002',
    date: '2026-07-14',
    batch: 'ECE-2023',
    courseName: 'Digital Signal Processing',
    facultyName: 'Prof. Johnson',
    topicsCovered: 'Z-Transforms, ROC Properties',
    attendanceSummary: '38/40 Present',
    performanceSummary: 'Struggled slightly with inverse Z-transforms.',
    remarks: 'Will provide extra practice problems.',
    nextDayPlan: 'Fourier Transforms',
  }
];

export const initialDailyWorks = [
  {
    id: 'W001',
    title: 'Implement AVL Tree Rotations',
    subject: 'Data Structures',
    description: 'Write a C++ program to implement left and right rotations in an AVL tree.',
    attachment: 'AVL_Template.cpp',
    assignedDate: '2026-07-14',
    dueDate: '2026-07-16',
    batch: 'CSE-2024',
    priority: 'High',
    submissions: [
      { studentId: 'STU001', status: 'Submitted', file: 'solution.cpp', date: '2026-07-15', remarks: 'Good job.' }
    ]
  },
  {
    id: 'W002',
    title: 'Z-Transform Worksheet',
    subject: 'DSP',
    description: 'Complete the attached worksheet on Z-transform properties.',
    attachment: 'Worksheet_DSP.pdf',
    assignedDate: '2026-07-13',
    dueDate: '2026-07-15',
    batch: 'ECE-2023',
    priority: 'Medium',
    submissions: []
  }
];

// Mock data for a specific student's marks and attendance
export const studentPerformanceMock = {
  attendance: {
    percentage: 92,
    monthly: [
      { month: 'Jan', present: 20, total: 22 },
      { month: 'Feb', present: 19, total: 20 },
      { month: 'Mar', present: 22, total: 22 },
      { month: 'Apr', present: 18, total: 21 },
      { month: 'May', present: 21, total: 21 },
    ]
  },
  marks: [
    { subject: 'Data Structures', internal: 45, practical: 48, exam: 90, grade: 'A+' },
    { subject: 'Computer Networks', internal: 40, practical: 45, exam: 85, grade: 'A' },
    { subject: 'Operating Systems', internal: 42, practical: 40, exam: 88, grade: 'A' },
    { subject: 'Database Systems', internal: 48, practical: 49, exam: 95, grade: 'O' },
  ],
  tests: [
    { id: 'T001', title: 'Mid-term DSA Test', date: '2026-08-05', duration: '60 mins', status: 'Available' },
    { id: 'T002', title: 'Mock Test - OS', date: '2026-07-20', duration: '45 mins', status: 'Completed', score: '38/40' },
  ],
  notifications: [
    { id: 'N001', message: 'New Assignment: Implement AVL Tree Rotations', date: '2026-07-14', read: false },
    { id: 'N002', message: 'Urgent: Maintenance Break', date: '2026-07-14', read: false },
    { id: 'N003', message: 'Attendance Alert: You were marked absent on 2026-07-12', date: '2026-07-12', read: true },
  ]
};
