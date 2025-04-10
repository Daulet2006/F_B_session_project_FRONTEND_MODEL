// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-green-500 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          ZooStore
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/" className="hover:text-green-200">Home</Link></li>
          <li><Link to="/pets" className="hover:text-green-200">Pets</Link></li>
          <li><Link to="/products" className="hover:text-green-200">Products</Link></li>
          <li><Link to="/appointments" className="hover:text-green-200">Appointments</Link></li>

          {isAuthenticated ? (
            <>
              <li className="text-sm italic">Hello, {user?.email}</li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="bg-white text-green-600 hover:bg-green-100 px-4 py-1 rounded-md">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-green-600">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-green-600 px-4 pb-4 space-y-2">
          <li><Link to="/" onClick={toggleMenu} className="block py-1">Home</Link></li>
          <li><Link to="/pets" onClick={toggleMenu} className="block py-1">Pets</Link></li>
          <li><Link to="/products" onClick={toggleMenu} className="block py-1">Products</Link></li>
          <li><Link to="/appointments" onClick={toggleMenu} className="block py-1">Appointments</Link></li>

          {isAuthenticated ? (
            <>
              <li className="text-sm italic text-white">Hello, {user?.email}</li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md mt-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMenu} className="block bg-white text-green-600 hover:bg-green-100 px-4 py-1 rounded-md">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleMenu} className="block border border-white px-4 py-1 rounded-md hover:bg-white hover:text-green-600">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
