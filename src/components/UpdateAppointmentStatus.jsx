// src/components/UpdateAppointmentStatus.jsx
import React, { useState } from 'react';
import { updateAppointment } from '../services/appointmentAPI';

const UpdateAppointmentStatus = ({ appointmentId, currentStatus, onUpdated }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = async () => {
    try {
      await updateAppointment(appointmentId, status);
      alert('Status updated');
      if (onUpdated) onUpdated();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="mt-2 flex gap-2 items-center">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded p-1"
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="done">Done</option>
      </select>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateAppointmentStatus;
