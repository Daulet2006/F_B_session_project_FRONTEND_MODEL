import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAppointments, deleteAppointment } from "../../redux/slices/appointmentSlice";
import { hasPermission, canPerformAction } from "../../utils/permissions";
import AppointmentModal from "./AppointmentModal";

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointmentsState = useSelector((state) => state.appointments || {});
  const { appointments = [], loading = false, error = null } = appointmentsState;
  const { user } = useSelector((state) => state.auth);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleDeleteClick = (appointment) => {
    setAppointmentToDelete(appointment);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (appointmentToDelete) {
      dispatch(deleteAppointment(appointmentToDelete.id))
        .unwrap()
        .then(() => {
          setDeleteModalOpen(false);
          setAppointmentToDelete(null);
        });
    }
  };

  // Filter appointments based on role
  const filteredAppointments = appointments.filter((appointment) => {
    if (user.role === "admin") {
      return true; // Admin sees all
    } else if (user.role === "seller") {
      // Seller sees appointments where they are the vet
      return appointment.vetId === user.id;
    } else {
      // Client sees their own appointments
      return appointment.clientId === user.id;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {user.role === "client" ? "My Appointments" : "Appointments"}
        </h1>
        {hasPermission(user, "create_appointment") && (
          <Link to="/appointments/add" className="btn btn-primary">
            Book Appointment
          </Link>
        )}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">No appointments found.</p>
          {hasPermission(user, "create_appointment") && (
            <Link to="/appointments/add" className="mt-4 inline-block btn btn-primary">
              Book an Appointment
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{appointment.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.client?.name || "Unknown"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.vet?.name || "Not assigned"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.pet?.name || "None"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : appointment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/appointments/${appointment.id}`}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        View
                      </Link>
                      {canPerformAction(user, "update_appointment", appointment) && (
                        <Link
                          to={`/appointments/edit/${appointment.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                      )}
                      {canPerformAction(user, "delete_appointment", appointment) && (
                        <button
                          onClick={() => handleDeleteClick(appointment)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {user.role === "client" ? "Cancel" : "Delete"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AppointmentModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to ${
          user.role === "client" ? "cancel" : "delete"
        } this appointment?`}
      />
    </div>
  );
};

export default AppointmentList;