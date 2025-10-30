import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "./employeeService";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    jobTitle: "",
    dateOfJoining: "",
    salary: "",
    employmentType: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    panNumber: "",
    aadhaarNumber: "",
    profilePhoto: null,
    resume: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((res) => {
        const emp = res.data;
        setForm(prev => ({
          ...prev,
          ...emp,
          dateOfBirth: emp.dateOfBirth ? new Date(emp.dateOfBirth).toISOString().split('T')[0] : "",
          dateOfJoining: emp.dateOfJoining ? new Date(emp.dateOfJoining).toISOString().split('T')[0] : "",
        }));
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required.";
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!form.phone) newErrors.phone = "Phone number is required.";
    if (!form.department) newErrors.department = "Department is required.";
    
    return newErrors;
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

    try {
      if (id) {
        await updateEmployee(id, formDataToSend);
      } else {
        await createEmployee(formDataToSend);
      }
      navigate("/employees");
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({ submit: "Failed to save employee. Please try again." });
    }
  };

  const errorStyle = { color: 'red', fontSize: '0.8rem', marginTop: '5px' };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{
        maxWidth: "600px",
        margin: "50px auto 0 auto",
      }}
    >
      {errors.submit && <p style={errorStyle}>{errors.submit}</p>}
      
      <fieldset>
        <legend>Basic Information</legend>
        <div>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
          {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
        </div>
        <div>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>
        <div>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Job Information</legend>
        <div>
          <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="Department" />
          {errors.department && <p style={errorStyle}>{errors.department}</p>}
        </div>
        <input type="text" name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Job Title" />
        <input type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} />
        <input type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" />
        <input type="text" name="employmentType" value={form.employmentType} onChange={handleChange} placeholder="Employment Type" />
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
        <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" />
        <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" />
        <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="ZIP Code" />
      </fieldset>

     <fieldset>
        <legend>Documents</legend>
        <input type="text" name="panNumber" value={form.panNumber} onChange={handleChange} placeholder="PAN Number" />
        <input type="text" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} placeholder="Aadhaar Number" />
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <label htmlFor="profilePhoto" style={{ display: "block", marginBottom: "5px" }}>Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleChange} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="resume" style={{ display: "block", marginBottom: "5px" }}>Resume:</label>
          <input type="file" name="resume" onChange={handleChange} />
        </div>
      </fieldset>

      <button type="submit" style={{ marginTop: "1rem" }}>
        {id ? "Update" : "Add"} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
