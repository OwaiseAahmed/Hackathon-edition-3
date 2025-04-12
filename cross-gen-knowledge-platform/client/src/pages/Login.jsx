// src/pages/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../api/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage(`Welcome ${res.user.name}!`);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-green-500 text-white p-2">Login</button>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
};

export default Login;
