import React, { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { Calendar, FileBarChart, UploadCloud, BookOpen } from 'lucide-react';
import Chart from 'chart.js/auto';

const ParentDashboard = () => {
  const { studentPerformance } = useAcademy();
  const { attendance, marks, tests } = studentPerformance;

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

  return (
    <div className="main-content">
      <Header title="Parent Dashboard" />
      <div className="page-wrapper animate-fade">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Calendar size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Overall Attendance</h3>
            <p className="text-4xl font-bold text-[var(--color-primary)]">{attendance.percentage}%</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><FileBarChart size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Average Score</h3>
            <p className="text-4xl font-bold text-[var(--color-success)]">
              {(marks.reduce((acc, m) => acc + m.exam, 0) / marks.length).toFixed(1)}%
            </p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><UploadCloud size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Pending Assignments</h3>
            <p className="text-4xl font-bold text-[var(--color-warning)]">2</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><BookOpen size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Upcoming Tests</h3>
            <p className="text-4xl font-bold text-[var(--color-info)]">{tests.filter(t => t.status === 'Available').length}</p>
          </div>
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
