// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Verify admin access
  if (user?.role !== 'admin') {
    return <div className="p-6 text-red-500">Access Denied: Admin privileges required.</div>;
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/pets', label: 'Pets', icon: '🐾' },
    { path: '/admin/products', label: 'Products', icon: '🛍️' },
    { path: '/admin/appointments', label: 'Appointments', icon: '📅' },
    { path: '/admin/statistics', label: 'Statistics', icon: '📈' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-green-600 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={`${sidebarOpen ? 'block' : 'hidden'} font-bold text-xl`}>Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-green-700 transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${location.pathname === item.path ? 'bg-green-700' : 'hover:bg-green-700'} transition-colors`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.label || 'Admin Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.email}</span>
              <img
                src={user?.avatar || 'https://via.placeholder.com/40'}
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
