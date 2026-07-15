import React from 'react';
import { Users, UserCheck, FileCheck2, ClipboardCheck } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import { useAcademy } from '../context/AcademyContext';
import styles from './DashboardStats.module.css';

const DashboardStats = () => {
  const { students } = useStudents();
  const { assignments, announcements } = useAcademy();

  const totalStudents  = students.length;
  
  // Calculate students present today based on active students as a proxy, or attendance records.
  const presentToday = students.filter(s => s.status === 'Active').length;
  
  // Calculate pending assignments (submissions that need grading)
  let pendingAssignments = 0;
  assignments.forEach(a => {
    a.submissions?.forEach(sub => {
      if (!sub.marks) pendingAssignments++;
    });
  });

  const activeAnnouncements = announcements.filter(a => {
    return new Date(a.expiryDate) >= new Date();
  }).length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      sub: 'Class 8-A enrolled',
      icon: <Users size={22} />,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
      colorClass: styles.primary,
    },
    {
      title: 'Pending Assignments',
      value: pendingAssignments,
      sub: 'Awaiting grading',
      icon: <FileCheck2 size={22} />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      colorClass: styles.warning,
    },
    {
      title: 'Active Announcements',
      value: activeAnnouncements,
      sub: 'Currently visible',
      icon: <ClipboardCheck size={22} />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      colorClass: styles.info,
    },
    {
      title: 'Present Today',
      value: presentToday,
      sub: `${totalStudents} Total`,
      icon: <UserCheck size={22} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      colorClass: styles.success,
    },
  ];

  return (
    <div className={`${styles.statsContainer} animate-slide-up`}>
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
  );
};

export default DashboardStats;
