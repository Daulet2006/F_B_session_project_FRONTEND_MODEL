import React, { useState } from 'react';
import { register } from '../services/authAPI';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'customer' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;