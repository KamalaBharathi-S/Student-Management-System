// ============================================================
//  EduManage – Single Classroom Data
//  Classroom : Class 8-A, Springdale Public School
// ============================================================

// ── ANNOUNCEMENTS ────────────────────────────────────────────
export const initialAnnouncements = [
  {
    id: 'A001',
    title: 'Annual Sports Day – 25th July 2025',
    category: 'Event',
    postedBy: 'Mrs. Priya Sharma (Class Teacher)',
    description:
      'The Annual Sports Day will be held on 25th July 2025 at the school sports ground. All students of Class 8-A must wear sports uniform. Parents are warmly invited.',
    publishDate: '2025-07-10',
    expiryDate: '2025-07-26',
    target: 'all',
    readBy: [],
  },
  {
    id: 'A002',
    title: 'Half Yearly Exam Schedule – August 2025',
    category: 'Exam',
    postedBy: 'Mrs. Priya Sharma (Class Teacher)',
    description:
      'Half Yearly examinations will commence from 5th August 2025. Students must check the timetable on the notice board and prepare subject-wise. Good luck!',
    publishDate: '2025-07-12',
    expiryDate: '2025-08-10',
    target: 'all',
    readBy: [],
  },
  {
    id: 'A003',
    title: 'Parent-Teacher Meeting – 20th July 2025',
    category: 'Notice',
    postedBy: 'Mrs. Priya Sharma (Class Teacher)',
    description:
      'Parent-Teacher Meeting is scheduled for 20th July 2025 between 9:00 AM and 1:00 PM. Parents are requested to attend to discuss their ward\'s academic progress.',
    publishDate: '2025-07-10',
    expiryDate: '2025-07-20',
    target: 'parent',
    readBy: [],
  },
  {
    id: 'A004',
    title: 'School Closed – 21st July (Public Holiday)',
    category: 'Holiday',
    postedBy: 'Mrs. Priya Sharma (Class Teacher)',
    description:
      'School will remain closed on Monday, 21st July 2025. Regular classes resume on 22nd July 2025.',
    publishDate: '2025-07-15',
    expiryDate: '2025-07-22',
    target: 'all',
    readBy: [],
  },
  {
    id: 'A005',
    title: 'Science Assignment – Reminder',
    category: 'Notice',
    postedBy: 'Mr. Rajan Iyer (Science Teacher)',
    description:
      'Reminder: The Water Cycle Working Model is due on 28th July 2025. Students who have not started are advised to begin immediately. Materials can be sourced from home.',
    publishDate: '2025-07-15',
    expiryDate: '2025-07-28',
    target: 'student',
    readBy: [],
  },
  {
    id: 'A006',
    title: 'Independence Day Celebration – 15th August',
    category: 'Event',
    postedBy: 'Mrs. Priya Sharma (Class Teacher)',
    description:
      'School will celebrate Independence Day on 15th August 2025. All students must report by 8:00 AM in full school uniform for the flag hoisting ceremony. Cultural programmes will follow.',
    publishDate: '2025-07-14',
    expiryDate: '2025-08-16',
    target: 'all',
    readBy: [],
  },
];

// ── DAILY LESSON LOG (Teacher posts daily after class) ───────
export const initialDailyReports = [
  {
    id: 'R001',
    date: '2025-07-15',
    subject: 'Mathematics',
    teacher: 'Mrs. Priya Sharma',
    topicsCovered: 'Chapter 9: Algebraic Identities – (a+b)², (a-b)², (a+b)(a-b)',
    description:
      'Explained all three standard identities with worked examples on the board. Students practised 10 problems individually. Most students understood well.',
    attendanceNote: '38/40 Present',
    nextDayPlan: 'Factorisation using algebraic identities (Exercise 9.2)',
  },
  {
    id: 'R002',
    date: '2025-07-15',
    subject: 'Science',
    teacher: 'Mr. Rajan Iyer',
    topicsCovered: 'Chapter 3: Synthetic Fibres and Plastics – Properties of Nylon and Polyester',
    description:
      'Discussed properties of nylon, polyester, and their everyday applications. Demonstrated fabric samples in class. Students were highly engaged.',
    attendanceNote: '38/40 Present',
    nextDayPlan: 'Disadvantages of plastics and environmental impact',
  },
  {
    id: 'R003',
    date: '2025-07-14',
    subject: 'English',
    teacher: 'Ms. Sunitha Nair',
    topicsCovered: 'Unit 2: A Short Monsoon Diary – Comprehension and Vocabulary',
    description:
      'Read the lesson aloud in class, discussed difficult vocabulary, and completed comprehension exercises. Students participated in pair reading.',
    attendanceNote: '37/40 Present',
    nextDayPlan: 'Grammar: Revision of Tenses – Present, Past, Future',
  },
  {
    id: 'R004',
    date: '2025-07-14',
    subject: 'Mathematics',
    teacher: 'Mrs. Priya Sharma',
    topicsCovered: 'Chapter 9: Introduction to Algebraic Expressions',
    description:
      'Introduced algebraic expressions, terms, factors, and coefficients. Worked through examples from the NCERT textbook. Exercise 9.1 given as homework.',
    attendanceNote: '39/40 Present',
    nextDayPlan: 'Standard algebraic identities',
  },
  {
    id: 'R005',
    date: '2025-07-14',
    subject: 'Social Studies',
    teacher: 'Mr. Anand Kumar',
    topicsCovered: 'Chapter 1: Resources – Types of Resources',
    description:
      'Discussed natural, human, and man-made resources with real-world examples. Students identified resources around them as a classroom activity.',
    attendanceNote: '36/40 Present',
    nextDayPlan: 'Conservation of resources – need and methods',
  },
];

// ── HOMEWORK ─────────────────────────────────────────────────
export const initialHomework = [
  {
    id: 'HW001',
    subject: 'Mathematics',
    teacher: 'Mrs. Priya Sharma',
    title: 'Algebraic Identities – Exercise 9.1',
    description: 'Solve Q1–Q10 from Exercise 9.1 on page 143. Show all working steps neatly in your notebook.',
    assignedDate: '2025-07-15',
    dueDate: '2025-07-17',
    submissions: [
      { studentId: 'ADM-2025-003', status: 'Submitted', date: '2025-07-16', remark: 'Good effort!' },
      { studentId: 'ADM-2025-002', status: 'Submitted', date: '2025-07-16', remark: 'Excellent!' },
    ],
  },
  {
    id: 'HW002',
    subject: 'Science',
    teacher: 'Mr. Rajan Iyer',
    title: 'Synthetic Fibres – Exercise Questions',
    description: 'Answer all questions in Exercise 3 (page 38 of NCERT). Write answers in your own words.',
    assignedDate: '2025-07-15',
    dueDate: '2025-07-18',
    submissions: [],
  },
  {
    id: 'HW003',
    subject: 'English',
    teacher: 'Ms. Sunitha Nair',
    title: 'Write a Paragraph – My School',
    description: 'Write a 150-word paragraph on "My School". Focus on correct grammar, punctuation, and neatness.',
    assignedDate: '2025-07-14',
    dueDate: '2025-07-17',
    submissions: [
      { studentId: 'ADM-2025-001', status: 'Submitted', date: '2025-07-16', remark: 'Well written. Good grammar!' },
      { studentId: 'ADM-2025-004', status: 'Submitted', date: '2025-07-15', remark: 'Neat and creative.' },
    ],
  },
  {
    id: 'HW004',
    subject: 'Tamil',
    teacher: 'Ms. Sunitha Nair',
    title: 'கட்டுரை – என் பள்ளி',
    description: 'Write a 100-word Tamil essay on "என் பள்ளி". Pay attention to grammar and handwriting.',
    assignedDate: '2025-07-14',
    dueDate: '2025-07-16',
    submissions: [
      { studentId: 'ADM-2025-001', status: 'Submitted', date: '2025-07-15', remark: 'Neat handwriting. Good effort.' },
    ],
  },
  {
    id: 'HW005',
    subject: 'Social Studies',
    teacher: 'Mr. Anand Kumar',
    title: 'Resources Worksheet',
    description: 'Complete the worksheet on Types of Resources distributed in class today.',
    assignedDate: '2025-07-14',
    dueDate: '2025-07-17',
    submissions: [],
  },
];

// ── ASSIGNMENTS ──────────────────────────────────────────────
export const initialAssignments = [
  {
    id: 'AS001',
    subject: 'Mathematics',
    teacher: 'Mrs. Priya Sharma',
    title: 'Geometry Constructions',
    description: 'Construct and identify different types of triangles using compass and ruler. Submit on A4 sheet with labels.',
    assignedDate: '2025-07-10',
    dueDate: '2025-07-25',
    maxMarks: 20,
    submissions: [
      { studentId: 'ADM-2025-002', status: 'Submitted', date: '2025-07-22', marks: 18, remark: 'Very neat constructions!' },
    ],
  },
  {
    id: 'AS002',
    subject: 'Science',
    teacher: 'Mr. Rajan Iyer',
    title: 'Water Cycle Working Model',
    description: 'Prepare a working model of the water cycle using available materials. Label all stages clearly.',
    assignedDate: '2025-07-10',
    dueDate: '2025-07-28',
    maxMarks: 30,
    submissions: [],
  },
  {
    id: 'AS003',
    subject: 'English',
    teacher: 'Ms. Sunitha Nair',
    title: 'My Holiday Story',
    description: 'Write a short story of 250 words titled "My Best Holiday". Include a moral at the end.',
    assignedDate: '2025-07-12',
    dueDate: '2025-07-22',
    maxMarks: 20,
    submissions: [
      { studentId: 'ADM-2025-001', status: 'Submitted', date: '2025-07-20', marks: 17, remark: 'Excellent narrative. Good vocabulary.' },
      { studentId: 'ADM-2025-004', status: 'Submitted', date: '2025-07-21', marks: 19, remark: 'Creative story. Well done!' },
    ],
  },
  {
    id: 'AS004',
    subject: 'Social Studies',
    teacher: 'Mr. Anand Kumar',
    title: 'Resource Conservation Poster',
    description: 'Create an A3 poster showing ways to conserve natural resources. Add diagrams and colour.',
    assignedDate: '2025-07-13',
    dueDate: '2025-07-24',
    maxMarks: 20,
    submissions: [],
  },
];

// ── STUDENT PERFORMANCE (Logged-in student view) ─────────────
export const studentPerformanceMock = {
  student: {
    name: 'Arjun Kumar',
    admissionNo: 'ADM-2025-001',
    rollNo: 1,
    className: '8',
    section: 'A',
    school: 'Springdale Public School',
    classTeacher: 'Mrs. Priya Sharma',
  },

  attendance: {
    percentage: 94,
    workingDays: 50,
    presentDays: 47,
    absentDays: 2,
    halfDays: 1,
    monthly: [
      { month: 'Jan', present: 20, total: 22 },
      { month: 'Feb', present: 18, total: 20 },
      { month: 'Mar', present: 22, total: 22 },
      { month: 'Apr', present: 20, total: 21 },
      { month: 'May', present: 24, total: 25 },
      { month: 'Jun', present: 20, total: 22 },
      { month: 'Jul', present: 14, total: 15 },
    ],
    records: [
      { date: '2025-07-15', status: 'Present'  },
      { date: '2025-07-14', status: 'Present'  },
      { date: '2025-07-11', status: 'Present'  },
      { date: '2025-07-10', status: 'Present'  },
      { date: '2025-07-09', status: 'Half-Day' },
      { date: '2025-07-08', status: 'Present'  },
      { date: '2025-07-07', status: 'Present'  },
      { date: '2025-07-04', status: 'Present'  },
      { date: '2025-07-03', status: 'Absent'   },
      { date: '2025-07-02', status: 'Present'  },
      { date: '2025-07-01', status: 'Present'  },
    ],
  },

  marks: [
    { subject: 'Mathematics',    ut1: 88, halfYearly: 82, grade: 'A+', maxMarks: 100 },
    { subject: 'Science',        ut1: 76, halfYearly: 79, grade: 'B+', maxMarks: 100 },
    { subject: 'English',        ut1: 92, halfYearly: 91, grade: 'A+', maxMarks: 100 },
    { subject: 'Tamil',          ut1: 85, halfYearly: 88, grade: 'A',  maxMarks: 100 },
    { subject: 'Social Studies', ut1: 80, halfYearly: 75, grade: 'A',  maxMarks: 100 },
  ],

  tests: [
    { id: 'T001', title: 'Maths Unit Test 2', duration: '45 mins', date: '2025-07-20', status: 'Available', score: null },
    { id: 'T002', title: 'Science Mock Quiz', duration: '30 mins', date: '2025-07-15', status: 'Completed', score: '25/30' },
  ],

  timetable: [
    { day: 'Monday',    periods: [
      { period: 1, subject: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  time: '8:00–8:45'  },
      { period: 2, subject: 'Science',        teacher: 'Mr. Rajan Iyer',     time: '8:45–9:30'  },
      { period: 3, subject: 'English',        teacher: 'Ms. Sunitha Nair',   time: '9:45–10:30' },
      { period: 4, subject: 'Tamil',          teacher: 'Ms. Sunitha Nair',   time: '10:30–11:15'},
      { period: 5, subject: 'Social Studies', teacher: 'Mr. Anand Kumar',    time: '11:30–12:15'},
    ]},
    { day: 'Tuesday',   periods: [
      { period: 1, subject: 'Science',        teacher: 'Mr. Rajan Iyer',     time: '8:00–8:45'  },
      { period: 2, subject: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  time: '8:45–9:30'  },
      { period: 3, subject: 'Tamil',          teacher: 'Ms. Sunitha Nair',   time: '9:45–10:30' },
      { period: 4, subject: 'English',        teacher: 'Ms. Sunitha Nair',   time: '10:30–11:15'},
      { period: 5, subject: 'Social Studies', teacher: 'Mr. Anand Kumar',    time: '11:30–12:15'},
    ]},
    { day: 'Wednesday', periods: [
      { period: 1, subject: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  time: '8:00–8:45'  },
      { period: 2, subject: 'English',        teacher: 'Ms. Sunitha Nair',   time: '8:45–9:30'  },
      { period: 3, subject: 'Science',        teacher: 'Mr. Rajan Iyer',     time: '9:45–10:30' },
      { period: 4, subject: 'Social Studies', teacher: 'Mr. Anand Kumar',    time: '10:30–11:15'},
      { period: 5, subject: 'Tamil',          teacher: 'Ms. Sunitha Nair',   time: '11:30–12:15'},
    ]},
    { day: 'Thursday',  periods: [
      { period: 1, subject: 'Tamil',          teacher: 'Ms. Sunitha Nair',   time: '8:00–8:45'  },
      { period: 2, subject: 'Social Studies', teacher: 'Mr. Anand Kumar',    time: '8:45–9:30'  },
      { period: 3, subject: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  time: '9:45–10:30' },
      { period: 4, subject: 'Science',        teacher: 'Mr. Rajan Iyer',     time: '10:30–11:15'},
      { period: 5, subject: 'English',        teacher: 'Ms. Sunitha Nair',   time: '11:30–12:15'},
    ]},
    { day: 'Friday',    periods: [
      { period: 1, subject: 'English',        teacher: 'Ms. Sunitha Nair',   time: '8:00–8:45'  },
      { period: 2, subject: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  time: '8:45–9:30'  },
      { period: 3, subject: 'Tamil',          teacher: 'Ms. Sunitha Nair',   time: '9:45–10:30' },
      { period: 4, subject: 'Science',        teacher: 'Mr. Rajan Iyer',     time: '10:30–11:15'},
      { period: 5, subject: 'Social Studies', teacher: 'Mr. Anand Kumar',    time: '11:30–12:15'},
    ]},
    { day: 'Saturday',  periods: [
      { period: 1, subject: 'Mathematics',    teacher: 'Mrs. Priya Sharma',  time: '8:00–8:45'  },
      { period: 2, subject: 'Science',        teacher: 'Mr. Rajan Iyer',     time: '8:45–9:30'  },
      { period: 3, subject: 'English',        teacher: 'Ms. Sunitha Nair',   time: '9:45–10:30' },
    ]},
  ],

  homework: [
    { id: 'HW001', subject: 'Mathematics',    title: 'Algebraic Identities – Exercise 9.1',   dueDate: '2025-07-17', status: 'Pending'   },
    { id: 'HW002', subject: 'Science',        title: 'Synthetic Fibres – Exercise Questions', dueDate: '2025-07-18', status: 'Pending'   },
    { id: 'HW003', subject: 'English',        title: 'Write a Paragraph – My School',         dueDate: '2025-07-17', status: 'Submitted' },
    { id: 'HW004', subject: 'Tamil',          title: 'கட்டுரை – என் பள்ளி',                   dueDate: '2025-07-16', status: 'Submitted' },
    { id: 'HW005', subject: 'Social Studies', title: 'Resources Worksheet',                   dueDate: '2025-07-17', status: 'Pending'   },
  ],

  assignments: [
    { id: 'AS001', subject: 'Mathematics',    title: 'Geometry Constructions',       dueDate: '2025-07-25', maxMarks: 20, status: 'Pending',   marksAwarded: null  },
    { id: 'AS002', subject: 'Science',        title: 'Water Cycle Working Model',    dueDate: '2025-07-28', maxMarks: 30, status: 'Pending',   marksAwarded: null  },
    { id: 'AS003', subject: 'English',        title: 'My Holiday Story',             dueDate: '2025-07-22', maxMarks: 20, status: 'Submitted', marksAwarded: 17    },
    { id: 'AS004', subject: 'Social Studies', title: 'Resource Conservation Poster', dueDate: '2025-07-24', maxMarks: 20, status: 'Pending',   marksAwarded: null  },
  ],

  fees: [
    { feeType: 'Tuition Fee',   totalAmount: 5000, paidAmount: 5000, dueDate: '2025-06-30', status: 'Paid',    receiptNo: 'RCP-2025-001' },
    { feeType: 'Exam Fee',      totalAmount: 500,  paidAmount: 500,  dueDate: '2025-06-30', status: 'Paid',    receiptNo: 'RCP-2025-002' },
    { feeType: 'Sports Fee',    totalAmount: 300,  paidAmount: 0,    dueDate: '2025-07-31', status: 'Pending', receiptNo: null },
    { feeType: 'Library Fee',   totalAmount: 200,  paidAmount: 200,  dueDate: '2025-06-30', status: 'Paid',    receiptNo: 'RCP-2025-003' },
    { feeType: 'Transport Fee', totalAmount: 1500, paidAmount: 0,    dueDate: '2025-07-31', status: 'Pending', receiptNo: null },
  ],

  library: [
    { bookTitle: 'NCERT Science Class 8', author: 'NCERT', issueDate: '2025-07-10', dueDate: '2025-07-24', status: 'Issued' },
  ],

  notifications: [
    { id: 'N001', message: 'New Homework: Algebraic Identities – due 17th July',          date: '2025-07-15', read: false },
    { id: 'N002', message: 'New Homework: Synthetic Fibres Q&A – due 18th July',           date: '2025-07-15', read: false },
    { id: 'N003', message: 'PTM scheduled on 20th July – Parents are requested to attend', date: '2025-07-14', read: false },
    { id: 'N004', message: 'You were marked Absent on 3rd July 2025',                      date: '2025-07-03', read: true  },
    { id: 'N005', message: 'Sports Fee of ₹300 is due by 31st July 2025',                  date: '2025-07-10', read: true  },
    { id: 'N006', message: 'Half Yearly Exam schedule has been released',                   date: '2025-07-12', read: true  },
    { id: 'N007', message: 'English Assignment "My Holiday Story" – Marks: 17/20',         date: '2025-07-20', read: false },
  ],
};

// ── DAILY WORKS (alias kept for AcademyContext compatibility) ─
export const initialDailyWorks = initialHomework.map(hw => ({
  ...hw,
  batch: 'Class 8-A',
  priority: 'Medium',
}));
