// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <span className="text-3xl text-green-500">{icon}</span>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </span>
      <span className="text-gray-400 text-sm ml-2">vs last month</span>
    </div>
  </div>
);

const QuickAction = ({ title, description, icon, to }) => (
  <Link
    to={to}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center mb-4">
      <span className="text-3xl text-green-500 mr-3">{icon}</span>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const AdminDashboard = () => {
  // Example statistics data
  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥', trend: 12 },
    { title: 'Active Pets', value: '856', icon: '🐾', trend: 8 },
    { title: 'Products Sold', value: '432', icon: '🛍️', trend: -3 },
    { title: 'Appointments', value: '89', icon: '📅', trend: 15 },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage user accounts, roles, and permissions',
      icon: '👥',
      to: '/admin/users',
    },
    {
      title: 'Pet Management',
      description: 'Add, edit, or remove pets from the marketplace',
      icon: '🐾',
      to: '/admin/pets',
    },
    {
      title: 'Appointments',
      description: 'View and manage all veterinary appointments',
      icon: '📅',
      to: '/admin/appointments',
    },
    {
      title: 'Product Catalog',
      description: 'Manage products, inventory, and pricing',
      icon: '🛍️',
      to: '/admin/products',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <QuickAction key={action.title} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* Example activity items */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">👤</span>
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-gray-500">John Doe registered as a customer</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">🐾</span>
                <div>
                  <p className="font-medium">Pet Adopted</p>
                  <p className="text-sm text-gray-500">Max (Golden Retriever) was adopted</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">📅</span>
                <div>
                  <p className="font-medium">New Appointment</p>
                  <p className="text-sm text-gray-500">Veterinary check-up scheduled</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;