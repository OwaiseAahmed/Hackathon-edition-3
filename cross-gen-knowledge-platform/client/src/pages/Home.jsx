import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="top-bar">
        <h1 className="logo">GenBridge</h1>
        <div className="nav-links">
       
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/signup" className="btn signup">Signup</Link>
        </div>
      </div>

      <div className="main-content">
        <h1 className="main-heading">Welcome to the Cross-Gen Knowledge Platform</h1>
        <p className="sub-heading">Bridging generations through AI-powered learning, mentorship, and collaboration.</p>
        <div className="main-buttons">
          <Link to="/learn" className="btn action">Start Learning</Link>
          <Link to="/mentors" className="btn action">Find Mentors</Link>
          <Link to="/marketplace" className="btn action">Marketplace</Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-buttons">
          <Link to="/" className="btn footer-btn">Home</Link>
          <Link to="/learn" className="btn footer-btn">Learn</Link>
          <Link to="/mentors" className="btn footer-btn">Mentors</Link>
          <Link to="/forum" className="btn footer-btn">Forum</Link>
          <Link to="/marketplace" className="btn footer-btn">Marketplace</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
