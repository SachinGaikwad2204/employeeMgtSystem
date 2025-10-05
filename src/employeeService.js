import axios from 'axios';

// Allow configuring the backend base URL with an environment variable.
// In Vercel (or any hosting), set REACT_APP_API_BASE to the backend root
// e.g. https://api.example.com or https://api.example.com:8080
// If not set, default to the local backend used during development.
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';
const BASE_URL = `${API_BASE.replace(/\/$/, '')}/api/employees`;

export const getAllEmployees = () => axios.get(BASE_URL);

export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createEmployee = (data) => axios.post(BASE_URL, data);

export const updateEmployee = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);
