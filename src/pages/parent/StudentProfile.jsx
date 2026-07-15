import React from 'react';
import Header from '../../components/Header';
import { useStudents } from '../../hooks/useStudents';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, Hash } from 'lucide-react';

const StudentProfile = () => {
  const { students } = useStudents();
  const { currentUser } = useAuth();
  
  // Find the student linked to this parent, or fallback to first student
  const student = students.find(s => s.id === currentUser.studentId) || students[0];

  if (!student) {
    return <div className="p-8 text-center">No student record found.</div>;
  }

  return (
    <div className="main-content">
      <Header title="Student Profile" />
      <div className="page-wrapper animate-fade">
        <div className="glass-card overflow-hidden">
          <div className="bg-[var(--color-primary)] h-32 w-full relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                <img src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`} alt={student.name} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">{student.name}</h2>
                <p className="text-[var(--text-muted)] flex items-center gap-1 mt-1"><Hash size={16}/> {student.id}</p>
              </div>
              <span className={`badge ${student.status === 'Active' ? 'badge-active' : 'badge-suspended'} text-sm px-3 py-1`}>
                {student.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-[var(--border-color)]">Personal Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <User className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Gender</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.gender}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Date of Birth</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.dateOfBirth}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Address</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.address}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-[var(--border-color)]">Academic & Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <GraduationCap className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Class & Roll No</span>
                      <span className="font-medium text-[var(--text-primary)]">Class {student.class}-{student.section}, Roll #{student.rollNo}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Email</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.email}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Student Phone</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.phone}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <User className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Parent/Guardian Name</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.parentName || 'N/A'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="text-[var(--text-muted)] mt-0.5" size={18} />
                    <div>
                      <span className="block text-xs text-[var(--text-muted)]">Parent/Guardian Phone</span>
                      <span className="font-medium text-[var(--text-primary)]">{student.parentPhone || 'N/A'}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
