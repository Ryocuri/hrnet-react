import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectEmployees } from '../store/employeeSlice';
import '../styles/EmployeeList.css';

/**
 * EmployeeList page component
 * Displays list of employees with sorting, searching, and pagination
 */
function EmployeeList() {
  const employees = useSelector(selectEmployees);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Table columns configuration
  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'department', label: 'Department' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'street', label: 'Street' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'Zip Code' }
  ];

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    
    const lowercasedTerm = searchTerm.toLowerCase();
    return employees.filter(employee =>
      Object.values(employee).some(value =>
        String(value).toLowerCase().includes(lowercasedTerm)
      )
    );
  }, [employees, searchTerm]);

  // Sort employees
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredEmployees, sortConfig]);

  // Paginate employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return sortedEmployees.slice(startIndex, startIndex + entriesPerPage);
  }, [sortedEmployees, currentPage, entriesPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedEmployees.length / entriesPerPage);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle entries per page change
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Generate sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Calculate showing entries info
  const startEntry = sortedEmployees.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, sortedEmployees.length);

  return (
    <div className="employee-list">
      <h2>Current Employees</h2>
      
      <div className="table-controls">
        <div className="entries-control">
          <label htmlFor="entries">Show </label>
          <select
            id="entries"
            value={entriesPerPage}
            onChange={handleEntriesChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span> entries</span>
        </div>
        
        <div className="search-control">
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search employees..."
          />
        </div>
      </div>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="sortable"
                  aria-sort={
                    sortConfig.key === column.key
                      ? sortConfig.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  {column.label}
                  <span className="sort-icon">{getSortIcon(column.key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  {employees.length === 0
                    ? 'No employees found. Add employees using the Create Employee form.'
                    : 'No matching records found.'}
                </td>
              </tr>
            ) : (
              paginatedEmployees.map((employee, index) => (
                <tr key={index}>
                  {columns.map(column => (
                    <td key={column.key}>{employee[column.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="showing-info">
          Showing {startEntry} to {endEntry} of {sortedEmployees.length} entries
          {searchTerm && employees.length !== sortedEmployees.length && (
            <span> (filtered from {employees.length} total entries)</span>
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            ))}
            
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;