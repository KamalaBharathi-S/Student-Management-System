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
    return localStorage.getItem('eduManageRole') || null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('eduManageUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('eduManageRole', role);
    } else {
      localStorage.removeItem('eduManageRole');
    }
  }, [role]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eduManageUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eduManageUser');
    }
  }, [currentUser]);

  const login = async (username, password) => {
    try {
      // Try hitting the PHP backend
      const response = await fetch('http://localhost/backend/api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setCurrentUser(data.user);
        setRole(data.user.role);
        return true;
      }
      return false;
    } catch (error) {
      console.warn("Backend not reachable. Falling back to mock login.", error);
      // Fallback for UI preview if PHP server isn't running yet
      if (username === 'teacher1' && password === 'password') {
        setRole('teacher');
        setCurrentUser({ id: 1, username: 'teacher1', role: 'teacher', name: 'Alice Smith' });
        return true;
      } else if (username === 'student1' && password === 'password') {
        setRole('student');
        setCurrentUser({ id: 2, username: 'student1', role: 'student', name: 'Bob Jones' });
        return true;
      } else if (username === 'parent1' && password === 'password') {
        setRole('parent');
        setCurrentUser({ id: 3, username: 'parent1', role: 'parent', name: 'Charlie Jones' });
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setRole(null);
    setCurrentUser(null);
  };

  const switchRole = (newRole) => {
    // Only keep this for dev/debugging if needed, or remove it
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, currentUser, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
