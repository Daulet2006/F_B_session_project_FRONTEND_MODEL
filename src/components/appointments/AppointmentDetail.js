import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchAppointment, deleteAppointment } from "../../redux/slices/appointmentSlice";
import { hasPermission, canPerformAction } from "../../utils/permissions";
import AppointmentModal from "./AppointmentModal";

const AppointmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointmentsState = useSelector((state) => state.appointments || {});
  const { appointment = null, loading = false, error = null } = appointmentsState;
  const { user } = useSelector((state) => state.auth);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAppointment(id));
  }, [dispatch, id]);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAppointment(id))
      .unwrap()
      .then(() => {
        navigate("/appointments");
      });
  };

  const canEdit = canPerformAction(user, "update_appointment", appointment);
  const canDelete = canPerformAction(user, "delete_appointment", appointment);

  if (loading || !appointment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading appointment details...</div>
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
      <div className="mb-6">
        <Link to="/appointments" className="text-emerald-600 hover:underline">
          ← Back to Appointments
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Appointment #{appointment.id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Appointment Details</h2>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span>{" "}
              {new Date(appointment.date).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Status:</span>{" "}
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
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Reason:</span> {appointment.reason}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Participants</h2>
            <p className="text-gray-700">
              <span className="font-medium">Client:</span>{" "}
              {appointment.client?.name || "Unknown"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Vet:</span>{" "}
              {appointment.vet?.name || "Not assigned"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Pet:</span>{" "}
              {appointment.pet?.name || "None"}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          {canEdit && (
            <Link
              to={`/appointments/edit/${appointment.id}`}
              className="btn btn-secondary"
            >
              Edit
            </Link>
          )}
          {canDelete && (
            <button onClick={handleDeleteClick} className="btn btn-danger">
              {user.role === "client" ? "Cancel" : "Delete"}
            </button>
          )}
        </div>
      </div>

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

export default AppointmentDetail;