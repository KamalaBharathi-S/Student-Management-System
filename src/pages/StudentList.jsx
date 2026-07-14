import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Edit2, Trash2, Plus, ArrowUpDown, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { StudentContext } from '../context/StudentContext';
import Header from '../components/Header';
import './StudentList.css';

const StudentList = () => {
  const { students, departments, statuses, deleteStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  // Filters & Controls state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filter & Sort Pipeline
  const processedStudents = useMemo(() => {
    let result = [...students];

    // 1. Searching (Name or ID)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.firstName.toLowerCase().includes(term) ||
        student.lastName.toLowerCase().includes(term) ||
        student.id.toLowerCase().includes(term)
      );
    }

    // 2. Department Filtering
    if (selectedDept !== '') {
      result = result.filter(student => student.department === selectedDept);
    }

    // 3. Status Filtering
    if (selectedStatus !== '') {
      result = result.filter(student => student.status === selectedStatus);
    }

    // 4. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'name-desc':
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        case 'gpa-desc':
          return b.gpa - a.gpa;
        case 'gpa-asc':
          return a.gpa - b.gpa;
        case 'id-asc':
          return a.id.localeCompare(b.id);
        case 'id-desc':
          return b.id.localeCompare(a.id);
        case 'date-desc':
          return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
        case 'date-asc':
          return new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
        default:
          return 0;
      }
    });

    return result;
  }, [students, searchTerm, selectedDept, selectedStatus, sortBy]);

  // Reset pagination when inputs change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDept, selectedStatus, sortBy, pageSize]);

  // Pagination calculations
  const totalItems = processedStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = useMemo(() => {
    return processedStudents.slice(startIndex, startIndex + pageSize);
  }, [processedStudents, startIndex, pageSize]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the student records for ${name}?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div className="main-content">
      <Header title="Student Database" />
      
      <div className="page-wrapper animate-slide-up">
        {/* Top Controls Card */}
        <div className="glass-card controls-card">
          <div className="controls-flex-row">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search by student name or registration ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            {/* Add New Button */}
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/add')}
            >
              <Plus size={18} /> Add Student
            </button>
          </div>
          
          <div className="filters-grid">
            {/* Filter by Department */}
            <div className="filter-group">
              <label className="filter-label">Faculty Department</label>
              <select 
                value={selectedDept} 
                onChange={(e) => setSelectedDept(e.target.value)}
                className="filter-select"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            {/* Filter by Status */}
            <div className="filter-group">
              <label className="filter-label">Enrolment Status</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                <option value="">All Statuses</option>
                {statuses.map(stat => (
                  <option key={stat} value={stat}>{stat}</option>
                ))}
              </select>
            </div>
            
            {/* Sort options */}
            <div className="filter-group">
              <label className="filter-label">Sort Records By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name-asc">Name (A - Z)</option>
                <option value="name-desc">Name (Z - A)</option>
                <option value="gpa-desc">GPA (Highest first)</option>
                <option value="gpa-asc">GPA (Lowest first)</option>
                <option value="id-asc">Student ID (Ascending)</option>
                <option value="id-desc">Student ID (Descending)</option>
                <option value="date-desc">Enrolled (Newest first)</option>
                <option value="date-asc">Enrolled (Oldest first)</option>
              </select>
            </div>

            {/* Page Size Select */}
            <div className="filter-group">
              <label className="filter-label">Page Size</label>
              <select 
                value={pageSize} 
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="filter-select"
              >
                <option value={5}>5 entries</option>
                <option value={10}>10 entries</option>
                <option value={20}>20 entries</option>
                <option value={50}>50 entries</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database List / Table Card */}
        <div className="glass-card list-card">
          {paginatedStudents.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="desktop-view-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>GPA</th>
                      <th>Department</th>
                      <th>Enrolled Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map(student => (
                      <tr key={student.id}>
                        <td>
                          <div className="student-profile-cell">
                            <div 
                              className="student-cell-avatar" 
                              style={{ background: student.avatarColor }}
                            >
                              {student.firstName[0]}{student.lastName[0]}
                            </div>
                            <div className="student-cell-info">
                              <span className="student-cell-name">
                                {student.firstName} {student.lastName}
                              </span>
                              <span className="student-cell-id">{student.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="gpa-badge">{student.gpa.toFixed(2)}</span>
                        </td>
                        <td>{student.department}</td>
                        <td>{new Date(student.enrollmentDate).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}</td>
                        <td>
                          <span className={`badge badge-${student.status.toLowerCase()}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions-cell-row">
                            <button 
                              className="action-btn-view"
                              onClick={() => navigate(`/students/${student.id}`)}
                              title="View Profile"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="action-btn-edit"
                              onClick={() => navigate(`/edit/${student.id}`)}
                              title="Edit Record"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className="action-btn-delete"
                              onClick={() => handleDelete(student.id, `${student.firstName} ${student.lastName}`)}
                              title="Remove Student"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-view-container">
                {paginatedStudents.map(student => (
                  <div key={student.id} className="mobile-student-card">
                    <div className="mobile-card-top">
                      <div className="student-profile-cell">
                        <div 
                          className="student-cell-avatar" 
                          style={{ background: student.avatarColor }}
                        >
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div className="student-cell-info">
                          <span className="student-cell-name">
                            {student.firstName} {student.lastName}
                          </span>
                          <span className="student-cell-id">{student.id}</span>
                        </div>
                      </div>
                      <span className={`badge badge-${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </div>
                    
                    <div className="mobile-card-body">
                      <div className="mobile-card-stat">
                        <span className="mobile-stat-label">Department:</span>
                        <span className="mobile-stat-val">{student.department}</span>
                      </div>
                      <div className="mobile-card-stat">
                        <span className="mobile-stat-label">GPA:</span>
                        <span className="mobile-stat-val gpa-badge">{student.gpa.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mobile-card-actions">
                      <button 
                        className="mobile-action-btn view"
                        onClick={() => navigate(`/students/${student.id}`)}
                      >
                        <Eye size={16} /> Details
                      </button>
                      <button 
                        className="mobile-action-btn edit"
                        onClick={() => navigate(`/edit/${student.id}`)}
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button 
                        className="mobile-action-btn delete"
                        onClick={() => handleDelete(student.id, `${student.firstName} ${student.lastName}`)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="pagination-wrapper">
                <div className="pagination-info">
                  Showing <span className="highlight-text">{startIndex + 1}</span> to{' '}
                  <span className="highlight-text">
                    {Math.min(startIndex + pageSize, totalItems)}
                  </span>{' '}
                  of <span className="highlight-text">{totalItems}</span> students
                </div>
                
                <div className="pagination-buttons">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`pagination-btn page-num-btn ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-results-card">
              <AlertCircle size={40} className="empty-icon" />
              <h4>No Records Found</h4>
              <p>Your search filters returned zero matching results. Try modifying keywords or selectors.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDept('');
                  setSelectedStatus('');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
