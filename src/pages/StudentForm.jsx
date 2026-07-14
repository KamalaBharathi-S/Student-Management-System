import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, Check } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import Header from '../components/Header';
import './StudentForm.css';

const StudentForm = () => {
  const { addStudent, updateStudent, getStudentById, departments, statuses } = useContext(StudentContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    department: departments[0] || 'Computer Science',
    enrollmentDate: new Date().toISOString().slice(0, 10),
    gpa: '',
    status: 'Active',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load student data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const student = getStudentById(id);
      if (student) {
        setFormData({
          ...student,
          gpa: String(student.gpa)
        });
      } else {
        // Redirect to database list if student not found
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
    
    // Clear validation error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name is required.";
    } else if (formData.firstName.trim().length < 2) {
      tempErrors.firstName = "First name must be at least 2 characters.";
    }
    
    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name is required.";
    } else if (formData.lastName.trim().length < 2) {
      tempErrors.lastName = "Last name must be at least 2 characters.";
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = "Please enter a valid email address.";
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    }
    
    if (!formData.dob) {
      tempErrors.dob = "Date of birth is required.";
    } else {
      const ageLimitDate = new Date();
      ageLimitDate.setFullYear(ageLimitDate.getFullYear() - 15);
      const dobDate = new Date(formData.dob);
      if (dobDate > ageLimitDate) {
        tempErrors.dob = "Students must be at least 15 years old.";
      }
    }
    
    if (!formData.enrollmentDate) {
      tempErrors.enrollmentDate = "Enrollment date is required.";
    }
    
    const gpaVal = parseFloat(formData.gpa);
    if (formData.gpa === '' || isNaN(gpaVal)) {
      tempErrors.gpa = "GPA score is required.";
    } else if (gpaVal < 0 || gpaVal > 4.0) {
      tempErrors.gpa = "GPA must be between 0.00 and 4.00.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        <div className="navigation-back-wrapper">
          <Link to={isEditMode ? `/students/${id}` : "/students"} className="btn-link">
            <ArrowLeft size={16} /> Back to Database
          </Link>
        </div>

        {/* Success Alert Banner */}
        {submitSuccess && (
          <div className="alert alert-success animate-fade">
            <Check size={20} />
            <span>
              Student record has been successfully {isEditMode ? "updated" : "saved"}! Redirecting...
            </span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="glass-card student-form">
          
          {/* Section 1: Personal Details */}
          <div className="form-section">
            <h4 className="section-title">Personal Information</h4>
            <div className="fields-grid-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                  placeholder="e.g. Eleanor"
                />
                {errors.firstName && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                  placeholder="e.g. Vance"
                />
                {errors.lastName && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.lastName}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dob">Date of Birth</label>
                <input 
                  type="date" 
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`form-input ${errors.dob ? 'input-error' : ''}`}
                />
                {errors.dob && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.dob}</span>
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
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="form-section">
            <h4 className="section-title">Contact & Location</h4>
            <div className="fields-grid-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
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
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  placeholder="+1 (555) 000-0000"
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
          <div className="form-section">
            <h4 className="section-title">Academic Details</h4>
            <div className="fields-grid-3col">
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
                  className={`form-input ${errors.gpa ? 'input-error' : ''}`}
                  placeholder="0.00 - 4.00"
                />
                {errors.gpa && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.gpa}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="enrollmentDate">Enrolment Date</label>
                <input 
                  type="date" 
                  id="enrollmentDate"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  className={`form-input ${errors.enrollmentDate ? 'input-error' : ''}`}
                />
                {errors.enrollmentDate && (
                  <span className="form-error"><AlertCircle size={12} /> {errors.enrollmentDate}</span>
                )}
              </div>
            </div>

            {isEditMode && (
              <div className="fields-grid-3col">
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
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions-wrapper">
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
