import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, GraduationCap } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <GraduationCap size={32} className="brand-icon" />
        <span className="brand-name">Edu<span className="brand-highlight">Manage</span></span>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          end
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/students" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Student List</span>
        </NavLink>
        
        <NavLink 
          to="/add" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <UserPlus size={20} />
          <span>Add Student</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile-preview">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Admin Portal</span>
            <span className="user-role">Registrar</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
