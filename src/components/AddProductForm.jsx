// src/components/AddProductForm.jsx
import React, { useState } from 'react';
import { addProduct } from '../services/productAPI';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { role } = user;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      alert('Product added!');
      const redirectPath = role === 'admin' ? '/admin/products' : '/seller/products';
      navigate(redirectPath);
    } catch (err) {
      alert('Failed to add product: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <input
        name="name"
        placeholder="Product Name"
        className="w-full mb-4 p-2 border rounded"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full mb-4 p-2 border rounded"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        className="w-full mb-4 p-2 border rounded"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        className="w-full mb-4 p-2 border rounded"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
