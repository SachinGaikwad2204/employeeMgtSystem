import React from 'react';

const Home = () => {
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
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Employee Management System 🚀</h1>
      <p style={paraStyle}>
        This system helps you manage employee records efficiently. You can add new employees, update their details,
        or remove them as needed. Use the navigation bar to get started.
      </p>
    </div>
  );
};

export default Home;
