// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">Sadbhyasa</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link to="/" className="hover:text-blue-400 text-white">Home</Link>
          <Link to="/about" className="hover:text-blue-400 text-white">About</Link>
          <Link to="/features" className="hover:text-blue-400 text-white">Features</Link>
          <Link
            to="/login"
            className="ml-4 px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-2 text-sm font-medium bg-black border-t border-gray-700">
          <Link to="/" className="hover:text-blue-400 text-white">Home</Link>
          <Link to="/about" className="hover:text-blue-400 text-white">About</Link>
          <Link to="/features" className="hover:text-blue-400 text-white">Features</Link>
          <Link
            to="/login"
            className="mt-2 px-4 py-2 text-center rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;