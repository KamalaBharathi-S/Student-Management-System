import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { FileText, Plus, Search, Calendar, Users, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';

const DailyReports = () => {
  const { dailyReports, addDailyReport } = useAcademy();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    batch: '',
    courseName: '',
    facultyName: '',
    topicsCovered: '',
    attendanceSummary: '',
    performanceSummary: '',
    remarks: '',
    nextDayPlan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDailyReport(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0], batch: '', courseName: '', facultyName: '',
      topicsCovered: '', attendanceSummary: '', performanceSummary: '', remarks: '', nextDayPlan: ''
    });
    setShowForm(false);
  };

  const filteredReports = dailyReports.filter(report => 
    report.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    report.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <Header title="Daily Academic Reports" />
      <div className="page-wrapper animate-fade">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text" 
              placeholder="Search reports by course, faculty, or batch..." 
              className="form-input pl-10 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center justify-center gap-2">
            <Plus size={18} /> {showForm ? 'Cancel' : 'Submit Report'}
          </button>
        </div>

        {showForm && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl mb-8 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Create Daily Report</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input required type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Batch</label>
                <input required type="text" placeholder="e.g. CSE-2024" className="form-input" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Faculty Name</label>
                <input required type="text" className="form-input" value={formData.facultyName} onChange={e => setFormData({...formData, facultyName: e.target.value})} />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Course Name</label>
                <input required type="text" className="form-input" value={formData.courseName} onChange={e => setFormData({...formData, courseName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Attendance Summary</label>
                <input required type="text" placeholder="e.g. 45/50 Present" className="form-input" value={formData.attendanceSummary} onChange={e => setFormData({...formData, attendanceSummary: e.target.value})} />
              </div>
              <div className="form-group md:col-span-3">
                <label className="form-label">Topics Covered</label>
                <textarea required rows="2" className="form-textarea" value={formData.topicsCovered} onChange={e => setFormData({...formData, topicsCovered: e.target.value})}></textarea>
              </div>
              <div className="form-group md:col-span-3">
                <label className="form-label">Student Performance Summary</label>
                <textarea required rows="2" className="form-textarea" value={formData.performanceSummary} onChange={e => setFormData({...formData, performanceSummary: e.target.value})}></textarea>
              </div>
              <div className="form-group md:col-span-3">
                <label className="form-label">Next Day Plan</label>
                <input required type="text" className="form-input" value={formData.nextDayPlan} onChange={e => setFormData({...formData, nextDayPlan: e.target.value})} />
              </div>
              <div className="md:col-span-3 mt-2">
                <button type="submit" className="btn btn-primary">Submit Report</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {filteredReports.map(report => (
            <div key={report.id} className="glass-card p-5">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">{report.courseName}</h4>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{report.facultyName} • {report.batch}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 badge badge-inactive"><Calendar size={14} /> {report.date}</span>
                  <span className="flex items-center gap-1 badge badge-graduated"><Users size={14} /> {report.attendanceSummary}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-[var(--border-color)]">
                <div>
                  <h5 className="font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-2"><FileText size={16}/> Topics Covered</h5>
                  <p className="text-[var(--text-secondary)]">{report.topicsCovered}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-2"><CheckCircle size={16}/> Next Day Plan</h5>
                  <p className="text-[var(--text-secondary)]">{report.nextDayPlan}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div className="text-center p-8 text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-xl">
              No reports found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReports;
