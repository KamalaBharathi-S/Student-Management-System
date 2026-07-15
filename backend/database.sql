-- ============================================================
--  EduManage School Management System – Database Schema
--  SINGLE CLASSROOM MODEL
--
--  Core Concept:
--  ► One fixed classroom  : Class 8-A, Springdale Public School
--  ► Subject Teachers     : Each teaches one/more subjects to this class
--  ► Class Teacher        : Manages overall class affairs
--  ► Students             : All belong to this one class
--  ► Parents              : Linked to their child (read-only view)
--
--  Daily Flow:
--  Teachers  → mark attendance, post homework/assignments, enter marks,
--              record daily lessons, make announcements
--  Students  → view updates, submit homework/assignments, check timetable
--  Parents   → view all modules of their child (read-only)
-- ============================================================

CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- ============================================================
-- 1. USERS TABLE
--    Single source of truth for login credentials.
--    role: 'teacher' | 'student' | 'parent'
-- ============================================================
CREATE TABLE users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)  UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,       -- bcrypt hashed
    role        ENUM('teacher','student','parent') NOT NULL,
    is_active   TINYINT(1) DEFAULT 1,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. CLASSROOM TABLE
--    Single record describing the classroom.
--    All students and subject teachers belong to this classroom.
-- ============================================================
CREATE TABLE classroom (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    class_name      VARCHAR(10)  NOT NULL DEFAULT '8',
    section         VARCHAR(5)   NOT NULL DEFAULT 'A',
    academic_year   VARCHAR(10)  NOT NULL DEFAULT '2025-26',
    school_name     VARCHAR(150) NOT NULL DEFAULT 'Springdale Public School',
    class_teacher_user_id INT,
    FOREIGN KEY (class_teacher_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 3. BIODATA TABLE
--    Personal/profile information for any user (teacher/student/parent).
-- ============================================================
CREATE TABLE biodata (
    user_id     INT PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    gender      ENUM('Male','Female','Other'),
    dob         DATE,
    blood_group ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'),
    phone       VARCHAR(20),
    email       VARCHAR(100),
    address     TEXT,
    city        VARCHAR(100),
    photo_url   VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 4. TEACHERS TABLE
--    Subject teacher details. Each teacher teaches one subject in the class.
-- ============================================================
CREATE TABLE teachers (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    user_id                 INT UNIQUE NOT NULL,
    employee_id             VARCHAR(20) UNIQUE,
    subject_name            VARCHAR(100) NOT NULL, -- Subject they teach in this class
    qualification           VARCHAR(150),
    experience_years        INT DEFAULT 0,
    join_date               DATE,
    is_class_teacher        TINYINT(1) DEFAULT 0,  -- 1 = class teacher of this room
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 5. STUDENTS TABLE
--    All students belong to the single classroom.
-- ============================================================
CREATE TABLE students (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNIQUE NOT NULL,
    admission_no    VARCHAR(30) UNIQUE NOT NULL,
    roll_no         INT NOT NULL,
    parent_user_id  INT,
    admission_date  DATE,
    FOREIGN KEY (user_id)        REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 6. ATTENDANCE TABLE
--    Daily attendance for each student.
--    Marked by the class teacher or any subject teacher.
-- ============================================================
CREATE TABLE attendance (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    student_id  INT NOT NULL,
    date        DATE NOT NULL,
    status      ENUM('Present','Absent','Half-Day','Leave') NOT NULL,
    reason      VARCHAR(255),
    marked_by   INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by)  REFERENCES users(id)   ON DELETE SET NULL,
    UNIQUE KEY uq_student_date (student_id, date)
);

-- ============================================================
-- 7. TIMETABLE TABLE
--    Weekly schedule for the classroom.
-- ============================================================
CREATE TABLE timetable (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week     ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
    period_no       INT NOT NULL,
    subject_name    VARCHAR(100) NOT NULL,
    teacher_user_id INT,
    start_time      TIME NOT NULL,
    end_time        TIME NOT NULL,
    room_no         VARCHAR(20) DEFAULT 'Room 101',
    FOREIGN KEY (teacher_user_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY uq_day_period (day_of_week, period_no)
);

-- ============================================================
-- 8. DAILY LESSON LOG TABLE
--    Teacher records what was taught each day (daily diary).
--    Parents and students can see this to track progress.
-- ============================================================
CREATE TABLE daily_lesson_log (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    teacher_user_id INT NOT NULL,
    subject_name    VARCHAR(100) NOT NULL,
    log_date        DATE NOT NULL,
    topic_covered   VARCHAR(255) NOT NULL,
    description     TEXT,
    attendance_note VARCHAR(100),   -- e.g. "38/40 Present"
    next_day_plan   VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_teacher_date_subject (teacher_user_id, log_date, subject_name)
);

-- ============================================================
-- 9. HOMEWORK TABLE
--    Homework posted by subject teachers.
-- ============================================================
CREATE TABLE homework (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    teacher_user_id INT NOT NULL,
    subject_name    VARCHAR(100) NOT NULL,
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    assigned_date   DATE NOT NULL,
    due_date        DATE NOT NULL,
    FOREIGN KEY (teacher_user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 10. HOMEWORK SUBMISSIONS TABLE
--     Student marks homework as done / teacher acknowledges.
-- ============================================================
CREATE TABLE homework_submissions (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    homework_id     INT NOT NULL,
    student_id      INT NOT NULL,
    status          ENUM('Pending','Submitted','Late','Not Done') DEFAULT 'Pending',
    submitted_on    DATE,
    teacher_remark  VARCHAR(255),
    FOREIGN KEY (homework_id) REFERENCES homework(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id)  REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY uq_hw_student (homework_id, student_id)
);

-- ============================================================
-- 11. ASSIGNMENTS TABLE
--     Assignments / projects posted by subject teachers.
-- ============================================================
CREATE TABLE assignments (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    teacher_user_id INT NOT NULL,
    subject_name    VARCHAR(100) NOT NULL,
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    assigned_date   DATE NOT NULL,
    due_date        DATE NOT NULL,
    max_marks       DECIMAL(5,2) DEFAULT 20.00,
    FOREIGN KEY (teacher_user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 12. ASSIGNMENT SUBMISSIONS TABLE
--     Student submissions; teacher can add marks/remarks.
-- ============================================================
CREATE TABLE assignment_submissions (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id   INT NOT NULL,
    student_id      INT NOT NULL,
    status          ENUM('Pending','Submitted','Late','Not Submitted') DEFAULT 'Pending',
    submitted_on    DATE,
    marks_awarded   DECIMAL(5,2),
    teacher_remark  VARCHAR(255),
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id)    REFERENCES students(id)   ON DELETE CASCADE,
    UNIQUE KEY uq_assign_student (assignment_id, student_id)
);

-- ============================================================
-- 13. MARKS TABLE
--     Exam marks entered by subject teachers per student.
-- ============================================================
CREATE TABLE marks (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    student_id      INT NOT NULL,
    subject_name    VARCHAR(100) NOT NULL,
    exam_type       ENUM('Unit Test 1','Unit Test 2','Half Yearly','Annual','Quarterly','Practice Test') NOT NULL,
    marks_obtained  DECIMAL(5,2) NOT NULL,
    max_marks       DECIMAL(5,2) NOT NULL DEFAULT 100,
    grade           VARCHAR(5),
    entered_by      INT,   -- teacher who entered
    date_recorded   DATE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (entered_by) REFERENCES users(id)    ON DELETE SET NULL,
    UNIQUE KEY uq_marks (student_id, subject_name, exam_type)
);

-- ============================================================
-- 14. ANNOUNCEMENTS TABLE
--     Teacher posts announcements; parents & students see them.
-- ============================================================
CREATE TABLE announcements (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    teacher_user_id INT,
    title       VARCHAR(200) NOT NULL,
    content     TEXT NOT NULL,
    category    ENUM('Exam','Holiday','Event','Notice','Urgent','General') DEFAULT 'General',
    target      ENUM('all','student','parent') DEFAULT 'all',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- 15. ACADEMIC FEES TABLE
--     Fee records per student.
-- ============================================================
CREATE TABLE academic_fees (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    student_id      INT NOT NULL,
    fee_type        ENUM('Tuition Fee','Exam Fee','Sports Fee','Library Fee','Transport Fee','Miscellaneous') NOT NULL,
    academic_year   VARCHAR(10) NOT NULL DEFAULT '2025-26',
    total_amount    DECIMAL(10,2) NOT NULL,
    paid_amount     DECIMAL(10,2) DEFAULT 0.00,
    due_date        DATE NOT NULL,
    paid_date       DATE,
    status          ENUM('Paid','Pending','Overdue','Waived') DEFAULT 'Pending',
    receipt_no      VARCHAR(50),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- ============================================================
-- 16. LIBRARY TABLE  (Books available in class/school library)
-- ============================================================
CREATE TABLE library (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    book_title      VARCHAR(200) NOT NULL,
    author          VARCHAR(100),
    subject         VARCHAR(100),
    isbn            VARCHAR(50),
    publisher       VARCHAR(100),
    total_copies    INT DEFAULT 1,
    available_copies INT DEFAULT 1
);

-- ============================================================
-- 17. LIBRARY RECORDS TABLE  (Borrow/return log)
-- ============================================================
CREATE TABLE library_records (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    book_id     INT NOT NULL,
    student_id  INT NOT NULL,
    issue_date  DATE NOT NULL,
    due_date    DATE NOT NULL,
    return_date DATE,
    fine_amount DECIMAL(6,2) DEFAULT 0.00,
    status      ENUM('Issued','Returned','Overdue') DEFAULT 'Issued',
    FOREIGN KEY (book_id)   REFERENCES library(id)  ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- ============================================================
-- ============================================================
--  SAMPLE DATA  (password = "password"  bcrypt hash below)
-- ============================================================
-- ============================================================

-- ── USERS ────────────────────────────────────────────────────
INSERT INTO users (username, password, role) VALUES
-- Subject / Class Teachers
('teacher1',       '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher'),  -- Class Teacher  (Mathematics)
('teacher_rajan',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher'),  -- Science
('teacher_sunitha','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher'),  -- English & Tamil
('teacher_anand',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher'),  -- Social Studies
-- Students (all in Class 8-A)
('student1',       '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('student_meena',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('student_kiran',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('student_anitha', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('student_rohit',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('student_divya',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
-- Parents (each linked to their child)
('parent1',        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent'),
('parent_lakshmi', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent'),
('parent_ramesh',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent'),
('parent_geetha',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent'),
('parent_mohan',   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent');

-- ── CLASSROOM ────────────────────────────────────────────────
INSERT INTO classroom (class_name, section, academic_year, school_name, class_teacher_user_id)
VALUES ('8', 'A', '2025-26', 'Springdale Public School', 1);

-- ── BIODATA ──────────────────────────────────────────────────
INSERT INTO biodata (user_id, first_name, last_name, gender, dob, blood_group, phone, email, city) VALUES
-- Teachers
(1, 'Priya',   'Sharma',  'Female','1988-03-22','B+','9876500001','priya.sharma@springdale.edu.in',  'Chennai'),
(2, 'Rajan',   'Iyer',    'Male',  '1975-11-10','O+','9876500002','rajan.iyer@springdale.edu.in',    'Chennai'),
(3, 'Sunitha', 'Nair',    'Female','1990-07-05','A+','9876500003','sunitha.nair@springdale.edu.in',  'Chennai'),
(4, 'Anand',   'Kumar',   'Male',  '1982-05-18','B-','9876500004','anand.kumar@springdale.edu.in',   'Chennai'),
-- Students
(5, 'Arjun',   'Kumar',   'Male',  '2012-06-18','B+','9876500005','arjun.kumar@student.springdale.edu.in',   'Chennai'),
(6, 'Meena',   'Lakshmi', 'Female','2012-09-30','O+','9876500006','meena.lakshmi@student.springdale.edu.in', 'Chennai'),
(7, 'Kiran',   'Raj',     'Male',  '2012-01-14','A-','9876500007','kiran.raj@student.springdale.edu.in',     'Chennai'),
(8, 'Anitha',  'Selvam',  'Female','2012-04-25','AB+','9876500008','anitha.selvam@student.springdale.edu.in','Chennai'),
(9, 'Rohit',   'Patel',   'Male',  '2012-12-03','B+','9876500009','rohit.patel@student.springdale.edu.in',   'Chennai'),
(10,'Divya',   'Menon',   'Female','2012-11-19','O-','9876500010','divya.menon@student.springdale.edu.in',   'Chennai'),
-- Parents
(11,'Suresh',  'Kumar',   'Male',  '1978-05-20','O+','9876500011','suresh.kumar@gmail.com',     'Chennai'),
(12,'Lakshmi', 'Devi',    'Female','1982-08-15','A+','9876500012','lakshmi.devi@gmail.com',     'Chennai'),
(13,'Ramesh',  'Raj',     'Male',  '1979-03-10','B+','9876500013','ramesh.raj@gmail.com',       'Chennai'),
(14,'Geetha',  'Selvam',  'Female','1983-07-22','O+','9876500014','geetha.selvam@gmail.com',    'Chennai'),
(15,'Mohan',   'Patel',   'Male',  '1980-01-05','A-','9876500015','mohan.patel@gmail.com',      'Chennai');

-- ── TEACHERS ─────────────────────────────────────────────────
INSERT INTO teachers (user_id, employee_id, subject_name, qualification, experience_years, join_date, is_class_teacher) VALUES
(1,'EMP-001','Mathematics',     'B.Ed, M.Sc Mathematics',   12,'2012-06-01', 1),
(2,'EMP-002','Science',         'B.Ed, M.Sc Physics',       20,'2005-06-01', 0),
(3,'EMP-003','English & Tamil', 'B.Ed, MA English Literature',10,'2015-06-01',0),
(4,'EMP-004','Social Studies',  'B.Ed, MA History',          8,'2018-06-01', 0);

-- ── STUDENTS ─────────────────────────────────────────────────
-- All students belong to ONE classroom (Class 8-A)
INSERT INTO students (user_id, admission_no, roll_no, parent_user_id, admission_date) VALUES
(5,  'ADM-2025-001', 1,  11, '2020-06-01'),
(6,  'ADM-2025-002', 2,  12, '2020-06-01'),
(7,  'ADM-2025-003', 3,  13, '2020-06-01'),
(8,  'ADM-2025-004', 4,  14, '2020-06-01'),
(9,  'ADM-2025-005', 5,  15, '2020-06-01'),
(10, 'ADM-2025-006', 6,  NULL,'2020-06-01');

-- ── TIMETABLE (Class 8-A Weekly Schedule) ────────────────────
INSERT INTO timetable (day_of_week, period_no, subject_name, teacher_user_id, start_time, end_time) VALUES
('Monday',   1,'Mathematics',    1,'08:00','08:45'),
('Monday',   2,'Science',        2,'08:45','09:30'),
('Monday',   3,'English',        3,'09:45','10:30'),
('Monday',   4,'Tamil',          3,'10:30','11:15'),
('Monday',   5,'Social Studies', 4,'11:30','12:15'),
('Tuesday',  1,'Science',        2,'08:00','08:45'),
('Tuesday',  2,'Mathematics',    1,'08:45','09:30'),
('Tuesday',  3,'Tamil',          3,'09:45','10:30'),
('Tuesday',  4,'English',        3,'10:30','11:15'),
('Tuesday',  5,'Social Studies', 4,'11:30','12:15'),
('Wednesday',1,'Mathematics',    1,'08:00','08:45'),
('Wednesday',2,'English',        3,'08:45','09:30'),
('Wednesday',3,'Science',        2,'09:45','10:30'),
('Wednesday',4,'Social Studies', 4,'10:30','11:15'),
('Wednesday',5,'Tamil',          3,'11:30','12:15'),
('Thursday', 1,'Tamil',          3,'08:00','08:45'),
('Thursday', 2,'Social Studies', 4,'08:45','09:30'),
('Thursday', 3,'Mathematics',    1,'09:45','10:30'),
('Thursday', 4,'Science',        2,'10:30','11:15'),
('Thursday', 5,'English',        3,'11:30','12:15'),
('Friday',   1,'English',        3,'08:00','08:45'),
('Friday',   2,'Mathematics',    1,'08:45','09:30'),
('Friday',   3,'Tamil',          3,'09:45','10:30'),
('Friday',   4,'Science',        2,'10:30','11:15'),
('Friday',   5,'Social Studies', 4,'11:30','12:15'),
('Saturday', 1,'Mathematics',    1,'08:00','08:45'),
('Saturday', 2,'Science',        2,'08:45','09:30'),
('Saturday', 3,'English',        3,'09:45','10:30');

-- ── DAILY LESSON LOG ─────────────────────────────────────────
INSERT INTO daily_lesson_log (teacher_user_id, subject_name, log_date, topic_covered, description, attendance_note, next_day_plan) VALUES
(1,'Mathematics','2025-07-15','Chapter 9: Algebraic Identities – (a+b)², (a-b)²',
 'Explained standard identities with worked examples. Students practised 10 problems on the board.',
 '38/40 Present','Factorisation using identities'),
(2,'Science',    '2025-07-15','Chapter 3: Synthetic Fibres and Plastics – Properties',
 'Discussed properties of nylon, polyester, and their uses. Demo with samples.',
 '38/40 Present','Advantages and disadvantages of plastics'),
(3,'English',    '2025-07-14','Unit 2: A Short Monsoon Diary – Comprehension',
 'Read the text aloud, discussed vocabulary, answered comprehension questions in class.',
 '37/40 Present','Grammar: Tenses revision'),
(1,'Mathematics','2025-07-14','Chapter 9: Algebraic Expressions – Introduction',
 'Introduced algebraic expressions, terms, factors. Solved examples from textbook.',
 '39/40 Present','Standard algebraic identities'),
(4,'Social Studies','2025-07-14','Chapter 1: Resources – Types of Resources',
 'Discussed natural, man-made and human resources with examples from everyday life.',
 '36/40 Present','Conservation of resources');

-- ── HOMEWORK ─────────────────────────────────────────────────
INSERT INTO homework (teacher_user_id, subject_name, title, description, assigned_date, due_date) VALUES
(1,'Mathematics',   'Algebraic Identities – Exercise 9.1',
 'Solve Q1–Q10 from Exercise 9.1 on page 143. Show all working steps neatly.','2025-07-15','2025-07-17'),
(2,'Science',       'Synthetic Fibres – Q&A',
 'Answer all questions in Exercise 3 (page 38). Write in your own words.','2025-07-15','2025-07-18'),
(3,'English',       'Write a Paragraph – My School',
 'Write a paragraph of 150 words on "My School". Focus on grammar and neatness.','2025-07-14','2025-07-17'),
(3,'Tamil',         'கட்டுரை – என் பள்ளி',
 'Write a 100-word Tamil essay on "என் பள்ளி". Use correct grammar.','2025-07-14','2025-07-16'),
(4,'Social Studies','Resources Worksheet',
 'Complete the worksheet on Types of Resources given in class.','2025-07-14','2025-07-17');

-- ── HOMEWORK SUBMISSIONS (for Arjun Kumar – student_id = 1) ──
INSERT INTO homework_submissions (homework_id, student_id, status, submitted_on, teacher_remark) VALUES
(3, 1,'Submitted','2025-07-16','Well written. Good grammar!'),
(4, 1,'Submitted','2025-07-15','Neat handwriting. Good effort.'),
(1, 1,'Pending',  NULL, NULL),
(2, 1,'Pending',  NULL, NULL),
(5, 1,'Pending',  NULL, NULL);

-- ── ASSIGNMENTS ──────────────────────────────────────────────
INSERT INTO assignments (teacher_user_id, subject_name, title, description, assigned_date, due_date, max_marks) VALUES
(1,'Mathematics',   'Geometry Constructions','Construct and identify different types of triangles using compass and ruler. Submit in A4 sheet.',
 '2025-07-10','2025-07-25',20),
(2,'Science',       'Water Cycle Working Model','Prepare a working model of the water cycle using available materials.',
 '2025-07-10','2025-07-28',30),
(3,'English',       'My Holiday Story','Write a short story of 250 words titled "My Best Holiday". Include a moral at the end.',
 '2025-07-12','2025-07-22',20),
(4,'Social Studies','Resource Conservation Poster',
 'Create an A3 poster showing ways to conserve natural resources. Add diagrams and colour.','2025-07-13','2025-07-24',20);

-- ── ASSIGNMENT SUBMISSIONS ───────────────────────────────────
INSERT INTO assignment_submissions (assignment_id, student_id, status, submitted_on, marks_awarded, teacher_remark) VALUES
(3, 1,'Submitted','2025-07-20',17,'Excellent narrative. Good vocabulary.'),
(1, 1,'Pending', NULL, NULL, NULL),
(2, 1,'Pending', NULL, NULL, NULL),
(4, 1,'Pending', NULL, NULL, NULL);

-- ── MARKS ────────────────────────────────────────────────────
-- Unit Test 1 and Half Yearly for all 6 students
INSERT INTO marks (student_id, subject_name, exam_type, marks_obtained, max_marks, grade, entered_by, date_recorded) VALUES
-- Arjun Kumar (student_id = 1)
(1,'Mathematics',  'Unit Test 1', 88,100,'A+',1,'2025-04-15'),
(1,'Science',      'Unit Test 1', 76,100,'B+',2,'2025-04-15'),
(1,'English',      'Unit Test 1', 92,100,'A+',3,'2025-04-15'),
(1,'Tamil',        'Unit Test 1', 85,100,'A', 3,'2025-04-15'),
(1,'Social Studies','Unit Test 1',80,100,'A', 4,'2025-04-15'),
(1,'Mathematics',  'Half Yearly', 82,100,'A', 1,'2025-06-10'),
(1,'Science',      'Half Yearly', 79,100,'B+',2,'2025-06-10'),
(1,'English',      'Half Yearly', 91,100,'A+',3,'2025-06-10'),
(1,'Tamil',        'Half Yearly', 88,100,'A+',3,'2025-06-10'),
(1,'Social Studies','Half Yearly',75,100,'B+',4,'2025-06-10'),
-- Meena Lakshmi (student_id = 2)
(2,'Mathematics',  'Unit Test 1', 95,100,'O', 1,'2025-04-15'),
(2,'Science',      'Unit Test 1', 88,100,'A+',2,'2025-04-15'),
(2,'English',      'Unit Test 1', 91,100,'A+',3,'2025-04-15'),
(2,'Tamil',        'Unit Test 1', 94,100,'O', 3,'2025-04-15'),
(2,'Social Studies','Unit Test 1',87,100,'A+',4,'2025-04-15'),
-- Kiran Raj (student_id = 3)
(3,'Mathematics',  'Unit Test 1', 70,100,'B', 1,'2025-04-15'),
(3,'Science',      'Unit Test 1', 65,100,'B', 2,'2025-04-15'),
(3,'English',      'Unit Test 1', 72,100,'B+',3,'2025-04-15'),
(3,'Tamil',        'Unit Test 1', 68,100,'B', 3,'2025-04-15'),
(3,'Social Studies','Unit Test 1',78,100,'B+',4,'2025-04-15'),
-- Anitha Selvam (student_id = 4)
(4,'Mathematics',  'Unit Test 1', 90,100,'A+',1,'2025-04-15'),
(4,'Science',      'Unit Test 1', 85,100,'A', 2,'2025-04-15'),
(4,'English',      'Unit Test 1', 88,100,'A+',3,'2025-04-15'),
(4,'Tamil',        'Unit Test 1', 92,100,'O', 3,'2025-04-15'),
(4,'Social Studies','Unit Test 1',82,100,'A', 4,'2025-04-15'),
-- Rohit Patel (student_id = 5)
(5,'Mathematics',  'Unit Test 1', 60,100,'C', 1,'2025-04-15'),
(5,'Science',      'Unit Test 1', 55,100,'C', 2,'2025-04-15'),
(5,'English',      'Unit Test 1', 67,100,'B', 3,'2025-04-15'),
(5,'Tamil',        'Unit Test 1', 62,100,'C+',3,'2025-04-15'),
(5,'Social Studies','Unit Test 1',70,100,'B', 4,'2025-04-15'),
-- Divya Menon (student_id = 6)
(6,'Mathematics',  'Unit Test 1', 83,100,'A', 1,'2025-04-15'),
(6,'Science',      'Unit Test 1', 80,100,'A', 2,'2025-04-15'),
(6,'English',      'Unit Test 1', 86,100,'A+',3,'2025-04-15'),
(6,'Tamil',        'Unit Test 1', 89,100,'A+',3,'2025-04-15'),
(6,'Social Studies','Unit Test 1',77,100,'B+',4,'2025-04-15');

-- ── ATTENDANCE (Arjun Kumar – student_id = 1) ────────────────
INSERT INTO attendance (student_id, date, status, marked_by) VALUES
(1,'2025-07-01','Present',1),(1,'2025-07-02','Present',1),(1,'2025-07-03','Absent',1),
(1,'2025-07-04','Present',1),(1,'2025-07-07','Present',1),(1,'2025-07-08','Present',1),
(1,'2025-07-09','Half-Day',1),(1,'2025-07-10','Present',1),(1,'2025-07-11','Present',1),
(1,'2025-07-14','Present',1),(1,'2025-07-15','Present',1);

-- ── ANNOUNCEMENTS ────────────────────────────────────────────
INSERT INTO announcements (teacher_user_id, title, content, category, target) VALUES
(1,'Annual Sports Day – 25th July 2025',
 'The Annual Sports Day will be held on 25th July 2025 at the school grounds. All students must wear sports uniform. Parents are warmly invited.',
 'Event','all'),
(1,'Half Yearly Exam Schedule – August 2025',
 'Half Yearly exams begin from 5th August 2025. Timetable is posted on the notice board. Students are advised to prepare subject-wise.',
 'Exam','all'),
(1,'Parent-Teacher Meeting – 20th July',
 'PTM is scheduled on 20th July 2025, 9 AM to 1 PM. Parents are requested to attend to discuss your ward''s progress with the class teacher.',
 'Notice','parent'),
(1,'School Closed – 21st July (Public Holiday)',
 'School will remain closed on Monday, 21st July 2025. Classes resume on 22nd July.',
 'Holiday','all'),
(2,'Science Assignment Reminder',
 'The Water Cycle Working Model assignment is due on 28th July. Students who have not started are advised to begin immediately.',
 'Notice','student'),
(1,'Independence Day Celebration – 15th August',
 'School will celebrate Independence Day on 15th August 2025. All students must report by 8:00 AM in full school uniform for the flag hoisting ceremony.',
 'Event','all');

-- ── ACADEMIC FEES (Arjun Kumar – student_id = 1) ─────────────
INSERT INTO academic_fees (student_id, fee_type, academic_year, total_amount, paid_amount, due_date, paid_date, status, receipt_no) VALUES
(1,'Tuition Fee',  '2025-26',5000.00,5000.00,'2025-06-30','2025-06-15','Paid',  'RCP-2025-001'),
(1,'Exam Fee',     '2025-26', 500.00, 500.00,'2025-06-30','2025-06-15','Paid',  'RCP-2025-002'),
(1,'Sports Fee',   '2025-26', 300.00,   0.00,'2025-07-31', NULL,       'Pending',NULL),
(1,'Library Fee',  '2025-26', 200.00, 200.00,'2025-06-30','2025-06-15','Paid',  'RCP-2025-003'),
(1,'Transport Fee','2025-26',1500.00,   0.00,'2025-07-31', NULL,       'Pending',NULL);

-- ── LIBRARY BOOKS ────────────────────────────────────────────
INSERT INTO library (book_title, author, subject, isbn, publisher, total_copies, available_copies) VALUES
('NCERT Mathematics Class 8',    'NCERT',             'Mathematics',   '978-81-7450-737-8','NCERT Publications',15,12),
('NCERT Science Class 8',        'NCERT',             'Science',       '978-81-7450-738-5','NCERT Publications',15,13),
('NCERT Social Science Class 8', 'NCERT',             'Social Studies','978-81-7450-739-2','NCERT Publications',15,14),
('Wings of Fire',                'A.P.J. Abdul Kalam','General',       '978-81-7371-146-6','Universities Press', 5, 4),
('The Jungle Book',              'Rudyard Kipling',   'English',       '978-0-14-062400-7','Penguin Classics',   4, 3),
('Wren & Martin English Grammar','P.C. Wren',         'English',       '978-81-219-0199-5','S. Chand',           8, 6),
('NCERT English Class 8 – Honeydew','NCERT',          'English',       '978-81-7450-742-2','NCERT Publications',12,10),
('Godan',                        'Munshi Premchand',  'Tamil/Hindi',   '978-81-7028-021-7','Rajpal & Sons',      3, 3);

-- ── LIBRARY RECORDS ──────────────────────────────────────────
INSERT INTO library_records (book_id, student_id, issue_date, due_date, status) VALUES
(2, 1,'2025-07-10','2025-07-24','Issued'),
(4, 3,'2025-07-08','2025-07-22','Issued');