import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Megaphone, Plus, Trash2, Calendar, Eye } from 'lucide-react';
import Header from '../../components/Header';

const Announcements = () => {
  const { announcements, addAnnouncement } = useAcademy();
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', category: 'General', description: '', audience: 'All', publishDate: '', expiryDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement({
      ...formData,
      attachment: null,
      readBy: [],
    });
    setFormData({ title: '', category: 'General', description: '', audience: 'All', publishDate: '', expiryDate: '' });
    setShowForm(false);
  };

  return (
    <div className="main-content">
      <Header title="Announcements Management" />
      <div className="page-wrapper animate-fade">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Academy Announcements</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center gap-2">
            <Plus size={18} /> {showForm ? 'Cancel' : 'New Announcement'}
          </button>
        </div>

        {showForm && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl mb-8 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Create Announcement</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group col-span-2 md:col-span-1">
                <label className="form-label">Title</label>
                <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>General</option>
                  <option>Exam</option>
                  <option>Holiday</option>
                  <option>Event</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="form-group col-span-2">
                <label className="form-label">Description (Rich Text)</label>
                <textarea required rows="4" className="form-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Audience</label>
                <select className="form-select" value={formData.audience} onChange={e => setFormData({...formData, audience: e.target.value})}>
                  <option>All</option>
                  <option>All Students</option>
                  <option>All Parents</option>
                  <option>Specific Batch</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Publish Date</label>
                <input required type="date" className="form-input" value={formData.publishDate} onChange={e => setFormData({...formData, publishDate: e.target.value})} />
              </div>
              <div className="col-span-2 mt-2">
                <button type="submit" className="btn btn-primary w-full md:w-auto">Publish Announcement</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {announcements.map(ann => (
            <div key={ann.id} className="glass-card flex items-start gap-4 p-5 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-full flex-shrink-0 ${ann.category === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                <Megaphone size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">{ann.title}</h4>
                  <span className={`badge ${ann.category === 'Urgent' ? 'badge-suspended' : 'badge-graduated'}`}>{ann.category}</span>
                </div>
                <p className="text-[var(--text-secondary)] mt-2">{ann.description}</p>
                <div className="flex items-center gap-6 mt-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><Calendar size={14} /> Published: {ann.publishDate}</span>
                  <span className="flex items-center gap-1"><Eye size={14} /> Audience: {ann.audience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
