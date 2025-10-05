// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
      </Routes>
    </>
  );
};

export default App;
