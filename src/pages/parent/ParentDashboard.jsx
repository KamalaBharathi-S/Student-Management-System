import React, { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { Calendar, FileBarChart, UploadCloud, BookOpen } from 'lucide-react';
import Chart from 'chart.js/auto';
import styles from '../../components/DashboardStats.module.css';

const ParentDashboard = () => {
  const { studentPerformance } = useAcademy();
  const { attendance, marks, tests, homework, assignments } = studentPerformance;

  const pendingTasksCount = 
    homework.filter(h => h.status !== 'Submitted').length + 
    assignments.filter(a => a.status !== 'Submitted').length;

  const attendanceChartRef = useRef(null);
  const marksChartRef = useRef(null);

  useEffect(() => {
    let attendanceChartInstance = null;
    let marksChartInstance = null;

    if (attendanceChartRef.current) {
      const ctx = attendanceChartRef.current.getContext('2d');
      attendanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: attendance.monthly.map(m => m.month),
          datasets: [{
            label: 'Attendance %',
            data: attendance.monthly.map(m => (m.present / m.total) * 100),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { min: 0, max: 100 }
          }
        }
      });
    }

    if (marksChartRef.current) {
      const ctx = marksChartRef.current.getContext('2d');
      marksChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: marks.map(m => m.subject),
          datasets: [{
            label: 'Total Marks',
            data: marks.map(m => m.exam),
            backgroundColor: '#10b981',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { min: 0, max: 100 }
          }
        }
      });
    }

    return () => {
      if (attendanceChartInstance) attendanceChartInstance.destroy();
      if (marksChartInstance) marksChartInstance.destroy();
    };
  }, [attendance, marks]);

  const stats = [
    {
      title: 'Ward\'s Attendance',
      value: `${attendance.percentage}%`,
      sub: 'Overall presence',
      icon: <Calendar size={22} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      colorClass: styles.success,
    },
    {
      title: 'Average Score',
      value: `${(marks.reduce((acc, m) => acc + m.exam, 0) / marks.length).toFixed(1)}%`,
      sub: 'Across all subjects',
      icon: <FileBarChart size={22} />,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
      colorClass: styles.primary,
    },
    {
      title: 'Pending Assignments',
      value: pendingTasksCount,
      sub: 'Awaiting submission',
      icon: <UploadCloud size={22} />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      colorClass: styles.warning,
    },
    {
      title: 'Upcoming Tests',
      value: tests.filter(t => t.status === 'Available').length,
      sub: 'Scheduled tests',
      icon: <BookOpen size={22} />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      colorClass: styles.info,
    },
  ];

  return (
    <div className="main-content">
      <Header title="Parent Dashboard" />
      <div className="page-wrapper animate-fade">
        <div className={`${styles.statsContainer} mb-8`}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statInfo}>
                <span className={styles.statTitle}>{stat.title}</span>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statSub}>{stat.sub}</span>
              </div>
              <div
                className={`${styles.statIconWrapper} ${stat.colorClass}`}
                style={{ background: stat.gradient }}
              >
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Attendance Trend</h3>
            <div className="h-[250px] relative">
              <canvas ref={attendanceChartRef}></canvas>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Subject Performance Analysis</h3>
            <div className="h-[250px] relative">
              <canvas ref={marksChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
