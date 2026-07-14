import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Users, ArrowRight, Eye, FileSpreadsheet, FileJson } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import DashboardStats from '../components/DashboardStats';
import AnalyticsCharts from '../components/AnalyticsCharts';
import Header from '../components/Header';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { students } = useStudents();
  const navigate = useNavigate();

  const recentStudents = students.slice(0, 5);

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const exportCSV = () => {
    if (students.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Year', 'Gender', 'Date of Birth', 'Address', 'Created At', 'GPA', 'Status'];
    const rows = students.map(s => [
      s.id, s.name, s.email, s.phone, s.department, s.year, s.gender, s.dateOfBirth, s.address, s.createdAt, s.gpa, s.status
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
        
        {/* Render AnalyticsCharts (both department and year split) in middle section */}
        <AnalyticsCharts />
        
        <div className={styles.dashboardGrid}>
          {/* Recent Enrollments Table */}
          <div className={styles.dashboardMain}>
            <div className={styles.tableCard}>
              <div className={styles.cardHeaderFlex}>
                <div>
                  <h3 className={styles.cardTitle}>Recent Enrollments</h3>
                  <p className={styles.cardSubtitle}>Latest 5 students added to the portal</p>
                </div>
                <Link to="/students" className={styles.btnLink}>
                  View All Students <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className={styles.tableResponsive}>
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
                            <div className={styles.studentProfileCell}>
                              <div 
                                className={styles.studentCellAvatar} 
                                style={{ background: student.avatarColor }}
                              >
                                {getInitials(student.name)}
                              </div>
                              <div className={styles.studentCellInfo}>
                                <span className={styles.studentCellName}>{student.name}</span>
                                <span className={styles.studentCellId}>{student.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>{student.department}</td>
                          <td>
                            <span className={styles.gpaBadge}>{student.gpa.toFixed(2)}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${student.status.toLowerCase()}`}>
                              {student.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className={styles.actionBtnView}
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
                  <div className={styles.emptyStateMessage}>No students registered yet.</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Actions Panel */}
          <div className={styles.dashboardSidebar}>
            <div className={`glass-card ${styles.actionsCard}`}>
              <h3 className={styles.cardTitle}>Quick Actions</h3>
              <p className={styles.cardSubtitle}>Manage campus registrations</p>
              
              <div className={styles.actionButtonsList}>
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
                
                <div className={styles.dividerLine}></div>
                
                <span className={styles.sectionLabel}>Data Administration</span>
                
                <div className={styles.exportButtonsRow}>
                  <button 
                    className="btn btn-secondary flex-1"
                    onClick={exportCSV}
                    disabled={students.length === 0}
                    title="Export records to CSV Spreadsheet"
                  >
                    <FileSpreadsheet size={16} />
                    CSV
                  </button>
                  <button 
                    className="btn btn-secondary flex-1"
                    onClick={exportJSON}
                    disabled={students.length === 0}
                    title="Export records to JSON"
                  >
                    <FileJson size={16} />
                    JSON
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
