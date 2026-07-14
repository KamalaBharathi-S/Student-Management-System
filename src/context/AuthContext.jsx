import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('eduManageRole');
    return savedRole || 'admin'; // default to admin
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('eduManageUser');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'System Admin',
      id: 'A001',
      studentId: null, // For parents, who they are tracking. For students, their own ID.
    };
  });

  useEffect(() => {
    localStorage.setItem('eduManageRole', role);
    
    // Mock user data based on role switch
    if (role === 'admin') {
      setCurrentUser({ name: 'System Admin', id: 'A001', studentId: null });
    } else if (role === 'parent') {
      setCurrentUser({ name: 'Jane Doe', id: 'P001', studentId: 'STU001' });
    } else if (role === 'student') {
      setCurrentUser({ name: 'Eleanor Vance', id: 'STU001', studentId: 'STU001' });
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem('eduManageUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, currentUser, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
