import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api"; // ✅ Correct import

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form); // ✅ Correct API usage
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-white text-center mb-8">Create an Account</h2>
        {error && <div className="text-red-300 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white bg-opacity-20 placeholder-white text-white font-semibold"
          />
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
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 py-4 rounded-xl text-white text-2xl font-bold shadow-xl hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
