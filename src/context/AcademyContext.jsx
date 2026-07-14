import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAnnouncements, initialDailyReports, initialDailyWorks, studentPerformanceMock } from '../data/academyData';

const AcademyContext = createContext();

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};

export const AcademyProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('eduManageAnnouncements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [dailyReports, setDailyReports] = useState(() => {
    const saved = localStorage.getItem('eduManageDailyReports');
    return saved ? JSON.parse(saved) : initialDailyReports;
  });

  const [dailyWorks, setDailyWorks] = useState(() => {
    const saved = localStorage.getItem('eduManageDailyWorks');
    return saved ? JSON.parse(saved) : initialDailyWorks;
  });

  const [studentPerformance, setStudentPerformance] = useState(() => {
    const saved = localStorage.getItem('eduManageStudentPerformance');
    return saved ? JSON.parse(saved) : studentPerformanceMock;
  });

  useEffect(() => {
    localStorage.setItem('eduManageAnnouncements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('eduManageDailyReports', JSON.stringify(dailyReports));
  }, [dailyReports]);

  useEffect(() => {
    localStorage.setItem('eduManageDailyWorks', JSON.stringify(dailyWorks));
  }, [dailyWorks]);

  useEffect(() => {
    localStorage.setItem('eduManageStudentPerformance', JSON.stringify(studentPerformance));
  }, [studentPerformance]);

  const addAnnouncement = (announcement) => {
    setAnnouncements(prev => [{ ...announcement, id: `A00${prev.length + 4}` }, ...prev]);
  };

  const addDailyReport = (report) => {
    setDailyReports(prev => [{ ...report, id: `R00${prev.length + 3}` }, ...prev]);
  };

  const addDailyWork = (work) => {
    setDailyWorks(prev => [{ ...work, id: `W00${prev.length + 3}`, submissions: [] }, ...prev]);
  };

  const submitAssignment = (workId, studentId, file) => {
    setDailyWorks(prev => prev.map(work => {
      if (work.id === workId) {
        return {
          ...work,
          submissions: [...work.submissions, { studentId, status: 'Submitted', file, date: new Date().toISOString().split('T')[0] }]
        };
      }
      return work;
    }));
  };

  const markNotificationRead = (id) => {
    setStudentPerformance(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  return (
    <AcademyContext.Provider value={{
      announcements,
      dailyReports,
      dailyWorks,
      studentPerformance,
      addAnnouncement,
      addDailyReport,
      addDailyWork,
      submitAssignment,
      markNotificationRead
    }}>
      {children}
    </AcademyContext.Provider>
  );
};
