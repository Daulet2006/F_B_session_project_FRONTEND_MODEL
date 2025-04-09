import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-green-100 h-full w-64 p-4 shadow-md">
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin"
            className="block text-green-700 hover:text-green-900 font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:bg-green-200"
          >
            Admin
          </Link>
        </li>
        <li>
          <Link
            to="/seller"
            className="block text-green-700 hover:text-green-900 font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:bg-green-200"
          >
            Seller
          </Link>
        </li>
        <li>
          <Link
            to="/vet"
            className="block text-green-700 hover:text-green-900 font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:bg-green-200"
          >
            Vet
          </Link>
        </li>
        <li>
          <Link
            to="/customer"
            className="block text-green-700 hover:text-green-900 font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:bg-green-200"
          >
            Customer
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
