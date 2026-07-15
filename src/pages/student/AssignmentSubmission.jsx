import React, { useState } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Download, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

const AssignmentSubmission = () => {
  const { homework, submitHomework } = useAcademy();
  const { currentUser } = useAuth();
  
  const [selectedWork, setSelectedWork] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedWork && file) {
      submitHomework(selectedWork.id, currentUser.studentId, file.name);
      setSelectedWork(null);
      setFile(null);
    }
  };

  return (
    <div className="main-content">
      <Header title="Assignment Submission" />
      <div className="page-wrapper animate-fade">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">My Assignments</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid gap-4">
            {homework.map(work => {
              const submission = work.submissions.find(s => s.studentId === currentUser.studentId);
              const isSubmitted = !!submission;

              return (
                <div key={work.id} className="glass-card p-5 relative overflow-hidden flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-[var(--text-primary)]">{work.title}</h4>
                      <span className={`badge ${isSubmitted ? 'badge-active' : 'badge-suspended'}`}>
                        {isSubmitted ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-primary)] font-medium mb-2">{work.subject}</p>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">{work.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs mt-auto">
                      <span className="flex items-center gap-1 text-[var(--text-muted)]"><Calendar size={14}/> {work.assignedDate}</span>
                      <span className="flex items-center gap-1 font-semibold text-[var(--color-danger)]"><Clock size={14}/> Due: {work.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center min-w-[150px] border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-4 md:pt-0 md:pl-4">
                    {work.attachment && (
                      <button className="flex items-center justify-center gap-2 text-xs font-semibold text-[var(--color-info)] bg-[var(--color-info-bg)] px-3 py-2 rounded-lg w-full mb-3 hover:opacity-80 transition">
                        <Download size={14}/> Instructions
                      </button>
                    )}
                    
                    {isSubmitted ? (
                      <div className="text-center text-green-600 bg-green-50 p-2 rounded-lg border border-green-200">
                        <CheckCircle2 size={24} className="mx-auto mb-1" />
                        <span className="text-xs font-bold block">Done</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setSelectedWork(work)} 
                        className="btn btn-primary w-full py-2 text-sm"
                      >
                        Submit Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            {selectedWork ? (
              <div className="bg-[var(--bg-secondary)] border border-[var(--color-primary)] rounded-xl p-5 shadow-lg sticky top-6 animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Upload Work</h3>
                  <button onClick={() => setSelectedWork(null)} className="text-[var(--text-muted)] hover:text-red-500">✕</button>
                </div>
                <div className="mb-4 text-sm bg-[var(--bg-primary)] p-3 rounded border border-[var(--border-color)]">
                  <span className="font-semibold block text-[var(--color-primary)]">{selectedWork.title}</span>
                  <span className="text-[var(--text-muted)] text-xs">Due: {selectedWork.dueDate}</span>
                </div>
                
                <form onSubmit={handleUpload}>
                  <div className="border-2 border-dashed border-[var(--color-primary)] bg-[var(--color-primary-bg)] rounded-xl p-8 text-center cursor-pointer hover:bg-[var(--bg-primary)] transition mb-4 relative">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <UploadCloud size={32} className="mx-auto text-[var(--color-primary)] mb-2" />
                    {file ? (
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate px-2">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-[var(--color-primary)]">Click or drag file here</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">PDF, DOC, Images (Max 10MB)</p>
                      </>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-full" disabled={!file}>
                    Confirm Submission
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-8 text-center text-[var(--text-muted)] sticky top-6">
                <UploadCloud size={48} className="mx-auto mb-4 opacity-20" />
                <p>Select a pending assignment to upload your work.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;
