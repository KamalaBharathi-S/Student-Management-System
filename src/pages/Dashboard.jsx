import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Users, ArrowRight, Trophy, Medal, Star } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import { useAcademy } from '../context/AcademyContext';
import DashboardStats from '../components/DashboardStats';
import AnalyticsCharts from '../components/AnalyticsCharts';
import Header from '../components/Header';
import styles from './Dashboard.module.css';

// Rank badge config
const RANK_CONFIG = [
  { rank: 1, label: '1st', icon: <Trophy size={15} />,  bg: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff'  },
  { rank: 2, label: '2nd', icon: <Medal  size={15} />,  bg: 'linear-gradient(135deg,#94a3b8,#64748b)', color: '#fff'  },
  { rank: 3, label: '3rd', icon: <Star   size={15} />,  bg: 'linear-gradient(135deg,#b45309,#92400e)', color: '#fff'  },
];

const Dashboard = () => {
  const { students } = useStudents();
  const { studentPerformance } = useAcademy();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // ── Build Toppers List ───────────────────────────────────────
  // Compute average UT1 score per student from marks data
  // Since we have full marks in academyData for all students,
  // we use a map: student name → average score
  const marksMap = {
    'Meena Lakshmi': { ut1Avg: (95 + 88 + 91 + 94 + 87) / 5, grade: 'O'  },
    'Anitha Selvam': { ut1Avg: (90 + 85 + 88 + 92 + 82) / 5, grade: 'A+' },
    'Arjun Kumar':   { ut1Avg: (88 + 76 + 92 + 85 + 80) / 5, grade: 'A+' },
    'Divya Menon':   { ut1Avg: (83 + 80 + 86 + 89 + 77) / 5, grade: 'A'  },
    'Kiran Raj':     { ut1Avg: (70 + 65 + 72 + 68 + 78) / 5, grade: 'B+' },
    'Rohit Patel':   { ut1Avg: (60 + 55 + 67 + 62 + 70) / 5, grade: 'C+' },
  };

  const toppers = students
    .map(s => ({
      ...s,
      avgScore: marksMap[s.name]?.ut1Avg ?? 0,
      grade:    marksMap[s.name]?.grade ?? '–',
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="main-content">
      <Header title="School Dashboard" />

      <div className="page-wrapper">
        <DashboardStats />
        <AnalyticsCharts />

        <div className={styles.dashboardGrid}>
          {/* ── Toppers List ─────────────────────────────────── */}
          <div className={styles.dashboardMain}>
            <div className={styles.tableCard}>
              <div className={styles.cardHeaderFlex}>
                <div>
                  <h3 className={styles.cardTitle}>🏆 Class Toppers</h3>
                  <p className={styles.cardSubtitle}>Ranked by Unit Test 1 average score – Class 8A</p>
                </div>
                <Link to="/teacher/marks" className={styles.btnLink}>
                  View Marks <ArrowRight size={16} />
                </Link>
              </div>

              <div className={styles.tableResponsive}>
                {toppers.length > 0 ? (
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Student</th>
                        <th>Roll No.</th>
                        <th>Avg Score</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toppers.map((student, index) => {
                        const rankCfg = RANK_CONFIG[index] || null;
                        return (
                          <tr key={student.id}>
                            {/* Rank badge */}
                            <td>
                              {rankCfg ? (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 5,
                                  background: rankCfg.bg,
                                  color: rankCfg.color,
                                  padding: '3px 10px',
                                  borderRadius: 'var(--radius-full)',
                                  fontSize: 12,
                                  fontWeight: 700,
                                }}>
                                  {rankCfg.icon} {rankCfg.label}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 13 }}>
                                  #{index + 1}
                                </span>
                              )}
                            </td>

                            {/* Student cell */}
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

                            {/* Roll no */}
                            <td>
                              <span className={styles.gpaBadge}>#{student.rollNo}</span>
                            </td>

                            {/* Avg score */}
                            <td>
                              <span style={{
                                fontWeight: 700,
                                fontSize: 15,
                                color: index === 0 ? '#f59e0b'
                                       : index === 1 ? '#6366f1'
                                       : index === 2 ? '#10b981'
                                       : 'var(--text-primary)',
                              }}>
                                {student.avgScore.toFixed(1)}
                                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>/100</span>
                              </span>
                            </td>

                            {/* Grade */}
                            <td>
                              <span className={`badge ${
                                student.grade === 'O'  || student.grade === 'A+' ? 'badge-present' :
                                student.grade === 'A'  || student.grade === 'B+' ? 'badge-info'    :
                                'badge-warning'
                              }`}>
                                {student.grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.emptyStateMessage}>No marks data available yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* ── Quick Actions Panel ──────────────────────────── */}
          <div className={styles.dashboardSidebar}>
            <div className={`glass-card ${styles.actionsCard}`}>
              <h3 className={styles.cardTitle}>Quick Actions</h3>
              <p className={styles.cardSubtitle}>Class 8-A management</p>

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
                  onClick={() => navigate('/teacher/students')}
                >
                  <Users size={18} />
                  View All Students
                </button>

                <div className={styles.dividerLine}></div>
                <span className={styles.sectionLabel}>Today's Class</span>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => navigate('/teacher/attendance')}
                >
                  Mark Attendance
                </button>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => navigate('/teacher/homework')}
                >
                  Post Homework
                </button>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => navigate('/announcements')}
                >
                  New Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
