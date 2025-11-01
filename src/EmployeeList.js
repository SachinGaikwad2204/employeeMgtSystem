import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllEmployees, deleteEmployee } from './employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllEmployees();
      setEmployees(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError("Failed to fetch employees. Please ensure the backend server is running and accessible.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const promise = deleteEmployee(id);
      
      toast.promise(
        promise,
        {
          pending: 'Deleting employee...',
          success: 'Employee deleted successfully!',
          error: 'Failed to delete employee.'
        }
      ).then(() => {
        // Optimistically update UI for a faster experience
        setEmployees(employees.filter(emp => emp.id !== id));
      }).catch(err => {
        // The toast will show the error, but we can still log it
        console.error("Delete error", err);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerStyle = {
    padding: '30px',
    background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)',
    minHeight: '100vh',
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center', // Center content for loading/error messages
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#1e3a8a',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    background: '#1e3a8a',
    color: '#ffffff',
    padding: '12px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const actionBtnStyle = {
    marginRight: '10px',
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
  };

  const editBtn = {
    ...actionBtnStyle,
    backgroundColor: '#facc15',
    color: '#000',
  };

  const deleteBtn = {
    ...actionBtnStyle,
    backgroundColor: '#ef4444',
    color: '#fff',
  };

  const errorStyle = {
    color: '#ef4444',
    fontWeight: 'bold',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>Loading Employees...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>An Error Occurred</h2>
          <p style={errorStyle}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Employee List</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td style={tdStyle}>{emp.fullName}</td>
                <td style={tdStyle}>{emp.email}</td>
                <td style={tdStyle}>{emp.phone}</td>
                <td style={tdStyle}>{emp.department}</td>
                <td style={tdStyle}>
                  <Link to={`/edit/${emp.id}`} style={editBtn}>Edit</Link>
                  <button onClick={() => handleDelete(emp.id)} style={deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
