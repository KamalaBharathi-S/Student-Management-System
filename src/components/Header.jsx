import React, { useContext } from 'react';
import { Sun, Moon, Bell, GraduationCap } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import './Header.css';

const Header = ({ title }) => {
  const { theme, toggleTheme } = useContext(StudentContext);
  
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <header className="header animate-fade">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{formatDate()}</p>
      </div>
      
      <div className="header-right">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="notification-wrapper">
          <button className="icon-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="notification-badge"></span>
          </button>
        </div>
        
        <div className="header-divider"></div>
        
        <div className="admin-profile">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Admin Profile" 
            className="admin-avatar" 
            onError={(e) => {
              // Fail-safe if image fails to load
              e.target.style.display = 'none';
            }}
          />
          <div className="admin-fallback-avatar">AD</div>
          <span className="admin-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
