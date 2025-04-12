import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Learn from "./pages/Learn";
import Forum from "./pages/Forum";
import Mentors from "./pages/Mentors";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user, authReady } = useContext(AuthContext);

  if (!authReady) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
