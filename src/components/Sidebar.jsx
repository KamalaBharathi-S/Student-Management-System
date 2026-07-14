import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Megaphone, FileText, UploadCloud, FileBarChart, ClipboardCheck, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { role, currentUser } = useAuth();

  const getLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
          { to: '/students', icon: Users, label: 'Student List' },
          { to: '/announcements', icon: Megaphone, label: 'Announcements' },
          { to: '/daily-reports', icon: FileText, label: 'Daily Reports' },
          { to: '/daily-work', icon: UploadCloud, label: 'Daily Work Upload' },
        ];
      case 'parent':
        return [
          { to: '/', icon: LayoutDashboard, label: 'Parent Dashboard', exact: true },
          { to: '/student-profile', icon: Users, label: 'Student Profile' },
          { to: '/marksheet', icon: FileBarChart, label: 'Marksheet' },
          { to: '/assigned-work', icon: ClipboardCheck, label: 'Assigned Work' },
        ];
      case 'student':
        return [
          { to: '/', icon: LayoutDashboard, label: 'Student Dashboard', exact: true },
          { to: '/submissions', icon: UploadCloud, label: 'Assignment Submission' },
          { to: '/online-tests', icon: FileText, label: 'Online Tests' },
          { to: '/marks-results', icon: FileBarChart, label: 'Marks & Results' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <GraduationCap size={32} className={styles.brandIcon} />
        <span className={styles.brandName}>Academy<span className={styles.brandHighlight}>Pro</span></span>
      </div>
      
      <nav className={styles.sidebarNav}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink 
              key={link.to}
              to={link.to} 
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              end={link.exact}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className={styles.sidebarFooter}>
        <div className={styles.userProfilePreview}>
          <div className="w-8 h-8 rounded bg-[var(--bg-primary)] flex items-center justify-center font-bold text-[var(--color-primary)] shadow-inner">
            {currentUser.name.charAt(0)}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{currentUser.name}</span>
            <span className={styles.userRole}>{role === 'admin' ? 'Administrator' : role === 'parent' ? 'Parent / Guardian' : 'Student'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
