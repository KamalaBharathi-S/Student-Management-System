import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, Mail, Phone, MapPin, Award, User, Clock, Check } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import Header from '../components/Header';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent } = useContext(StudentContext);
  const student = getStudentById(id);

  const [activeTab, setActiveTab] = useState('profile');

  if (!student) {
    return (
      <div className="main-content">
        <Header title="Student Profile Details" />
        <div className="page-wrapper animate-slide-up">
          <div className="glass-card error-card-full">
            <h3>Record Not Found</h3>
            <p>The student registry ID <strong>{id}</strong> could not be located in our system.</p>
            <Link to="/students" className="btn btn-primary mt-4">
              Return to Database
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete the profile of ${student.firstName} ${student.lastName}?`)) {
      deleteStudent(student.id);
      navigate('/students');
    }
  };

  // Format Dates
  const formattedDob = new Date(student.dob).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const formattedEnrollment = new Date(student.enrollmentDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="main-content">
      <Header title={`${student.firstName}'s Profile`} />
      
      <div className="page-wrapper animate-slide-up">
        {/* Top bar controls */}
        <div className="details-header-nav">
          <Link to="/students" className="btn-link">
            <ArrowLeft size={16} /> Back to Database
          </Link>
          
          <div className="header-action-buttons">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate(`/edit/${student.id}`)}
            >
              <Edit size={16} /> Edit Profile
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <Trash2 size={16} /> Delete Record
            </button>
          </div>
        </div>

        {/* Profile Card Layout */}
        <div className="profile-grid-container">
          {/* Main Left Details Banner */}
          <div className="glass-card profile-banner-card">
            <div className="profile-banner-hero" style={{ background: student.avatarColor }}></div>
            <div className="profile-avatar-wrapper">
              <div className="profile-large-avatar" style={{ background: student.avatarColor }}>
                {student.firstName[0]}{student.lastName[0]}
              </div>
            </div>
            
            <div className="profile-hero-content">
              <h2 className="profile-full-name">{student.firstName} {student.lastName}</h2>
              <span className="profile-sub-title">{student.id}</span>
              <div className="profile-status-badge-wrap">
                <span className={`badge badge-${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </div>
            </div>

            <div className="tabs-navigation">
              <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Academic Profile
              </button>
              <button 
                className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Details
              </button>
            </div>
          </div>

          {/* Details Content Box */}
          <div className="glass-card profile-info-card">
            {activeTab === 'profile' ? (
              <div className="tab-pane-content animate-fade">
                <h3 className="pane-section-title">Academic Standing</h3>
                
                <div className="academic-stats-row">
                  <div className="stat-display-box">
                    <span className="stat-label">Cumulative GPA</span>
                    <span className="stat-value-highlight">{student.gpa.toFixed(2)}</span>
                    <div className="gpa-progress-track">
                      <div 
                        className="gpa-progress-fill" 
                        style={{ width: `${(student.gpa / 4.0) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="stat-display-box">
                    <span className="stat-label">Standing Status</span>
                    <span className="stat-value-highlight text-green">
                      {student.gpa >= 3.5 ? 'Excellent' : student.gpa >= 3.0 ? 'Good' : student.gpa >= 2.0 ? 'Satisfactory' : 'Critical'}
                    </span>
                  </div>
                </div>

                <div className="details-info-grid">
                  <div className="info-item-block">
                    <Award size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Faculty Department</span>
                      <span className="info-value">{student.department}</span>
                    </div>
                  </div>

                  <div className="info-item-block">
                    <Calendar size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Enrollment Date</span>
                      <span className="info-value">{formattedEnrollment}</span>
                    </div>
                  </div>

                  <div className="info-item-block">
                    <Clock size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Year of Study</span>
                      <span className="info-value">
                        {Math.max(1, new Date().getFullYear() - new Date(student.enrollmentDate).getFullYear())} Year
                      </span>
                    </div>
                  </div>

                  <div className="info-item-block">
                    <User size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Registrar Status</span>
                      <span className="info-value">{student.status} Enrolled</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tab-pane-content animate-fade">
                <h3 className="pane-section-title">Demographics & Contact</h3>
                
                <div className="details-info-grid">
                  <div className="info-item-block">
                    <User size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Gender Identity</span>
                      <span className="info-value">{student.gender}</span>
                    </div>
                  </div>

                  <div className="info-item-block">
                    <Calendar size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Date of Birth</span>
                      <span className="info-value">{formattedDob}</span>
                    </div>
                  </div>

                  <div className="info-item-block">
                    <Mail size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Email Address</span>
                      <span className="info-value">
                        <a href={`mailto:${student.email}`} className="email-link">
                          {student.email}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="info-item-block">
                    <Phone size={18} className="info-icon" />
                    <div className="info-label-val">
                      <span className="info-label">Phone Number</span>
                      <span className="info-value">{student.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="address-section-block">
                  <div className="info-item-block align-top">
                    <MapPin size={18} className="info-icon mt-1" />
                    <div className="info-label-val">
                      <span className="info-label">Residential Address</span>
                      <span className="info-value-block">{student.address || 'No residential address on file.'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDetails;
