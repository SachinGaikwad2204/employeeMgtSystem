import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "./employeeService";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    // ... (form state remains the same)
  });
  const [errors, setErrors] = useState({});

  // ... (useEffect and handleChange remain the same)

  const validateForm = () => {
    // ... (validation logic remains the same)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    const employeeData = { ...form };
    delete employeeData.profilePhoto;
    delete employeeData.resume;

    formDataToSend.append("employee", JSON.stringify(employeeData));

    if (form.profilePhoto) {
      formDataToSend.append("profilePhoto", form.profilePhoto);
    }
    if (form.resume) {
      formDataToSend.append("resume", form.resume);
    }

    const promise = id
      ? updateEmployee(id, formDataToSend)
      : createEmployee(formDataToSend);

    toast.promise(promise, {
      pending: "Saving employee...",
      success: `Employee ${id ? "updated" : "added"} successfully!`,
      error: "Failed to save employee. Please try again.",
    });

    try {
      await promise;
      navigate("/employees");
    } catch (error) {
      console.error("Submit error:", error);
      // Error toast is handled by toast.promise
    }
  };

  // ... (styles remain the same)

  return (
    // ... (JSX remains the same)
  );
};

export default EmployeeForm;

  // Styles
  const containerStyle = {
    padding: "20px",
    background: "#f0f9ff",
    minHeight: "100vh",
  };
  const formStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  };
  const headingStyle = {
    fontSize: "2rem",
    color: "#1e3a8a",
    fontWeight: "700",
    marginBottom: "25px",
    textAlign: "center",
  };
  const fieldsetStyle = {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "25px",
  };
  const legendStyle = {
    fontWeight: "600",
    color: "#1e3a8a",
    padding: "0 10px",
    fontSize: "1.2rem",
  };
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  };
  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const labelStyle = {
    marginBottom: "8px",
    fontWeight: "500",
    color: "#334155",
  };
  const inputStyle = {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const buttonStyle = {
    padding: "14px 30px",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "opacity 0.2s",
    display: "block",
    width: "100%",
    marginTop: "1rem",
  };
  const errorStyle = { color: "#ef4444", fontSize: "0.875rem", marginTop: "6px" };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
        <h2 style={headingStyle}>{id ? "Edit Employee" : "Add New Employee"}</h2>
        {errors.submit && <p style={errorStyle}>{errors.submit}</p>}

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Basic Information</legend>
          <div style={gridContainerStyle}>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" name="fullName" value={form.fullName} onChange={handleChange} style={inputStyle} />
              {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={form.email} onChange={handleChange} style={inputStyle} />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="phone">Phone</label>
              <input id="phone" type="text" name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
              {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange} style={inputStyle}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="dateOfBirth">Date of Birth</label>
              <input id="dateOfBirth" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Job Information</legend>
          <div style={gridContainerStyle}>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="department">Department</label>
              <input id="department" type="text" name="department" value={form.department} onChange={handleChange} style={inputStyle} />
              {errors.department && <p style={errorStyle}>{errors.department}</p>}
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="jobTitle">Job Title</label>
              <input id="jobTitle" type="text" name="jobTitle" value={form.jobTitle} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="dateOfJoining">Date of Joining</label>
              <input id="dateOfJoining" type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="salary">Salary</label>
              <input id="salary" type="number" name="salary" value={form.salary} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="employmentType">Employment Type</label>
              <input id="employmentType" type="text" name="employmentType" value={form.employmentType} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Address</legend>
          <div style={gridContainerStyle}>
            <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" style={inputStyle} />
            <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2" style={inputStyle} />
            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" style={inputStyle} />
            <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" style={inputStyle} />
            <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="ZIP Code" style={inputStyle} />
          </div>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Documents</legend>
          <div style={gridContainerStyle}>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="panNumber">PAN Number</label>
              <input id="panNumber" type="text" name="panNumber" value={form.panNumber} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="aadhaarNumber">Aadhaar Number</label>
              <input id="aadhaarNumber" type="text" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="profilePhoto">Profile Photo</label>
              <input id="profilePhoto" type="file" name="profilePhoto" onChange={handleChange} style={inputStyle} />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="resume">Resume</label>
              <input id="resume" type="file" name="resume" onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </fieldset>

        <button type="submit" style={buttonStyle} onMouseOver={e => e.target.style.opacity = '0.9'} onMouseOut={e => e.target.style.opacity = '1'}>
          {id ? "Update" : "Add"} Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
