import React, { useContext, useState } from 'react';
import { Sun, Moon, Bell, LogOut } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import { useAcademy } from '../context/AcademyContext';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
  const { theme, toggleTheme } = useContext(StudentContext);
  const { role, currentUser, logout } = useAuth();
  const { studentPerformance, markNotificationRead } = useAcademy();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = studentPerformance?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const roleLabel = role === 'teacher' ? 'Teacher' : role === 'parent' ? 'Parent' : role === 'student' ? 'Student' : 'Admin';

  return (
    <header className={`${styles.header} animate-fade`}>
      {/* Left: Page title */}
      <div className={styles.headerLeft}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <p className={styles.headerSubtitle}>{formatDate()}</p>
      </div>

      {/* Right: Actions */}
      <div className={styles.headerRight}>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className={styles.themeToggleBtn}
          title="Logout"
          aria-label="Logout"
          style={{ color: 'var(--color-danger)' }}
        >
          <LogOut size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={styles.themeToggleBtn}
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className={styles.notificationWrapper}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={styles.iconBtn}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className={styles.notificationBadge} />}
          </button>

          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <span className={styles.notificationTitle}>Notifications</span>
                {unreadCount > 0 && (
                  <span className={styles.notificationCount}>{unreadCount} New</span>
                )}
              </div>
              <div className={styles.notificationList}>
                {notifications.length === 0 ? (
                  <div className={styles.notificationEmpty}>No notifications yet.</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`${styles.notificationItem} ${n.read ? styles.read : ''}`}
                    >
                      <div className={`${styles.notificationDot} ${n.read ? styles.dotRead : ''}`} />
                      <div className={styles.notificationBody}>
                        <p className={styles.notificationMessage}>{n.message}</p>
                        <span className={styles.notificationDate}>{n.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.headerDivider} />

        {/* User profile */}
        <div className={styles.adminProfile}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            {initials}
          </div>
          <div>
            <div className={styles.adminName}>{currentUser?.name || 'User'}</div>
            <div className={styles.adminRolePill}>{roleLabel}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
