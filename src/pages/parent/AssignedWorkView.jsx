import React from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Download, CheckCircle2 } from 'lucide-react';

const AssignedWorkView = () => {
  const { homework } = useAcademy();
  const { currentUser } = useAuth();
  
  // Filter works assigned to the student's batch or all. For mock, just show all.
  const myWorks = homework;

  return (
    <div className="main-content">
      <Header title="Assigned Daily Work" />
      <div className="page-wrapper animate-fade">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Homework & Assignments</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {myWorks.map(work => {
            const submission = work.submissions.find(s => s.studentId === currentUser.studentId);
            const isSubmitted = !!submission;

            return (
              <div key={work.id} className="glass-card p-5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-[var(--text-primary)]">{work.title}</h4>
                  <span className={`badge ${isSubmitted ? 'badge-active' : 'badge-suspended'}`}>
                    {isSubmitted ? 'Submitted' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-primary)] font-medium mb-3">{work.subject}</p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{work.description}</p>
                
                {work.attachment && (
                  <button className="flex items-center gap-2 text-sm text-[var(--color-info)] bg-[var(--color-info-bg)] px-3 py-1.5 rounded-lg w-max mb-4 hover:opacity-80 transition">
                    <Download size={14}/> Download Attachment
                  </button>
                )}

                <div className="flex flex-wrap gap-3 text-xs mt-auto pt-3 border-t border-[var(--border-color)]">
                  <span className="flex items-center gap-1 text-[var(--text-muted)]"><Calendar size={14}/> Assigned: {work.assignedDate}</span>
                  <span className="flex items-center gap-1 font-semibold text-[var(--color-danger)]"><Clock size={14}/> Due: {work.dueDate}</span>
                </div>

                {isSubmitted && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5" />
                    <div>
                      <p className="font-semibold">Submitted on {submission.date}</p>
                      {submission.remarks && <p className="mt-1 italic text-xs">Teacher Remark: "{submission.remarks}"</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssignedWorkView;
