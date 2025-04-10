// src/features/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authAPI';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);

      // Сақтаймыз: рольді, email-ді (немесе басқа мәліметті)
      localStorage.setItem('role', data.user.role); // Flask-тен role келетініне көз жеткіз
      localStorage.setItem('user', JSON.stringify(data.user));

      // Рөлге байланысты бағыттау
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else if (data.user.role === 'seller') {
        navigate('/seller');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
