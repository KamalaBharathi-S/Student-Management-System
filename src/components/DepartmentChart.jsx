import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import './DepartmentChart.css';

const DepartmentChart = () => {
  const { students, departments } = useContext(StudentContext);

  // Calculate count for each department
  const data = departments.map((dept, index) => {
    const count = students.filter(s => s.department === dept).length;
    return { name: dept, count, index };
  });

  const maxCount = Math.max(...data.map(d => d.count), 1);

  // Gradient array matching department index
  const barGradients = [
    "linear-gradient(90deg, #6366f1, #818cf8)",
    "linear-gradient(90deg, #0ea5e9, #22d3ee)",
    "linear-gradient(90deg, #ec4899, #f43f5e)",
    "linear-gradient(90deg, #10b981, #34d399)",
    "linear-gradient(90deg, #f59e0b, #fbbf24)",
    "linear-gradient(90deg, #8b5cf6, #a78bfa)"
  ];

  return (
    <div className="glass-card dept-chart-card animate-slide-up">
      <h3 className="chart-card-title">Students by Department</h3>
      <p className="chart-card-subtitle">Distribution across academic faculties</p>
      
      <div className="chart-list">
        {data.map((dept) => {
          const percentage = (dept.count / maxCount) * 100;
          return (
            <div key={dept.name} className="chart-row">
              <div className="chart-dept-info">
                <span className="chart-dept-name">{dept.name}</span>
                <span className="chart-dept-count">{dept.count} {dept.count === 1 ? 'student' : 'students'}</span>
              </div>
              <div className="chart-progress-bg">
                <div 
                  className="chart-progress-bar"
                  style={{ 
                    width: `${percentage}%`,
                    background: barGradients[dept.index % barGradients.length]
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentChart;
