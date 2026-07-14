import React from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { Download } from 'lucide-react';

const Marksheet = () => {
  const { studentPerformance } = useAcademy();
  const { marks } = studentPerformance;

  const handleDownload = () => {
    alert("Simulating PDF Download...");
  };

  return (
    <div className="main-content">
      <Header title="Academic Marksheet" />
      <div className="page-wrapper animate-fade">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Exam Results & Grades</h2>
          <button onClick={handleDownload} className="btn btn-primary flex items-center gap-2">
            <Download size={18} /> Download PDF
          </button>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-primary)]">
            <div>
              <h3 className="font-bold text-lg">Semester 4 Results</h3>
              <p className="text-sm text-[var(--text-muted)]">Academic Year 2025-2026</p>
            </div>
            <div className="text-right">
              <span className="block text-sm text-[var(--text-muted)]">Total GPA</span>
              <span className="font-bold text-2xl text-[var(--color-primary)]">3.8</span>
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Subject</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Internal</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Practical</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Final Exam</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Total</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Grade</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition">
                  <td className="p-4 font-medium">{m.subject}</td>
                  <td className="p-4">{m.internal}</td>
                  <td className="p-4">{m.practical}</td>
                  <td className="p-4">{m.exam}</td>
                  <td className="p-4 font-bold">{m.internal + m.practical + m.exam}</td>
                  <td className="p-4">
                    <span className={`badge ${m.grade === 'O' || m.grade === 'A+' || m.grade === 'A' ? 'badge-active' : 'badge-suspended'}`}>
                      {m.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Marksheet;
