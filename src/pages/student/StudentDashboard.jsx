import React, { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { Calendar, UploadCloud, BookOpen, CheckCircle } from 'lucide-react';
import Chart from 'chart.js/auto';

const StudentDashboard = () => {
  const { studentPerformance } = useAcademy();
  const { attendance, marks, tests } = studentPerformance;

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

  return (
    <div className="main-content">
      <Header title="Student Dashboard" />
      <div className="page-wrapper animate-fade">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Calendar size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">My Attendance</h3>
            <p className="text-4xl font-bold text-[var(--color-primary)]">{attendance.percentage}%</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><UploadCloud size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Pending Tasks</h3>
            <p className="text-4xl font-bold text-[var(--color-warning)]">2</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><BookOpen size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Upcoming Tests</h3>
            <p className="text-4xl font-bold text-[var(--color-info)]">{tests.filter(t => t.status === 'Available').length}</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle size={64}/></div>
            <h3 className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">Completed Tasks</h3>
            <p className="text-4xl font-bold text-[var(--color-success)]">14</p>
          </div>
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
