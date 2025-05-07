// src/components/layout/Navbar.js
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice"
import { hasPermission } from "../../utils/permissions"
import { useState } from "react"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <nav className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🐾</span>
            Pet Store
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/products" className="hover:text-emerald-200 transition">
                  Products
                </Link>
                <Link to="/pets" className="hover:text-emerald-200 transition">
                  Pets
                </Link>
                {(hasPermission(user, "create_appointment") ||
                  hasPermission(user, "view_appointments")) && (
                  <Link to="/appointments" className="hover:text-emerald-200 transition">
                    Appointments
                  </Link>
                )}
                {hasPermission(user, "view_orders") && (
                  <Link to="/orders" className="hover:text-emerald-200 transition">
                    Orders
                  </Link>
                )}
                {(hasPermission(user, "view_dashboard") ||
                  user.role === "Admin" ||
                  user.role === "Owner") && (
                  <Link to="/dashboard" className="hover:text-emerald-200 transition">
                    Dashboard
                  </Link>
                )}
                {hasPermission(user, "view_users") && (
                  <Link to="/users" className="hover:text-emerald-200 transition">
                    Users
                  </Link>
                )}
                {hasPermission(user, "view_vets") && (
                  <Link to="/vets" className="hover:text-emerald-200 transition">
                    Veterinarians
                  </Link>
                )}
                <Link to="/chat" className="hover:text-emerald-200 transition">
                  Chat
                </Link>

                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center hover:text-emerald-200 transition focus:outline-none"
                  >
                    {user?.username || "User"} ({user?.role})
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-emerald-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-emerald-200 transition">
                  Login
                </Link>
                <Link to="/register" className="hover:text-emerald-200 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;