import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { UploadCloud, Plus, Calendar, CheckCircle2, Clock, Users } from 'lucide-react';
import Header from '../../components/Header';

const DailyWorkUpload = () => {
  const { homework, addHomework } = useAcademy();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('assigned');
  
  const [formData, setFormData] = useState({
    title: '', subject: '', description: '', assignedDate: new Date().toISOString().split('T')[0], dueDate: '', priority: 'Medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHomework({
      ...formData,
      attachment: 'uploaded_document.pdf'
    });
    setFormData({ title: '', subject: '', description: '', assignedDate: new Date().toISOString().split('T')[0], dueDate: '', priority: 'Medium' });
    setShowForm(false);
  };

  const [filterSubject, setFilterSubject] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Derived filter logic
  const filteredWorks = homework.filter(work => {
    const matchDate = filterDate ? work.assignedDate === filterDate : true;
    const matchSubject = filterSubject ? work.subject.toLowerCase() === filterSubject.toLowerCase() : true;
    
    return matchDate && matchSubject;
  });

  return (
    <div className="main-content">
      <Header title="Class 8-A Homework" />
      <div className="page-wrapper animate-fade">
        {/* Filter Bar */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 rounded-xl mb-6 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1 block">Subject</label>
            <select className="form-select w-full" value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
              <option value="">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1 block">Date</label>
            <input type="date" className="form-input w-full" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'assigned' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`} onClick={() => setActiveTab('assigned')}>Assigned Works</button>
            <button className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`} onClick={() => setActiveTab('submissions')}>Submissions</button>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center gap-2">
            <Plus size={18} /> {showForm ? 'Cancel' : 'Assign Work'}
          </button>
        </div>

        {showForm && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl mb-8 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Post New Homework</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Work Title</label>
                <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select required className="form-select" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                  <option value="">Select Subject...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Social Studies">Social Studies</option>
                </select>
              </div>
              <div className="form-group col-span-2">
                <label className="form-label">Description / Instructions</label>
                <textarea required rows="3" className="form-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input required type="date" className="form-input" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-select" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Attachment (Optional)</label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-3 text-center flex items-center justify-center gap-2 text-[var(--text-muted)] cursor-pointer hover:bg-[var(--bg-primary)] transition">
                  <UploadCloud size={20} />
                  <span>Click to browse or drag file</span>
                </div>
              </div>
              <div className="col-span-2 mt-4">
                <button type="submit" className="btn btn-primary w-full md:w-auto">Assign Work</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'assigned' && (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredWorks.map(work => (
              <div key={work.id} className="glass-card p-5 hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-[var(--text-primary)]">{work.title}</h4>
                  <span className={`badge ${work.priority === 'High' ? 'badge-suspended' : 'badge-active'}`}>{work.priority}</span>
                </div>
                <p className="text-sm text-[var(--color-primary)] font-medium mb-3">{work.subject}</p>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">{work.description}</p>
                
                <div className="flex flex-wrap gap-3 text-xs mt-auto pt-3 border-t border-[var(--border-color)]">
                  <span className="flex items-center gap-1 text-[var(--text-muted)]"><Users size={14}/> Class 8-A</span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)]"><Calendar size={14}/> Assigned: {work.assignedDate}</span>
                  <span className="flex items-center gap-1 font-semibold text-[var(--color-danger)]"><Clock size={14}/> Due: {work.dueDate}</span>
                </div>
              </div>
            ))}
            {filteredWorks.length === 0 && (
              <div className="col-span-2 text-center p-8 text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                No assigned works found matching the selected filters.
              </div>
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden border border-[var(--border-color)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
                  <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Work Title</th>
                  <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Student ID</th>
                  <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Date Submitted</th>
                  <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Status</th>
                  <th className="p-4 text-sm font-semibold text-[var(--text-secondary)]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorks.flatMap(work => work.submissions.map((sub, idx) => (
                  <tr key={`${work.id}-${idx}`} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition">
                    <td className="p-4 text-sm font-medium">{work.title}</td>
                    <td className="p-4 text-sm">{sub.studentId}</td>
                    <td className="p-4 text-sm text-[var(--text-muted)]">{sub.date}</td>
                    <td className="p-4">
                      <span className="badge badge-active flex items-center gap-1 w-max"><CheckCircle2 size={12}/> {sub.status}</span>
                    </td>
                    <td className="p-4">
                      <button className="text-[var(--color-primary)] text-sm font-semibold hover:underline">Review File</button>
                    </td>
                  </tr>
                )))}
                {filteredWorks.every(w => w.submissions.length === 0) && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-[var(--text-muted)]">No submissions found matching the selected filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyWorkUpload;
