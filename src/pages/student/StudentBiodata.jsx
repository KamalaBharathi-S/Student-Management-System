import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Save, User, Phone, MapPin, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudents } from '../../hooks/useStudents';

const StudentBiodata = ({ studentId, isEmbedded }) => {
  const { role } = useAuth();
  const { students, getStudentById } = useStudents();
  const isReadOnly = role === 'teacher' || role === 'admin';

  // For direct Teacher access (not embedded), we need to track which student they select
  const [selectedTeacherStudentId, setSelectedTeacherStudentId] = useState(students.length > 0 ? students[0].id : '');
  
  // The effective student ID is either the prop (embedded) or the selected one (direct teacher view)
  const effectiveStudentId = studentId || (isReadOnly ? selectedTeacherStudentId : null);

  const [formData, setFormData] = useState({
    // Student Details
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    bloodGroup: '',
    nationality: '',
    religion: '',
    studentId: '',
    classSection: '8-A', // Keeping class default as per project scope
    rollNumber: '',

    // Parent Details
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    primaryContact: '',
    secondaryContact: '',
    email: '',
    guardianName: '',

    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    emergencyContact: '',

    // Medical / Additional
    medicalConditions: '',
    medications: '',
    transportMode: 'School Bus (Route 4)'
  });

  useEffect(() => {
    if (effectiveStudentId) {
      const student = getStudentById(effectiveStudentId);
      if (student) {
        // Pre-fill fields with existing student data
        setFormData(prev => ({
          ...prev,
          firstName: student.name.split(' ')[0] || '',
          lastName: student.name.split(' ').slice(1).join(' ') || '',
          studentId: student.id,
          classSection: `${student.class}-${student.section}`,
          rollNumber: student.rollNo,
          dob: student.dateOfBirth || '',
          gender: student.gender || 'Male',
          email: student.email || '',
          primaryContact: student.phone || '',
          address: student.address || '',
          fatherName: student.parentName || '',
          secondaryContact: student.parentPhone || '',
        }));
      }
    }
  }, [effectiveStudentId, getStudentById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here we would typically save to context or backend
    alert("Biodata updated successfully!");
  };

  const formContent = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Student Details Section */}
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-3">
              <User size={20} className="text-[var(--color-primary)]" />
              <h3 className="text-lg font-bold">Student Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} disabled={isReadOnly} className="form-select">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Blood Group</label>
                <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Nationality</label>
                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Student ID</label>
                <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Class & Section</label>
                <input type="text" name="classSection" value={formData.classSection} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
            </div>
          </div>

          {/* Parent Details Section */}
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-3">
              <Phone size={20} className="text-[var(--color-primary)]" />
              <h3 className="text-lg font-bold">Parent / Guardian Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group mb-2">
                <label className="form-label">Father's Name</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Father's Occupation</label>
                <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Mother's Name</label>
                <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Mother's Occupation</label>
                <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Primary Contact</label>
                <input type="tel" name="primaryContact" value={formData.primaryContact} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Secondary Contact</label>
                <input type="tel" name="secondaryContact" value={formData.secondaryContact} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group md:col-span-2 mb-2">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-3">
              <MapPin size={20} className="text-[var(--color-primary)]" />
              <h3 className="text-lg font-bold">Contact & Address</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group md:col-span-2 mb-2">
                <label className="form-label">Residential Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} disabled={isReadOnly} className="form-textarea min-h-[80px]"></textarea>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Emergency Contact</label>
                <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
            </div>
          </div>

          {/* Medical Info Section */}
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-color)] pb-3">
              <Activity size={20} className="text-[var(--color-primary)]" />
              <h3 className="text-lg font-bold">Additional / Medical Info</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="form-group mb-2">
                <label className="form-label">Medical Conditions / Allergies</label>
                <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} disabled={isReadOnly} className="form-textarea min-h-[60px]"></textarea>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Regular Medications</label>
                <input type="text" name="medications" value={formData.medications} onChange={handleChange} disabled={isReadOnly} className="form-input" />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Transport Mode</label>
                <select name="transportMode" value={formData.transportMode} onChange={handleChange} disabled={isReadOnly} className="form-select">
                  <option>School Bus (Route 4)</option>
                  <option>Private Van</option>
                  <option>Parent Drop</option>
                  <option>Walking</option>
                </select>
              </div>
            </div>
          </div>

          {!isReadOnly && (
            <div className="md:col-span-1 lg:col-span-2 flex justify-end mt-4 mb-8">
              <button onClick={handleSave} className="btn btn-primary btn-lg px-8 shadow-lg">
                <Save size={20} />
                Submit Biodata
              </button>
            </div>
          )}

        </div>
  );

  if (isEmbedded) {
    return formContent;
  }

  return (
    <div className="main-content">
      <Header title="Student Biodata" />
      <div className="page-wrapper animate-fade">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Personal Profile</h2>
            <p className="text-sm text-[var(--text-muted)]">
              {isReadOnly ? "View the biodata records of enrolled students." : "View and update your personal and family information."}
            </p>
          </div>
          {isReadOnly && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--text-secondary)]">Select Student:</span>
              <select 
                value={selectedTeacherStudentId} 
                onChange={(e) => setSelectedTeacherStudentId(e.target.value)}
                className="form-select min-w-[200px]"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>
                ))}
              </select>
            </div>
          )}
        </div>
        {formContent}
      </div>
    </div>
  );
};

export default StudentBiodata;
