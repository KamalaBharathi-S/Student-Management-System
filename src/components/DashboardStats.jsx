import React, { useContext } from 'react';
import { Users, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import './DashboardStats.css';

const DashboardStats = () => {
  const { students } = useContext(StudentContext);

  const totalStudents = students.length;
  
  const activeStudents = students.filter(s => s.status === 'Active').length;
  
  const graduatedStudents = students.filter(s => s.status === 'Graduated').length;
  
  const averageGpa = totalStudents > 0 
    ? (students.reduce((acc, curr) => acc + curr.gpa, 0) / totalStudents).toFixed(2)
    : '0.00';

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: <Users size={24} />,
      gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
      colorClass: "primary"
    },
    {
      title: "Active Status",
      value: activeStudents,
      icon: <CheckCircle size={24} />,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      colorClass: "success"
    },
    {
      title: "Average GPA",
      value: averageGpa,
      icon: <Award size={24} />,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      colorClass: "warning"
    },
    {
      title: "Graduates",
      value: graduatedStudents,
      icon: <GraduationCap size={24} />,
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
      colorClass: "info"
    }
  ];

  return (
    <div className="stats-container animate-slide-up">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card stat-card">
          <div className="stat-info">
            <span className="stat-title">{stat.title}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
          <div 
            className={`stat-icon-wrapper ${stat.colorClass}`}
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
