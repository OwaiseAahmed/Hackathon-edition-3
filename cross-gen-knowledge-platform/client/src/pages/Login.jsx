import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth(); // Make sure AuthContext provides setToken

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form); // ⬅️ Using API helper
      setToken(data.token); // Save token in context or localStorage
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Login</h2>
        {error && <p className="text-red-300 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white bg-opacity-20 placeholder-white text-white font-semibold"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white bg-opacity-20 placeholder-white text-white font-semibold"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 py-4 rounded-xl text-white text-2xl font-bold shadow-xl hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
