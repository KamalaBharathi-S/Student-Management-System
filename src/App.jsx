import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import StudentDetails from './pages/StudentDetails';

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="app-container animate-fade">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add" element={<StudentForm />} />
            <Route path="/edit/:id" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
