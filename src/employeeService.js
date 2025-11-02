import axios from 'axios';


// The base URL for the backend API.
// During local development, this will default to 'http://localhost:8080'.
// When deployed, you MUST set the REACT_APP_API_BASE environment variable
// in your hosting service (e.g., Vercel) to the public URL of your deployed backend.
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';
const BASE_URL = `${API_BASE.replace(/\/$/, '')}/api/employees`;

export const getAllEmployees = () => axios.get(BASE_URL);

export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createEmployee = (data) => axios.post(BASE_URL, data);

export const updateEmployee = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);
