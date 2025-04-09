import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Перенаправление на страницу логина, если пользователь не авторизован
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout()); // Логаут из системы
    navigate('/login'); // Перенаправление на страницу логина после выхода
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Dashboard</h2>
        {user ? (
          <div className="mb-4">
            <p className="text-lg">Hello, {user.name}!</p>
            <p className="text-gray-600">Welcome to your dashboard.</p>
          </div>
        ) : (
          <p className="text-gray-600">No user data available.</p>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
