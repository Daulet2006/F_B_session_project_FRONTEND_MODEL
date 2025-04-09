import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-500 text-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Логотип (если нужен) */}
        <Link to="/" className="text-2xl font-semibold text-white">
          ZooStore
        </Link>

        {/* Навигационные ссылки */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-green-200 transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pets" className="hover:text-green-200 transition-all">
              Pets
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-200 transition-all">
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/appointments"
              className="hover:text-green-200 transition-all"
            >
              Appointments
            </Link>
          </li>
        </ul>

        {/* Меню для мобильных устройств */}
        <div className="md:hidden">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
