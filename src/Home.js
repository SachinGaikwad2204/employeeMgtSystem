import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees } from './employeeService';
import './Home.css'; // Import the new CSS file

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedCount, setAnimatedCount] = useState(0); // For count-up animation

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

  // Count-up animation effect
  useEffect(() => {
    if (!isLoading && employeeCount > 0) {
      let start = 0;
      const end = employeeCount;
      const duration = 1000; // 1 second
      const increment = end / (duration / 10); // Increment every 10ms

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setAnimatedCount(Math.floor(start));
      }, 10);

      return () => clearInterval(timer);
    }
  }, [employeeCount, isLoading]);


  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Dashboard 🚀</h1>
      <p className="home-paragraph">
        This system helps you manage employee records efficiently. You can add new employees, update their details,
        or remove them as needed.
      </p>

      <div className="stats-container">
        <div className="stats-number">{isLoading ? '...' : animatedCount}</div>
        <div className="stats-label">Total Employees</div>
      </div>

      <div className="button-container">
        <Link to="/employees" className="home-button">
          View All Employees
        </Link>
        <Link to="/add" className="home-button add-employee">
          Add New Employee
        </Link>
      </div>
    </div>
  );
};

export default Home;
