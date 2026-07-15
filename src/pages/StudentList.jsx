import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Edit2, Trash2, Plus, AlertCircle, Trash } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import Header from '../components/Header';
import styles from './StudentList.module.css';

const StudentList = () => {
  const { students, statuses, deleteStudent, deleteStudentsBulk } = useStudents();
  const navigate = useNavigate();

  // Filters & Controls state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('rollNo-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  // Selection state for bulk deletes
  const [selectedIds, setSelectedIds] = useState([]);

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Filter & Sort Pipeline
  const processedStudents = useMemo(() => {
    let result = [...students];

    // 1. Searching (Name, Email)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        (student.name && student.name.toLowerCase().includes(term)) ||
        (student.email && student.email.toLowerCase().includes(term))
      );
    }

    // 2. Status Filtering
    if (selectedStatus !== '') {
      result = result.filter(student => student.status === selectedStatus);
    }

    // 3. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rollNo-asc':
          return Number(a.rollNo) - Number(b.rollNo);
        case 'rollNo-desc':
          return Number(b.rollNo) - Number(a.rollNo);
        default:
          return 0;
      }
    });

    return result;
  }, [students, searchTerm, selectedStatus, sortBy]);

  // Reset pagination and selection when inputs change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [searchTerm, selectedStatus, sortBy, pageSize]);

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
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete all ${selectedIds.length} selected student records?`)) {
      deleteStudentsBulk(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllVisible = (e) => {
    if (e.target.checked) {
      const visibleIds = paginatedStudents.map(s => s.id);
      setSelectedIds(prev => {
        // Merge visible IDs avoiding duplicates
        const union = new Set([...prev, ...visibleIds]);
        return Array.from(union);
      });
    } else {
      const visibleIds = paginatedStudents.map(s => s.id);
      setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
    }
  };

  const isAllVisibleSelected = useMemo(() => {
    if (paginatedStudents.length === 0) return false;
    return paginatedStudents.every(s => selectedIds.includes(s.id));
  }, [paginatedStudents, selectedIds]);

  return (
    <div className="main-content">
      <Header title="Student Database" />
      
      <div className="page-wrapper animate-slide-up">
        
        {/* Bulk Selection Actions Bar */}
        {selectedIds.length > 0 && (
          <div className={styles.bulkActionsBar}>
            <span className={styles.bulkActionsText}>
              {selectedIds.length} {selectedIds.length === 1 ? 'student' : 'students'} selected for bulk actions
            </span>
            <button 
              className="btn btn-danger"
              onClick={handleBulkDelete}
            >
              <Trash size={16} /> Delete Selected Records
            </button>
          </div>
        )}

        {/* Top Controls Card */}
        <div className={`glass-card ${styles.controlsCard}`}>
          <div className={styles.controlsFlexRow}>
            {/* Search Input */}
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input 
                type="text" 
                placeholder="Search by student name, email, or department..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
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
          
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Statuses</option>
                {statuses.map(stat => (
                  <option key={stat} value={stat}>{stat}</option>
                ))}
              </select>
            </div>
            
            {/* Sort options */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="rollNo-asc">Roll No (Low - High)</option>
                <option value="rollNo-desc">Roll No (High - Low)</option>
                <option value="name-asc">Name (A - Z)</option>
                <option value="name-desc">Name (Z - A)</option>
              </select>
            </div>

            {/* Page Size Select */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Page Size</label>
              <select 
                value={pageSize} 
                onChange={(e) => setPageSize(Number(e.target.value))}
                className={styles.filterSelect}
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
        <div className={styles.listCard}>
          <div className="table-header-info-row" style={{ marginBottom: '14px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Total Database Count: <span className="highlight-text" style={{ color: 'var(--primary-light)' }}>{students.length}</span> records
          </div>

          {paginatedStudents.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className={styles.desktopViewContainer}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th className={styles.checkboxCell}>
                        <input 
                          type="checkbox" 
                          checked={isAllVisibleSelected}
                          onChange={handleSelectAllVisible}
                          className={styles.checkboxInput}
                        />
                      </th>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Roll No.</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map(student => (
                      <tr key={student.id}>
                        <td className={styles.checkboxCell}>
                          <input 
                            type="checkbox" 
                            checked={selectedIds.includes(student.id)}
                            onChange={() => handleSelectRow(student.id)}
                            className={styles.checkboxInput}
                          />
                        </td>
                        <td>
                          <div className={styles.studentProfileCell}>
                            <div 
                              className={styles.studentCellAvatar} 
                              style={{ background: student.avatarColor }}
                            >
                              {getInitials(student.name)}
                            </div>
                            <div className={styles.studentCellInfo}>
                              <span className={styles.studentCellName}>{student.name}</span>
                              <span className={styles.studentCellId}>{student.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>Class {student.class} – {student.section}</td>
                        <td>
                          <span className={styles.gpaBadge}>#{student.rollNo}</span>
                        </td>
                        <td>
                          <span className={`badge badge-${student.status.toLowerCase()}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionsCellRow}>
                            <button 
                              className={styles.actionBtnView}
                              onClick={() => navigate(`/students/${student.id}`)}
                              title="View Profile"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className={styles.actionBtnEdit}
                              onClick={() => navigate(`/edit/${student.id}`)}
                              title="Edit Record"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className={styles.actionBtnDelete}
                              onClick={() => handleDelete(student.id, student.name)}
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
              <div className={styles.mobileViewContainer}>
                {paginatedStudents.map(student => (
                  <div key={student.id} className={styles.mobileStudentCard}>
                    <div className={styles.mobileCheckboxWrapper}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(student.id)}
                        onChange={() => handleSelectRow(student.id)}
                        className={styles.checkboxInput}
                      />
                    </div>
                    <div className={styles.mobileCardTop}>
                      <div className={styles.studentProfileCell}>
                        <div 
                          className={styles.studentCellAvatar} 
                          style={{ background: student.avatarColor }}
                        >
                          {getInitials(student.name)}
                        </div>
                        <div className={styles.studentCellInfo}>
                          <span className={styles.studentCellName}>{student.name}</span>
                          <span className={styles.studentCellId}>{student.id}</span>
                        </div>
                      </div>
                      <span className={`badge badge-${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </div>
                    
                    <div className={styles.mobileCardBody}>
                      <div className={styles.mobileCardStat}>
                        <span className={styles.mobileStatLabel}>Class:</span>
                        <span className={styles.mobileStatVal}>Class {student.class} – {student.section}</span>
                      </div>
                      <div className={styles.mobileCardStat}>
                        <span className={styles.mobileStatLabel}>Roll No:</span>
                        <span className={`${styles.mobileStatVal} ${styles.gpaBadge}`}>#{student.rollNo}</span>
                      </div>
                    </div>
                    
                    <div className={styles.mobileCardActions}>
                      <button 
                        className={`${styles.mobileActionBtn} ${styles.view}`}
                        onClick={() => navigate(`/students/${student.id}`)}
                      >
                        <Eye size={16} /> Details
                      </button>
                      <button 
                        className={`${styles.mobileActionBtn} ${styles.edit}`}
                        onClick={() => navigate(`/edit/${student.id}`)}
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button 
                        className={`${styles.mobileActionBtn} ${styles.delete}`}
                        onClick={() => handleDelete(student.id, student.name)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className={styles.paginationWrapper}>
                <div className={styles.paginationInfo}>
                  Showing <span className={styles.highlightText}>{startIndex + 1}</span> to{' '}
                  <span className={styles.highlightText}>
                    {Math.min(startIndex + pageSize, totalItems)}
                  </span>{' '}
                  of <span className={styles.highlightText}>{totalItems}</span> students
                </div>
                
                <div className={styles.paginationButtons}>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={styles.paginationBtn}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`${styles.paginationBtn} ${styles.pageNumBtn} ${currentPage === page ? styles.active : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={styles.paginationBtn}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyResultsCard}>
              <AlertCircle size={40} className={styles.emptyIcon} />
              <h4>No Records Found</h4>
              <p>Your search filters returned zero matching results. Try modifying keywords or selectors.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setSearchTerm('');
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
