import React, { useContext, useState } from 'react';
import { Sun, Moon, Bell, ChevronDown } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
  const { theme, toggleTheme } = useContext(StudentContext);
  const { role, currentUser, switchRole } = useAuth();
  const { studentPerformance, markNotificationRead } = useAcademy();
  const navigate = useNavigate();
  
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = studentPerformance.notifications || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleRoleChange = (newRole) => {
    switchRole(newRole);
    setShowRoleMenu(false);
    navigate('/'); // Redirect to base so the router picks up the correct dashboard
  };

  return (
    <header className={`${styles.header} animate-fade flex justify-between items-center w-full z-50`}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <p className={styles.headerSubtitle}>{formatDate()}</p>
      </div>
      
      <div className={`${styles.headerRight} flex items-center gap-4`}>
        {/* Role Switcher (Simulated Login Dropdown) */}
        <div className="relative">
          <button 
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition"
          >
            <span className="text-sm font-semibold capitalize text-[var(--color-primary)]">Viewing as: {role}</span>
            <ChevronDown size={16} className="text-[var(--text-muted)]" />
          </button>
          
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-primary)]">Switch Role</div>
              <button onClick={() => handleRoleChange('admin')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[var(--bg-primary)] ${role === 'admin' ? 'font-bold text-[var(--color-primary)]' : ''}`}>Admin Portal</button>
              <button onClick={() => handleRoleChange('parent')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[var(--bg-primary)] border-t border-[var(--border-color)] ${role === 'parent' ? 'font-bold text-[var(--color-primary)]' : ''}`}>Parent Portal</button>
              <button onClick={() => handleRoleChange('student')} className={`block w-full text-left px-4 py-3 text-sm hover:bg-[var(--bg-primary)] border-t border-[var(--border-color)] ${role === 'student' ? 'font-bold text-[var(--color-primary)]' : ''}`}>Student Portal</button>
            </div>
          )}
        </div>

        <button 
          onClick={toggleTheme} 
          className={styles.themeToggleBtn}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className={`${styles.iconBtn} relative`} aria-label="Notifications">
            <Bell size={20} />
            {unreadCount > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></span>}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-lg z-50 flex flex-col max-h-[400px]">
              <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">{unreadCount} New</span>}
              </div>
              <div className="overflow-y-auto flex-1 p-2">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-[var(--text-muted)] text-sm">No notifications.</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`p-3 mb-1 rounded-lg cursor-pointer transition ${n.read ? 'opacity-60' : 'bg-[var(--bg-primary)] hover:bg-[var(--border-color)]'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-transparent' : 'bg-red-500'}`}></span>
                        <p className="text-sm ml-2 flex-1">{n.message}</p>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] block text-right">{n.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.headerDivider}></div>
        
        <div className={styles.adminProfile}>
          <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
            {currentUser.name.charAt(0)}
          </div>
          <div className="hidden md:block ml-2">
            <span className="block text-sm font-bold leading-tight">{currentUser.name}</span>
            <span className="block text-xs text-[var(--text-muted)] capitalize">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
