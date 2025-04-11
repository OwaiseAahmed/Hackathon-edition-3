import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  BookOpen,
  Users,
  ShoppingBag,
  MessageCircle,
  User,
  Home,
} from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-50 px-6 py-4 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-gray-800"
      } ${isSticky ? "fixed top-0 shadow-xl" : "relative"}
        border-b-4 border-transparent border-t-4 rounded-b-xl
        bg-[length:200%_200%] bg-[position:0%_0%]
        animate-gradient-move`}
      style={{
        backgroundImage:
          "linear-gradient(270deg, #ffecd2, #fcb69f, #ff9a9e, #fad0c4, #a18cd1)",
        borderImage: "linear-gradient(to right, #ff4ecd, #4fd1c5) 1",
        borderBottom: "4px solid",
      }}
    >
      {}
      <div className="text-3xl font-extrabold flex items-center gap-2">
        <span className="text-rose-600 text-4xl">🧠</span>
        <span className="text-4xl font-black">SkillBridge</span>
      </div>

      {}
      <div className="hidden md:flex items-center gap-6 text-lg font-semibold absolute right-4 top-4">
        <Link to="/" className="hover:text-rose-500 flex items-center gap-1">
          <Home size={20} /> Home
        </Link>
        <Link to="/learn" className="hover:text-rose-500 flex items-center gap-1">
          <BookOpen size={20} /> Learn
        </Link>
        <Link to="/mentors" className="hover:text-rose-500 flex items-center gap-1">
          <Users size={20} /> Mentors
        </Link>
        <Link to="/marketplace" className="hover:text-rose-500 flex items-center gap-1">
          <ShoppingBag size={20} /> Marketplace
        </Link>
        <Link to="/forum" className="hover:text-rose-500 flex items-center gap-1">
          <MessageCircle size={20} /> Forum
        </Link>
        <Link to="/profile" className="hover:text-rose-500 flex items-center gap-1">
          <User size={20} /> Profile
        </Link>
        <span className="font-bold text-xl ml-2">Welcome, User</span>

        {}
        <button
          onClick={toggleDarkMode}
          className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {}
        <button onClick={toggleMenu} className="p-2 md:hidden">
          <Menu size={28} />
        </button>
      </div>

      {}
      <div className="md:hidden absolute right-4 top-4 flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button onClick={toggleMenu} className="p-2">
          <Menu size={28} />
        </button>
      </div>

      {}
      {menuOpen && (
        <div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-[95%] flex flex-col items-center gap-4 p-6 rounded-2xl shadow-2xl z-40 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {[
            { to: "/", label: "Home", icon: <Home size={22} /> },
            { to: "/learn", label: "Learn", icon: <BookOpen size={22} /> },
            { to: "/mentors", label: "Mentors", icon: <Users size={22} /> },
            { to: "/marketplace", label: "Marketplace", icon: <ShoppingBag size={22} /> },
            { to: "/forum", label: "Forum", icon: <MessageCircle size={22} /> },
            { to: "/profile", label: "Profile", icon: <User size={22} /> },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="w-full text-center py-3 px-5 text-xl rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-md hover:scale-105 transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.icon} {item.label}
            </Link>
          ))}
          <span className="text-xl font-bold mt-2">Welcome, User</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
