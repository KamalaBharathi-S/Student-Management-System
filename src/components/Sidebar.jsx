import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, User, GraduationCap, Megaphone, FileText, UploadCloud, FileBarChart, ClipboardCheck, CreditCard, Calendar, Library } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { role, currentUser } = useAuth();

  const getRoleLabel = () => {
    switch (role) {
      case 'teacher': return 'Teacher Portal';
      case 'student': return 'Student Portal';
      case 'parent':  return 'Parent Portal';
      default:        return 'Admin Portal';
    }
  };

  const getLinks = () => {
    switch (role) {
      case 'teacher':
      case 'admin':
        return [
          { to: '/',                    icon: LayoutDashboard, label: 'Dashboard',         exact: true },
          { to: '/teacher/students',    icon: Users,           label: 'Student Database'             },
          { to: '/teacher/biodata',     icon: User,            label: 'Student Biodata'              },
          { to: '/teacher/attendance',  icon: ClipboardCheck,  label: 'Attendance'                   },
          { to: '/teacher/fees',        icon: CreditCard,      label: 'Academic Fees'                },
          { to: '/teacher/homework',    icon: FileText,        label: 'Homework'                     },
          { to: '/teacher/assignments', icon: UploadCloud,     label: 'Assignments'                  },
          { to: '/teacher/marks',       icon: FileBarChart,    label: 'Marks'                        },
          { to: '/announcements',       icon: Megaphone,       label: 'Announcements'                },
          { to: '/library',             icon: Library,         label: 'Library'                      },
        ];
      case 'parent':
        return [
          { to: '/',                   icon: LayoutDashboard, label: 'Dashboard',   exact: true },
          { to: '/parent/biodata',     icon: User,            label: 'Biodata'                 },
          { to: '/parent/attendance',  icon: ClipboardCheck,  label: 'Attendance'              },
          { to: '/parent/fees',        icon: CreditCard,      label: 'Academic Fees'           },
          { to: '/parent/timetable',   icon: Calendar,        label: 'Timetable'               },
          { to: '/parent/homework',    icon: FileText,        label: 'Homework'                },
          { to: '/parent/assignments', icon: UploadCloud,     label: 'Assignments'             },
          { to: '/parent/marks',       icon: FileBarChart,    label: 'Marks'                   },
          { to: '/announcements',      icon: Megaphone,       label: 'Announcements'           },
        ];
      case 'student':
        return [
          { to: '/',                    icon: LayoutDashboard, label: 'Dashboard',   exact: true },
          { to: '/student/biodata',     icon: User,            label: 'Biodata'                 },
          { to: '/student/attendance',  icon: ClipboardCheck,  label: 'Attendance'              },
          { to: '/student/timetable',   icon: Calendar,        label: 'Timetable'               },
          { to: '/student/homework',    icon: FileText,        label: 'Homework'                },
          { to: '/student/assignments', icon: UploadCloud,     label: 'Assignments'             },
          { to: '/student/marks',       icon: FileBarChart,    label: 'Marks'                   },
          { to: '/announcements',       icon: Megaphone,       label: 'Announcements'           },
          { to: '/library',             icon: Library,         label: 'Library'                 },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const initials = currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U';
  const roleLabel = currentUser?.role === 'teacher' ? 'Teacher' : currentUser?.role === 'parent' ? 'Parent / Guardian' : 'Student';

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.sidebarBrand}>
        <div className={styles.brandIcon}>
          <GraduationCap size={20} />
        </div>
        <span className={styles.brandName}>
          Edu<span className={styles.brandHighlight}>Manage</span>
        </span>
      </div>

      {/* Role Tag */}
      <div className={styles.roleTag}>{getRoleLabel()}</div>

      {/* Navigation */}
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
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer user info */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userProfilePreview}>
          <div className={styles.userAvatar}>
            {initials}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{currentUser?.name || 'User'}</span>
            <span className={styles.userRole}>{roleLabel}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
