import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees } from './employeeService';

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const res = await getAllEmployees();
        setEmployeeCount(res.data.length);
      } catch (error) {
        console.error("Failed to fetch employee count:", error);
        // Silently fail, or set an error state if we want to show it
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeCount();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    background: 'linear-gradient(to right, #f8fafc, #dbeafe)',
    color: '#1e3a8a',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '15px',
  };

  const paraStyle = {
    fontSize: '1.2rem',
    color: '#334155',
    maxWidth: '600px',
    marginBottom: '30px',
  };

  const statsContainerStyle = {
    background: '#ffffff',
    padding: '20px 30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    marginBottom: '30px',
  };

  const statsNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
  };

  const statsLabelStyle = {
    fontSize: '1rem',
    color: '#64748b',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
  };

  const buttonStyle = {
    padding: '12px 25px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#fff',
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Dashboard 🚀</h1>
      <p style={paraStyle}>
        This system helps you manage employee records efficiently. You can add new employees, update their details,
        or remove them as needed.
      </p>

      <div style={statsContainerStyle}>
        <div style={statsNumberStyle}>{isLoading ? '...' : employeeCount}</div>
        <div style={statsLabelStyle}>Total Employees</div>
      </div>

      <div style={buttonContainerStyle}>
        <Link to="/employees" style={buttonStyle}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          View All Employees
        </Link>
        <Link to="/add" style={{...buttonStyle, background: 'linear-gradient(to right, #22c55e, #16a34a)'}}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          Add New Employee
        </Link>
      </div>
    </div>
  );
};

export default Home;
