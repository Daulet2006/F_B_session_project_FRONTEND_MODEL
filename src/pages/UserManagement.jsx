import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');
  const { user: currentUser } = useSelector((state) => state.auth);

  // Mock data for demonstration
  const mockUsers = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'customer', status: 'active', createdAt: '2024-01-15' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'seller', status: 'active', createdAt: '2024-01-14' },
    { id: 3, username: 'dr_vet', email: 'vet@example.com', role: 'vet', status: 'pending', createdAt: '2024-01-13' },
  ];

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase())
  );

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => alert('Add User functionality to be implemented')}
        >
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Username', 'Email', 'Role', 'Status', 'Created At', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    {header}
                    {sortBy === header.toLowerCase() && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'seller' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'vet' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-sm font-semibold
                        ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => alert(`Edit user ${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => alert(`Delete user ${user.id}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;