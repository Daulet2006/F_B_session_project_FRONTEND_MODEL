// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { AdminNavLinks, SellerNavLinks, CustomerNavLinks, VetNavLinks } from './NavLinks';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderNavLinks = () => {
    if (!isAuthenticated || !user) return null;
    
    switch (user.role) {
      case 'admin':
        return <AdminNavLinks />;
      case 'seller':
        return <SellerNavLinks />;
      case 'vet':
        return <VetNavLinks />;
      case 'customer':
        return <CustomerNavLinks />;
      default:
        return null;
    }
  };

  return (
    <nav className="bg-green-500 text-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ZooStore
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <div className="flex space-x-6 items-center">
            {renderNavLinks()}
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <li className="text-sm italic">Hello, {user?.username}</li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors duration-200">
                  Logout
                </button>
              </li>
            </div>
          ) : (
            <li>
              <Link 
                to="/login" 
                className="bg-white text-green-600 hover:bg-green-100 px-4 py-2 rounded-md transition-colors duration-200">
                Login
              </Link>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 py-2 bg-green-600 rounded-b-lg shadow-lg">
          <ul className="flex flex-col space-y-2">
            {renderNavLinks()}
            {isAuthenticated ? (
              <>
                <li className="px-4 py-2 text-sm italic">Hello, {user?.username}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-green-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="block px-4 py-2 hover:bg-green-700 transition-colors duration-200">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
