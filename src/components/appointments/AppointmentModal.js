// src/components/appointments/AppointmentModal.js
import React from "react";

const AppointmentModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p>{message}</p>
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Отмена</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;