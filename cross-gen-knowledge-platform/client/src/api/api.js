import axios from 'axios';

const API_BASE_URL = 'https://skillbridgeusers-backend.onrender.com/api';

// 🔐 AUTH
export async function signupUser(data) {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
  return response.data;
}

export async function loginUser(credentials) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
}
