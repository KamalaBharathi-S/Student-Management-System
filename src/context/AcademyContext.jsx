import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialAnnouncements,
  initialDailyReports,
  initialHomework,
  initialAssignments,
  studentPerformanceMock,
} from '../data/academyData';

// Generate some mock attendance data for the current month
const generateMockAttendance = () => {
  const records = {};
  const today = new Date();
  for (let i = 1; i <= today.getDate(); i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), i);
    // skip weekends
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const dateStr = d.toISOString().slice(0, 10);
      records[dateStr] = {
        'STU-2026-001': Math.random() > 0.1 ? 'Present' : 'Absent',
        'STU-2026-002': Math.random() > 0.05 ? 'Present' : 'Late',
        'STU-2026-003': Math.random() > 0.2 ? 'Present' : 'Absent',
        'STU-2026-004': 'Present',
        'STU-2026-005': 'Present'
      };
    }
  }
  return records;
};

const AcademyContext = createContext();

export const useAcademy = () => {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error('useAcademy must be used within AcademyProvider');
  return ctx;
};

const genId = (prefix, list) => `${prefix}${String(list.length + 1).padStart(3, '0')}`;

export const AcademyProvider = ({ children }) => {
  // ── State ────────────────────────────────────────────────────
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('sms_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [dailyReports, setDailyReports] = useState(() => {
    const saved = localStorage.getItem('sms_dailyReports');
    return saved ? JSON.parse(saved) : initialDailyReports;
  });

  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('sms_homework');
    return saved ? JSON.parse(saved) : initialHomework;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('sms_assignments');
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [studentPerformance, setStudentPerformance] = useState(() => {
    const saved = localStorage.getItem('sms_studentPerformance');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.tests) {
        parsed.tests = studentPerformanceMock.tests;
      }
      return parsed;
    }
    return studentPerformanceMock;
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem('sms_attendance');
    return saved ? JSON.parse(saved) : generateMockAttendance();
  });

  // ── Persistence ──────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('sms_announcements',       JSON.stringify(announcements)); },      [announcements]);
  useEffect(() => { localStorage.setItem('sms_dailyReports',        JSON.stringify(dailyReports)); },       [dailyReports]);
  useEffect(() => { localStorage.setItem('sms_homework',            JSON.stringify(homework)); },           [homework]);
  useEffect(() => { localStorage.setItem('sms_assignments',         JSON.stringify(assignments)); },        [assignments]);
  useEffect(() => { localStorage.setItem('sms_studentPerformance',  JSON.stringify(studentPerformance)); }, [studentPerformance]);
  useEffect(() => { localStorage.setItem('sms_attendance',          JSON.stringify(attendanceRecords)); },  [attendanceRecords]);

  // ── Announcement Actions ──────────────────────────────────────
  const addAnnouncement = (ann) => {
    setAnnouncements(prev => [{ ...ann, id: genId('A', prev), publishDate: new Date().toISOString().slice(0,10), readBy: [] }, ...prev]);
  };

  // ── Attendance Actions ────────────────────────────────────────
  const markAttendance = (date, records) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [date]: records
    }));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // ── Daily Lesson Log Actions ──────────────────────────────────
  const addDailyReport = (report) => {
    setDailyReports(prev => [{ ...report, id: genId('R', prev) }, ...prev]);
  };

  // ── Homework Actions ──────────────────────────────────────────
  const addHomework = (hw) => {
    setHomework(prev => [{ ...hw, id: genId('HW', prev), submissions: [] }, ...prev]);
  };

  const submitHomework = (hwId, studentId, remark = null) => {
    setHomework(prev => prev.map(hw =>
      hw.id !== hwId ? hw : {
        ...hw,
        submissions: [
          ...hw.submissions.filter(s => s.studentId !== studentId),
          { studentId, status: 'Submitted', date: new Date().toISOString().slice(0,10), remark }
        ]
      }
    ));
    // Also update student's own homework list
    setStudentPerformance(prev => ({
      ...prev,
      homework: prev.homework.map(h => h.id === hwId ? { ...h, status: 'Submitted' } : h)
    }));
  };

  const gradeHomework = (hwId, studentId, remark) => {
    setHomework(prev => prev.map(hw =>
      hw.id !== hwId ? hw : {
        ...hw,
        submissions: hw.submissions.map(s =>
          s.studentId === studentId ? { ...s, remark } : s
        )
      }
    ));
  };

  // ── Assignment Actions ────────────────────────────────────────
  const addAssignment = (assign) => {
    setAssignments(prev => [{ ...assign, id: genId('AS', prev), submissions: [] }, ...prev]);
  };

  const submitAssignment = (assignId, studentId) => {
    setAssignments(prev => prev.map(as =>
      as.id !== assignId ? as : {
        ...as,
        submissions: [
          ...as.submissions.filter(s => s.studentId !== studentId),
          { studentId, status: 'Submitted', date: new Date().toISOString().slice(0,10), marks: null, remark: null }
        ]
      }
    ));
    setStudentPerformance(prev => ({
      ...prev,
      assignments: prev.assignments.map(a => a.id === assignId ? { ...a, status: 'Submitted' } : a)
    }));
  };

  const gradeAssignment = (assignId, studentId, marks, remark) => {
    setAssignments(prev => prev.map(as =>
      as.id !== assignId ? as : {
        ...as,
        submissions: as.submissions.map(s =>
          s.studentId === studentId ? { ...s, marks, remark } : s
        )
      }
    ));
  };

  // ── Notification Actions ──────────────────────────────────────
  const markNotificationRead = (id) => {
    setStudentPerformance(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const addNotification = (message) => {
    setStudentPerformance(prev => ({
      ...prev,
      notifications: [
        { id: genId('N', prev.notifications), message, date: new Date().toISOString().slice(0,10), read: false },
        ...prev.notifications
      ]
    }));
  };

  // ── Context Value ─────────────────────────────────────────────
  return (
    <AcademyContext.Provider value={{
      // Data
      announcements,
      dailyReports,
      homework,
      assignments,
      studentPerformance,
      attendanceRecords,

      // Announcement
      addAnnouncement,
      deleteAnnouncement,

      // Daily Log
      addDailyReport,

      // Homework
      addHomework,
      submitHomework,
      gradeHomework,

      // Assignment
      addAssignment,
      submitAssignment,
      gradeAssignment,

      // Notifications
      markNotificationRead,
      addNotification,

      // Attendance
      markAttendance,

      // Legacy alias
      dailyWorks: homework,
      addDailyWork: addHomework,
    }}>
      {children}
    </AcademyContext.Provider>
  );
};
