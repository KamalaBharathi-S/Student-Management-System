import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, Mail, Phone, MapPin, Award, User, Clock, Users } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import Header from '../components/Header';
import StudentBiodata from './student/StudentBiodata';
import styles from './StudentDetails.module.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent } = useStudents();
  const student = getStudentById(id);

  const [activeTab, setActiveTab] = useState('personal');

  if (!student) {
    return (
      <div className="main-content">
        <Header title="Student Profile Details" />
        <div className="page-wrapper animate-slide-up">
          <div className={`glass-card ${styles.errorCardFull}`}>
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
    if (window.confirm(`Are you sure you want to permanently delete the profile of ${student.name}?`)) {
      deleteStudent(student.id);
      navigate('/students');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Format Dates
  const formattedDob = new Date(student.dateOfBirth).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const formattedEnrollment = new Date(student.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="main-content">
      <Header title={`${student.name}'s Profile`} />
      
      <div className="page-wrapper animate-slide-up">
        {/* Top bar controls */}
        <div className={styles.detailsHeaderNav}>
          <Link to="/students" className="btn-link">
            <ArrowLeft size={16} /> Back to Database
          </Link>
          
          <div className={styles.headerActionButtons}>
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
        <div className={styles.profileGridContainer}>
          {/* Main Left Details Banner */}
          <div className={`glass-card ${styles.profileBannerCard}`}>
            <div className={styles.profileBannerHero} style={{ background: student.avatarColor }}></div>
            <div className={styles.profileAvatarWrapper}>
              <div className={styles.profileLargeAvatar} style={{ background: student.avatarColor }}>
                {getInitials(student.name)}
              </div>
            </div>
            
            <div className={styles.profileHeroContent}>
              <h2 className={styles.profileFullName}>{student.name}</h2>
              <span className={styles.profileSubTitle}>{student.id}</span>
              <div className={styles.profileStatusBadgeWrap}>
                <span className={`badge badge-${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </div>
            </div>

            <div className={styles.tabsNavigation}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Academic Profile
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'personal' ? styles.active : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                Biodata
              </button>
            </div>
          </div>

          {/* Details Content Box */}
          <div className={styles.profileInfoCard}>
            {activeTab === 'profile' ? (
              <div className="tab-pane-content animate-fade">
                <h3 className={styles.paneSectionTitle}>Academic Standing</h3>
                
                <div className={styles.academicStatsRow}>
                  <div className={styles.statDisplayBox}>
                    <span className={styles.statLabel}>Roll Number</span>
                    <span className={styles.statValueHighlight}>#{student.rollNo}</span>
                  </div>
                  
                  <div className={styles.statDisplayBox}>
                    <span className={styles.statLabel}>Admission Number</span>
                    <span className={`${styles.statValueHighlight} ${styles.textGreen}`}>
                      {student.id.split('-')[2]}
                    </span>
                  </div>
                </div>

                <div className={styles.detailsInfoGrid}>
                  <div className={styles.infoItemBlock}>
                    <Award size={18} className={styles.infoIcon} />
                    <div className={styles.infoLabelVal}>
                      <span className={styles.infoLabel}>Class</span>
                      <span className={styles.infoValue}>Class {student.class}</span>
                    </div>
                  </div>

                  <div className={styles.infoItemBlock}>
                    <Calendar size={18} className={styles.infoIcon} />
                    <div className={styles.infoLabelVal}>
                      <span className={styles.infoLabel}>Registration Date</span>
                      <span className={styles.infoValue}>{formattedEnrollment}</span>
                    </div>
                  </div>

                  <div className={styles.infoItemBlock}>
                    <Clock size={18} className={styles.infoIcon} />
                    <div className={styles.infoLabelVal}>
                      <span className={styles.infoLabel}>Section</span>
                      <span className={styles.infoValue}>
                        Section {student.section}
                      </span>
                    </div>
                  </div>

                  <div className={styles.infoItemBlock}>
                    <User size={18} className={styles.infoIcon} />
                    <div className={styles.infoLabelVal}>
                      <span className={styles.infoLabel}>Enrolment Status</span>
                      <span className={styles.infoValue}>{student.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tab-pane-content animate-fade">
                <StudentBiodata isEmbedded={true} studentId={student.id} />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDetails;
