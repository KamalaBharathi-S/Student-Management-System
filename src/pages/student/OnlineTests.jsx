import React, { useState } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { Clock, PlayCircle, CheckCircle2 } from 'lucide-react';

const OnlineTests = () => {
  const { studentPerformance } = useAcademy();
  const { tests } = studentPerformance;

  const [activeTest, setActiveTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTest = (test) => {
    setActiveTest(test);
    setTimeLeft(parseInt(test.duration) * 60); // mock timer
  };

  const submitTest = () => {
    alert("Test Submitted successfully! Instant results will be published shortly.");
    setActiveTest(null);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="main-content">
      <Header title="Online Assessments" />
      <div className="page-wrapper animate-fade">
        
        {activeTest ? (
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-6 mb-6 flex justify-between items-center bg-[var(--color-primary-bg)] border-[var(--color-primary)]">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-primary)]">{activeTest.title}</h2>
                <p className="text-sm text-[var(--text-muted)]">Read all instructions carefully before proceeding.</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border-2 border-red-500 text-red-600 font-mono text-xl font-bold shadow-sm">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="glass-card p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="animate-pulse mb-4">
                <PlayCircle size={64} className="text-[var(--text-muted)] opacity-20" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Test Environment Initialized</h3>
              <p className="text-[var(--text-secondary)] mb-8 max-w-md">This is a simulated test environment. In a real application, multiple-choice or subjective questions would appear here.</p>
              
              <button onClick={submitTest} className="btn btn-primary px-8">
                Submit Test
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Available Tests</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tests.map(test => (
                <div key={test.id} className="glass-card p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-[var(--text-primary)]">{test.title}</h4>
                      <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 mt-1">
                        <Clock size={14}/> Duration: {test.duration}
                      </p>
                    </div>
                    <span className={`badge ${test.status === 'Available' ? 'badge-active' : 'badge-suspended'}`}>
                      {test.status}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    {test.status === 'Available' ? (
                      <button onClick={() => startTest(test)} className="btn btn-primary w-full flex items-center justify-center gap-2">
                        <PlayCircle size={18} /> Start Test
                      </button>
                    ) : (
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={16}/> Completed on {test.date}</span>
                        <span className="text-[var(--text-primary)] font-bold bg-[var(--bg-primary)] px-3 py-1 rounded-md border border-[var(--border-color)]">Score: {test.score}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OnlineTests;
