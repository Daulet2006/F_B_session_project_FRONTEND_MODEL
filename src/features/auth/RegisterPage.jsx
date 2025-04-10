// src/features/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authAPI';
import Navbar from '../../components/Navbar';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      await register(dataToSend);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
