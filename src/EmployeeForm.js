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

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((res) => {
        const emp = res.data;
        setForm(prev => ({
          ...prev,
          ...emp,
          dateOfBirth: emp.dateOfBirth,
          dateOfJoining: emp.dateOfJoining,
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    const employeeData = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
      department: form.department,
      jobTitle: form.jobTitle,
      dateOfJoining: form.dateOfJoining,
      salary: form.salary,
      employmentType: form.employmentType,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      panNumber: form.panNumber,
      aadhaarNumber: form.aadhaarNumber,
    };

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
      console.error("Upload error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{
        maxWidth: "600px",
        margin: "50px auto 0 auto", // added top space
      }}
    >
      <fieldset>
        <legend>Basic Information</legend>
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
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
        <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="Department" />
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

  <input
    type="text"
    name="panNumber"
    value={form.panNumber}
    onChange={handleChange}
    placeholder="PAN Number"
  />
  <input
    type="text"
    name="aadhaarNumber"
    value={form.aadhaarNumber}
    onChange={handleChange}
    placeholder="Aadhaar Number"
  />

  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
    <label htmlFor="profilePhoto" style={{ display: "block", marginBottom: "5px" }}>
      Profile Photo:
    </label>
    <input type="file" name="profilePhoto" onChange={handleChange} />
  </div>

  <div style={{ marginTop: "10px" }}>
    <label htmlFor="resume" style={{ display: "block", marginBottom: "5px" }}>
      Resume:
    </label>
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
