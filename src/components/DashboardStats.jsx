import React from 'react';
import { Users, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import styles from './DashboardStats.module.css';

const DashboardStats = () => {
  const { students } = useStudents();

  const totalStudents = students.length;
  const cseStudents = students.filter(s => s.department === 'CSE').length;
  const eceStudents = students.filter(s => s.department === 'ECE').length;
  const finalYearStudents = students.filter(s => String(s.year) === '4').length;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: <Users size={24} />,
      gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
      colorClass: styles.primary
    },
    {
      title: "CSE Students",
      value: cseStudents,
      icon: <Award size={24} />,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      colorClass: styles.success
    },
    {
      title: "ECE Students",
      value: eceStudents,
      icon: <CheckCircle size={24} />,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      colorClass: styles.warning
    },
    {
      title: "Final Year Students",
      value: finalYearStudents,
      icon: <GraduationCap size={24} />,
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
      colorClass: styles.info
    }
  ];

  return (
    <div className={`${styles.statsContainer} animate-slide-up`}>
      {stats.map((stat, index) => (
        <div key={index} className={`glass-card ${styles.statCard}`}>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>{stat.title}</span>
            <span className={styles.statValue}>{stat.value}</span>
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
