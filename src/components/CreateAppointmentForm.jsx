// src/components/CreateAppointmentForm.jsx
import React, { useState } from 'react';
import { createAppointment } from '../services/appointmentAPI';
import { useNavigate } from 'react-router-dom';

const CreateAppointmentForm = () => {
  const [form, setForm] = useState({ vet_id: '', date: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(form);
      alert('Appointment created!');
      navigate('/appointments');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <input
        name="vet_id"
        type="number"
        placeholder="Vet ID"
        value={form.vet_id}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="date"
        type="datetime-local"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit
      </button>
    </form>
  );
};

export default CreateAppointmentForm;
