import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { useAuth } from '../../context/AuthContext';
import { useStudents } from '../../hooks/useStudents';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, PieChart } from 'lucide-react';

const StudentAttendance = () => {
  const { currentUser, role } = useAuth();
  const { attendanceRecords } = useAcademy();
  const { students } = useStudents();
  
  // If Parent, they might select a student. For now, assume viewing their linked student.
  // In our mock, student1 has id 'STU-2026-001', parent1 is linked to student1 conceptually, but we can default to STU-2026-001 if not found.
  let targetStudentId = 'STU-2026-001';
  if (role === 'student' && currentUser) {
    // try to match student ID from users to students
    const matched = students.find(s => s.name.toLowerCase() === currentUser.name.toLowerCase());
    if (matched) targetStudentId = matched.id;
  }
  
  const student = students.find(s => s.id === targetStudentId);

  const [currentDate, setCurrentDate] = useState(new Date());

  // Determine days in month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // Compute stats for this student across ALL recorded days
  const stats = useMemo(() => {
    let present = 0, absent = 0, late = 0, total = 0;
    Object.values(attendanceRecords).forEach(record => {
      if (record[targetStudentId]) {
        total++;
        if (record[targetStudentId] === 'Present') present++;
        else if (record[targetStudentId] === 'Absent') absent++;
        else if (record[targetStudentId] === 'Late') late++;
      }
    });
    const percentage = total === 0 ? 100 : Math.round(((present + late) / total) * 100);
    return { present, absent, late, total, percentage };
  }, [attendanceRecords, targetStudentId]);

  return (
    <div className="main-content">
      <Header title={role === 'parent' ? "Student Attendance" : "My Attendance"} />
      
      <div className="page-wrapper animate-fade">
        {role === 'parent' && student && (
          <div className="mb-6">
            <h2 className="text-xl font-bold">Viewing records for: <span className="text-[var(--color-primary)]">{student.name}</span></h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card-premium flex flex-col justify-center items-center text-center p-6 border-b-4 border-[var(--color-primary)]">
            <PieChart size={32} className="text-[var(--color-primary)] mb-2" />
            <span className="text-[var(--text-muted)] text-sm">Overall Attendance</span>
            <span className="text-4xl font-bold mt-1 text-[var(--color-primary)]">{stats.percentage}%</span>
          </div>
          
          <div className="glass-card flex flex-col justify-center items-center text-center p-6 border-b-4 border-[var(--color-success)]">
            <CheckCircle size={32} className="text-[var(--color-success)] mb-2" />
            <span className="text-[var(--text-muted)] text-sm">Total Present</span>
            <span className="text-4xl font-bold mt-1 text-[var(--color-success)]">{stats.present}</span>
          </div>
          
          <div className="glass-card flex flex-col justify-center items-center text-center p-6 border-b-4 border-[var(--color-danger)]">
            <XCircle size={32} className="text-[var(--color-danger)] mb-2" />
            <span className="text-[var(--text-muted)] text-sm">Total Absent</span>
            <span className="text-4xl font-bold mt-1 text-[var(--color-danger)]">{stats.absent}</span>
          </div>

          <div className="glass-card flex flex-col justify-center items-center text-center p-6 border-b-4 border-[var(--color-warning)]">
            <Clock size={32} className="text-[var(--color-warning)] mb-2" />
            <span className="text-[var(--text-muted)] text-sm">Late Arrivals</span>
            <span className="text-4xl font-bold mt-1 text-[var(--color-warning)]">{stats.late}</span>
          </div>
        </div>

        <div className="glass-card-premium max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 border-b border-[var(--border-color)] pb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon size={24} className="text-[var(--color-primary)]" />
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="btn btn-secondary !px-3"><ChevronLeft size={20} /></button>
              <button onClick={nextMonth} className="btn btn-secondary !px-3"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4 text-center mb-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="font-bold text-[var(--text-muted)] text-xs uppercase tracking-wider hidden md:block">{day}</div>
            ))}
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="font-bold text-[var(--text-muted)] text-xs uppercase tracking-wider md:hidden">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="p-4" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const offset = d.getTimezoneOffset() * 60000;
              const dateStr = (new Date(d.getTime() - offset)).toISOString().slice(0, 10);
              
              const record = attendanceRecords[dateStr];
              const status = record ? record[targetStudentId] : null;

              let bgClass = 'bg-[var(--bg-hover)]';
              let textClass = 'text-[var(--text-primary)]';
              let borderClass = 'border-transparent';

              if (status === 'Present') {
                bgClass = 'bg-[var(--color-success-bg)]';
                textClass = 'text-[var(--color-success-text)] font-bold';
                borderClass = 'border-[var(--color-success)]';
              } else if (status === 'Absent') {
                bgClass = 'bg-[var(--color-danger-bg)]';
                textClass = 'text-[var(--color-danger-text)] font-bold';
                borderClass = 'border-[var(--color-danger)]';
              } else if (status === 'Late') {
                bgClass = 'bg-[var(--color-warning-bg)]';
                textClass = 'text-[var(--color-warning-text)] font-bold';
                borderClass = 'border-[var(--color-warning)]';
              }

              return (
                <div 
                  key={day} 
                  className={`relative flex flex-col items-center justify-center p-3 md:p-6 rounded-xl border-2 transition-all hover:-translate-y-1 ${bgClass} ${textClass} ${borderClass}`}
                >
                  <span className="text-lg md:text-2xl">{day}</span>
                  {status && (
                    <span className="absolute bottom-1 md:bottom-2 text-[10px] md:text-xs uppercase tracking-wider opacity-80 hidden md:block">
                      {status}
                    </span>
                  )}
                  {status && (
                    <span className="absolute bottom-1 text-[10px] uppercase tracking-wider opacity-80 md:hidden">
                      {status.charAt(0)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex justify-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-success)]"></div> Present
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-danger)]"></div> Absent
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]"></div> Late
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
