import React, { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { useStudents } from '../../hooks/useStudents';
import { Calendar, UploadCloud, Users, Megaphone } from 'lucide-react';
import Chart from 'chart.js/auto';
import styles from '../../components/DashboardStats.module.css';

const StudentDashboard = () => {
  const { studentPerformance, announcements } = useAcademy();
  const { students } = useStudents();
  const { attendance, marks, tests, homework, assignments } = studentPerformance;

  const totalClassmates = students.length;
  const pendingTasksCount = 
    homework.filter(h => h.status !== 'Submitted').length + 
    assignments.filter(a => a.status !== 'Submitted').length;
    
  const activeAnnouncements = announcements.filter(a => {
    return new Date(a.expiryDate) >= new Date();
  }).length;

  const marksChartRef = useRef(null);

  useEffect(() => {
    let marksChartInstance = null;

    if (marksChartRef.current) {
      const ctx = marksChartRef.current.getContext('2d');
      marksChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: marks.map(m => m.subject),
          datasets: [{
            label: 'Score',
            data: marks.map(m => m.exam),
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981',
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#10b981'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      });
    }

    return () => {
      if (marksChartInstance) marksChartInstance.destroy();
    };
  }, [marks]);

  const stats = [
    {
      title: 'Total Classmates',
      value: totalClassmates,
      sub: 'Class 8-A enrolled',
      icon: <Users size={22} />,
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
      title: 'New Announcements',
      value: activeAnnouncements,
      sub: 'Currently visible',
      icon: <Megaphone size={22} />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      colorClass: styles.info,
    },
    {
      title: 'My Attendance',
      value: `${attendance.percentage}%`,
      sub: 'Overall presence',
      icon: <Calendar size={22} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      colorClass: styles.success,
    },
  ];

  return (
    <div className="main-content">
      <Header title="Student Dashboard" />
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

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Skills Radar</h3>
            <div className="h-[250px] relative">
              <canvas ref={marksChartRef}></canvas>
            </div>
          </div>
          
          <div className="glass-card p-6 lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Upcoming Schedule</h3>
            <div className="space-y-4">
              {tests.filter(t => t.status === 'Available').map(test => (
                <div key={test.id} className="flex items-center p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                  <div className="w-12 h-12 rounded bg-[var(--color-info-bg)] text-[var(--color-info)] flex items-center justify-center font-bold mr-4">
                    {new Date(test.date).getDate()}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{test.title}</h4>
                    <p className="text-sm text-[var(--text-muted)]">Duration: {test.duration}</p>
                  </div>
                  <button className="btn btn-primary text-sm px-4 py-1.5">Prepare</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
