import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, Check } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import { validateStudentForm } from '../utils/validation';
import Header from '../components/Header';
import styles from './StudentForm.module.css';

const StudentForm = () => {
  const { addStudent, updateStudent, getStudentById, departments, statuses } = useStudents();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    department: departments[0] || 'Computer Science',
    year: '1',
    gpa: '',
    status: 'Active',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const student = getStudentById(id);
      if (student) {
        setFormData({
          ...student,
          gpa: String(student.gpa)
        });
      } else {
        navigate('/students');
      }
    }
  }, [id, isEditMode, getStudentById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validateStudentForm(formData);
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    if (isEditMode) {
      updateStudent(id, formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        navigate(`/students/${id}`);
      }, 1000);
    } else {
      const newStudent = addStudent(formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        navigate(`/students/${newStudent.id}`);
      }, 1000);
    }
  };

  return (
    <div className="main-content">
      <Header title={isEditMode ? "Modify Student Record" : "New Student Enrollment"} />
      
      <div className="page-wrapper animate-slide-up">
        {/* Back Link */}
        <div className={styles.navigationBackWrapper}>
          <Link to={isEditMode ? `/students/${id}` : "/students"} className="btn-link">
            <ArrowLeft size={16} /> Back to Database
          </Link>
        </div>

        {/* Success Alert Banner */}
        {submitSuccess && (
          <div className={`${styles.alert} ${styles.alertSuccess} animate-fade`}>
            <Check size={20} />
            <span>
              Student record has been successfully {isEditMode ? "updated" : "saved"}! Redirecting...
            </span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className={`glass-card ${styles.studentForm}`}>
          
          {/* Section 1: Personal Details */}
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>Personal Information</h4>
            <div className={styles.fieldsGrid2col}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? styles.inputError : ''}`}
                  placeholder="e.g. Eleanor Vance"
                />
                {errors.name && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
                <input 
                  type="date" 
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`form-input ${errors.dateOfBirth ? styles.inputError : ''}`}
                />
                {errors.dateOfBirth && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.dateOfBirth}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gender">Gender Identity</label>
                <select 
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="year">Academic Year</label>
                <select 
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="1">1st Year (Freshman)</option>
                  <option value="2">2nd Year (Sophomore)</option>
                  <option value="3">3rd Year (Junior)</option>
                  <option value="4">4th Year (Senior)</option>
                </select>
                {errors.year && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.year}</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>Contact & Location</h4>
            <div className={styles.fieldsGrid2col}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? styles.inputError : ''}`}
                  placeholder="name@university.edu"
                />
                {errors.email && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Mobile/Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? styles.inputError : ''}`}
                  placeholder="e.g. 9876543210"
                />
                {errors.phone && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">Residential Address</label>
              <textarea 
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Street address, City, State/Zip"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Academic Information */}
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>Academic Details</h4>
            <div className={styles.fieldsGrid3col}>
              <div className="form-group">
                <label className="form-label" htmlFor="department">Department</label>
                <select 
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-select"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gpa">Cumulative GPA</label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0.00"
                  max="4.00"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  className={`form-input ${errors.gpa ? styles.inputError : ''}`}
                  placeholder="0.00 - 4.00"
                />
                {errors.gpa && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.gpa}</span>
                )}
              </div>

              {isEditMode && (
                <div className="form-group">
                  <label className="form-label" htmlFor="status">Enrolment Status</label>
                  <select 
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActionsWrapper}>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate(isEditMode ? `/students/${id}` : "/students")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitSuccess}
            >
              <Save size={18} /> {isEditMode ? "Save Changes" : "Register Student"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentForm;
