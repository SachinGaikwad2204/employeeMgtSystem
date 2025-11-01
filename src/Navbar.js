import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navStyles = {
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    padding: '10px 30px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const leftContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const companyTitle = {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '3px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const subtitle = {
    fontSize: '0.95rem',
    color: '#e0e0e0',
    fontWeight: 'normal',
  };

  const navLinksContainer = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  };

  const linkBase = {
    color: '#ffffff',
    fontWeight: '500',
    padding: '8px 14px',
    textDecoration: 'none',
    transition: '0.3s ease',
    borderBottom: '2px solid transparent',
    borderRadius: '5px',
  };

  const activeLink = {
    ...linkBase,
    color: '#ffe600',
    borderBottom: '2px solid #ffffff',
  };

  return (
    <nav style={navStyles}>
      <div style={leftContainer}>
        <div style={companyTitle}>Gaikwad Pvt Ltd</div>
        <div style={subtitle}>Employee Management System</div>
      </div>

      <div style={navLinksContainer}>
        <Link
          to="/"
          style={location.pathname === '/' ? activeLink : linkBase}
          onMouseOver={(e) => (e.target.style.color = '#ffe600')}
          onMouseOut={(e) =>
            (e.target.style.color =
              location.pathname === '/' ? '#ffe600' : '#ffffff')
          }
        >
          🏠 Home
        </Link>

        <Link
          to="/employees"
          style={location.pathname === '/employees' ? activeLink : linkBase}
          onMouseOver={(e) => (e.target.style.color = '#ffe600')}
          onMouseOut={(e) =>
            (e.target.style.color =
              location.pathname === '/employees' ? '#ffe600' : '#ffffff')
          }
        >
          📋 Employee List
        </Link>

        <Link
          to="/add"
          style={location.pathname === '/add' ? activeLink : linkBase}
          onMouseOver={(e) => (e.target.style.color = '#ffe600')}
          onMouseOut={(e) =>
            (e.target.style.color =
              location.pathname === '/add' ? '#ffe600' : '#ffffff')
          }
        >
          📝 Add Employee
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
