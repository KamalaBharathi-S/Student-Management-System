import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Users, ArrowRight, Eye, FileSpreadsheet, FileJson } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import DashboardStats from '../components/DashboardStats';
import DepartmentChart from '../components/DepartmentChart';
import Header from '../components/Header';
import './Dashboard.css';

const Dashboard = () => {
  const { students } = useContext(StudentContext);
  const navigate = useNavigate();

  // Get the 5 most recent students
  const recentStudents = students.slice(0, 5);

  const exportCSV = () => {
    if (students.length === 0) return;
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'DOB', 'Gender', 'Department', 'Enrollment Date', 'GPA', 'Status'];
    const rows = students.map(s => [
      s.id, s.firstName, s.lastName, s.email, s.phone, s.dob, s.gender, s.department, s.enrollmentDate, s.gpa, s.status
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_records_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    if (students.length === 0) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(students, null, 2)
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `student_records_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-content">
      <Header title="Academy Dashboard" />
      
      <div className="page-wrapper">
        <DashboardStats />
        
        <div className="dashboard-grid">
          {/* Left Column: Recent Students & Exporter */}
          <div className="dashboard-main animate-slide-up">
            <div className="glass-card table-card">
              <div className="card-header-flex">
                <div>
                  <h3 className="card-title">Recent Enrollments</h3>
                  <p className="card-subtitle">Latest 5 students added to the portal</p>
                </div>
                <Link to="/students" className="btn-link">
                  View All Students <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="table-responsive">
                {recentStudents.length > 0 ? (
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Department</th>
                        <th>GPA</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentStudents.map((student) => (
                        <tr key={student.id}>
                          <td>
                            <div className="student-profile-cell">
                              <div 
                                className="student-cell-avatar" 
                                style={{ background: student.avatarColor }}
                              >
                                {student.firstName[0]}{student.lastName[0]}
                              </div>
                              <div className="student-cell-info">
                                <span className="student-cell-name">
                                  {student.firstName} {student.lastName}
                                </span>
                                <span className="student-cell-id">{student.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>{student.department}</td>
                          <td>
                            <span className="gpa-badge">{student.gpa.toFixed(2)}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${student.status.toLowerCase()}`}>
                              {student.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="action-btn-view"
                              onClick={() => navigate(`/students/${student.id}`)}
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state-message">No students registered yet.</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column: Chart & Quick Actions */}
          <div className="dashboard-sidebar animate-slide-right">
            <DepartmentChart />
            
            <div className="glass-card actions-card">
              <h3 className="card-title">Quick Actions</h3>
              <p className="card-subtitle">Manage campus registrations</p>
              
              <div className="action-buttons-list">
                <button 
                  className="btn btn-primary w-full"
                  onClick={() => navigate('/add')}
                >
                  <UserPlus size={18} />
                  Add New Student
                </button>
                
                <button 
                  className="btn btn-secondary w-full"
                  onClick={() => navigate('/students')}
                >
                  <Users size={18} />
                  Manage Database
                </button>
                
                <div className="divider-line"></div>
                
                <span className="section-label">Data Administration</span>
                
                <div className="export-buttons-row">
                  <button 
                    className="btn btn-secondary flex-1"
                    onClick={exportCSV}
                    disabled={students.length === 0}
                    title="Export records to CSV Spreadsheet"
                  >
                    <FileSpreadsheet size={16} />
                    Export CSV
                  </button>
                  <button 
                    className="btn btn-secondary flex-1"
                    onClick={exportJSON}
                    disabled={students.length === 0}
                    title="Export records to JSON"
                  >
                    <FileJson size={16} />
                    Export JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
