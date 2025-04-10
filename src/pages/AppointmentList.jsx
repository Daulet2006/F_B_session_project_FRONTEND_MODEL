// src/pages/AppointmentList.jsx
import React, { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment } from '../services/appointmentAPI';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      alert('Failed to load appointments: ' + err.message);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await deleteAppointment(id);
        loadAppointments();
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      <div className="grid gap-4">
        {appointments.map((a) => (
          <div key={a.id} className="p-4 border rounded shadow">
            <p><strong>Vet ID:</strong> {a.vet_id}</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {a.status}</p>
            <button
              className="mt-2 text-red-600 hover:underline"
              onClick={() => handleDelete(a.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
