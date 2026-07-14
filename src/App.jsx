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

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import StudentProfile from './pages/parent/StudentProfile';
import Marksheet from './pages/parent/Marksheet';
import AssignedWorkView from './pages/parent/AssignedWorkView';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AssignmentSubmission from './pages/student/AssignmentSubmission';
import OnlineTests from './pages/student/OnlineTests';

const RoleBasedHome = () => {
  const { role } = useAuth();
  if (role === 'admin') return <Dashboard />;
  if (role === 'parent') return <ParentDashboard />;
  if (role === 'student') return <StudentDashboard />;
  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AcademyProvider>
        <StudentProvider>
          <Router>
            <div className="app-container animate-fade">
              <Sidebar />
              <Routes>
                {/* Dynamic Home based on role */}
                <Route path="/" element={<RoleBasedHome />} />
                
                {/* Admin Routes */}
                <Route path="/students" element={<StudentList />} />
                <Route path="/add" element={<StudentForm />} />
                <Route path="/edit/:id" element={<StudentForm />} />
                <Route path="/students/:id" element={<StudentDetails />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/daily-reports" element={<DailyReports />} />
                <Route path="/daily-work" element={<DailyWorkUpload />} />

                {/* Parent / Student Shared or Specific Routes */}
                <Route path="/student-profile" element={<StudentProfile />} />
                <Route path="/marksheet" element={<Marksheet />} />
                <Route path="/assigned-work" element={<AssignedWorkView />} />
                <Route path="/submissions" element={<AssignmentSubmission />} />
                <Route path="/online-tests" element={<OnlineTests />} />
                
                {/* Alias for marksheet -> marks-results for student */}
                <Route path="/marks-results" element={<Marksheet />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </StudentProvider>
      </AcademyProvider>
    </AuthProvider>
  );
}

export default App;
