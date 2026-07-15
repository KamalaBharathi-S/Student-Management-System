import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import { useAcademy } from '../../context/AcademyContext';
import { useStudents } from '../../hooks/useStudents';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const TeacherAttendance = () => {
  const { students } = useStudents();
  const { attendanceRecords, markAttendance } = useAcademy();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(new Date().toISOString().slice(0, 10));

  // Determine days in month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // adjust for local timezone offset so ISO string matches local date
    const offset = d.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(d.getTime() - offset)).toISOString().slice(0, 10);
    setSelectedDateStr(localISOTime);
  };

  // Get current day's record or initialize
  const currentRecord = attendanceRecords[selectedDateStr] || {};
  
  const setStudentStatus = (studentId, status) => {
    const newRecord = { ...currentRecord, [studentId]: status };
    markAttendance(selectedDateStr, newRecord);
  };

  const markAllPresent = () => {
    const newRecord = { ...currentRecord };
    students.forEach(s => {
      if (!newRecord[s.id]) newRecord[s.id] = 'Present';
    });
    markAttendance(selectedDateStr, newRecord);
  };

  // Stats for the selected day
  const stats = useMemo(() => {
    let present = 0, absent = 0, late = 0;
    students.forEach(s => {
      const status = currentRecord[s.id];
      if (status === 'Present') present++;
      else if (status === 'Absent') absent++;
      else if (status === 'Late') late++;
    });
    return { present, absent, late, total: students.length };
  }, [currentRecord, students]);

  // Overall class trend
  const trend = useMemo(() => {
    let totalPossible = 0;
    let totalPresent = 0;
    Object.values(attendanceRecords).forEach(record => {
      students.forEach(s => {
        if (record[s.id]) {
          totalPossible++;
          if (record[s.id] === 'Present' || record[s.id] === 'Late') totalPresent++;
        }
      });
    });
    return totalPossible === 0 ? 0 : Math.round((totalPresent / totalPossible) * 100);
  }, [attendanceRecords, students]);

  return (
    <div className="main-content">
      <Header title="Attendance Management" />
      
      <div className="page-wrapper animate-fade">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Calendar & Stats */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Calendar Card */}
            <div className="glass-card-premium">
              <div className="flex justify-between items-center mb-4 border-b border-[var(--border-color)] pb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <CalendarIcon size={18} className="text-[var(--color-primary)]" />
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="icon-btn !w-8 !h-8"><ChevronLeft size={16} /></button>
                  <button onClick={nextMonth} className="icon-btn !w-8 !h-8"><ChevronRight size={16} /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[var(--text-muted)] mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const offset = d.getTimezoneOffset() * 60000;
                  const dateStr = (new Date(d.getTime() - offset)).toISOString().slice(0, 10);
                  const isSelected = dateStr === selectedDateStr;
                  const hasRecord = attendanceRecords[dateStr] && Object.keys(attendanceRecords[dateStr]).length > 0;
                  
                  return (
                    <div 
                      key={day} 
                      onClick={() => handleDateSelect(day)}
                      className={`
                        p-2 rounded-md cursor-pointer text-sm font-medium transition-all
                        ${isSelected ? 'bg-[var(--gradient-primary)] text-white shadow-md' : 'hover:bg-[var(--bg-hover)]'}
                        ${!isSelected && hasRecord ? 'border border-[var(--color-success)]' : ''}
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trends Card */}
            <div className="glass-card-premium">
              <h3 className="font-bold mb-4">Class Attendance Trend</h3>
              <div className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-xl mb-4">
                <div>
                  <div className="text-sm text-[var(--text-muted)]">Overall Present Rate</div>
                  <div className="text-3xl font-bold text-[var(--color-success)]">{trend}%</div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-[var(--color-success)] flex items-center justify-center">
                  <CheckCircle size={24} className="text-[var(--color-success)]" />
                </div>
              </div>
              
              <div className="text-sm text-[var(--text-muted)] mt-2">
                * Based on all recorded days in the current academic session.
              </div>
            </div>
            
          </div>

          {/* Right Column: Attendance List */}
          <div className="w-full lg:w-2/3 glass-card flex flex-col min-h-[600px]">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Attendance for {new Date(selectedDateStr).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="text-[var(--color-success)]">Present: {stats.present}</span>
                  <span className="text-[var(--color-danger)]">Absent: {stats.absent}</span>
                  <span className="text-[var(--color-warning)]">Late: {stats.late}</span>
                  <span className="text-[var(--text-muted)]">Unmarked: {stats.total - (stats.present + stats.absent + stats.late)}</span>
                </div>
              </div>
              <button onClick={markAllPresent} className="btn btn-primary whitespace-nowrap">
                Mark Unmarked as Present
              </button>
            </div>

            <div className="flex-1 overflow-auto pr-2">
              <table className="custom-table w-full">
                <thead className="sticky top-0 bg-[var(--card-bg)] z-10 shadow-sm">
                  <tr>
                    <th>Student</th>
                    <th>Roll No.</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => {
                    const status = currentRecord[student.id];
                    return (
                      <tr key={student.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--bg-hover)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)]" style={{ background: student.avatarColor, color: '#fff' }}>
                              {student.name.substring(0,2).toUpperCase()}
                            </div>
                            <span className="font-semibold">{student.name}</span>
                          </div>
                        </td>
                        <td className="text-[var(--text-muted)]">#{student.rollNo}</td>
                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setStudentStatus(student.id, 'Present')}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${status === 'Present' ? 'bg-[var(--color-success)] text-white shadow-md transform scale-105' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--color-success-bg)]'}`}
                            >
                              Present
                            </button>
                            <button 
                              onClick={() => setStudentStatus(student.id, 'Absent')}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${status === 'Absent' ? 'bg-[var(--color-danger)] text-white shadow-md transform scale-105' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--color-danger-bg)]'}`}
                            >
                              Absent
                            </button>
                            <button 
                              onClick={() => setStudentStatus(student.id, 'Late')}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${status === 'Late' ? 'bg-[var(--color-warning)] text-[#854d0e] shadow-md transform scale-105' : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--color-warning-bg)]'}`}
                            >
                              Late
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="text-center p-8 text-[var(--text-muted)]">
                  No students found. Add some students to the database first.
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
