import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AcademyProvider } from './context/AcademyContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Header is rendered per page now or via layout? Wait, in my pages I render <Header/> inside them!

// Shared Admin Pages
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import StudentDetails from './pages/StudentDetails';
import Announcements from './pages/admin/Announcements';
import DailyReports from './pages/admin/DailyReports';
import DailyWorkUpload from './pages/admin/DailyWorkUpload';
import TeacherAttendance from './pages/admin/TeacherAttendance';
import Login from './pages/Login';
import PlaceholderModule from './pages/PlaceholderModule';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import StudentProfile from './pages/parent/StudentProfile';
import Marksheet from './pages/parent/Marksheet';
import AssignedWorkView from './pages/parent/AssignedWorkView';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AssignmentSubmission from './pages/student/AssignmentSubmission';
import OnlineTests from './pages/student/OnlineTests';
import StudentBiodata from './pages/student/StudentBiodata';
import StudentAttendance from './pages/student/StudentAttendance';

const RoleBasedHome = () => {
  const { role } = useAuth();
  if (!role) return <Login />;
  if (role === 'teacher' || role === 'admin') return <Dashboard />;
  if (role === 'parent') return <ParentDashboard />;
  if (role === 'student') return <StudentDashboard />;
  return <Login />;
};

const AppRoutes = () => {
  const { role } = useAuth();
  
  if (!role) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="app-container animate-fade">
      <Sidebar />
      <Routes>
        {/* Dynamic Home based on role */}
        <Route path="/" element={<RoleBasedHome />} />
        
        {/* Core Existing Admin/Teacher Routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/teacher/students" element={<StudentList />} />
        <Route path="/teacher/biodata" element={<StudentBiodata />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/daily-reports" element={<DailyReports />} />
        <Route path="/daily-work" element={<DailyWorkUpload />} />

        {/* Existing Parent / Student Specific Routes */}
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/marksheet" element={<Marksheet />} />
        <Route path="/assigned-work" element={<AssignedWorkView />} />
        <Route path="/submissions" element={<AssignmentSubmission />} />
        <Route path="/online-tests" element={<OnlineTests />} />
        
        {/* New Teacher Modules */}
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/fees" element={<PlaceholderModule title="Academic Fees" />} />
        <Route path="/teacher/homework" element={<PlaceholderModule title="Homework Management" />} />
        <Route path="/teacher/assignments" element={<PlaceholderModule title="Assignments Management" />} />
        <Route path="/teacher/marks" element={<PlaceholderModule title="Marks Entry" />} />
        
        {/* New Parent Modules */}
        <Route path="/parent/biodata" element={<StudentBiodata />} />
        <Route path="/parent/attendance" element={<StudentAttendance />} />
        <Route path="/parent/fees" element={<PlaceholderModule title="Academic Fees" />} />
        <Route path="/parent/timetable" element={<PlaceholderModule title="Class Timetable" />} />
        <Route path="/parent/homework" element={<PlaceholderModule title="Homework" />} />
        <Route path="/parent/assignments" element={<PlaceholderModule title="Assignments" />} />
        <Route path="/parent/marks" element={<PlaceholderModule title="Marks & Grades" />} />

        {/* New Student Modules */}
        <Route path="/student/biodata" element={<StudentBiodata />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/timetable" element={<PlaceholderModule title="My Timetable" />} />
        <Route path="/student/homework" element={<PlaceholderModule title="My Homework" />} />
        <Route path="/student/assignments" element={<PlaceholderModule title="My Assignments" />} />
        <Route path="/student/marks" element={<PlaceholderModule title="My Marks" />} />

        {/* Shared Library Module */}
        <Route path="/library" element={<PlaceholderModule title="Library Management" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AcademyProvider>
        <StudentProvider>
          <Router>
            <AppRoutes />
          </Router>
        </StudentProvider>
      </AcademyProvider>
    </AuthProvider>
  );
}

export default App;
