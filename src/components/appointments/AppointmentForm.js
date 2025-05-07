import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAppointment,
  fetchAppointment,
  updateAppointment,
} from "../../redux/slices/appointmentSlice";
import { fetchPets } from "../../redux/slices/petSlice";
import { fetchUsers } from "../../redux/slices/userSlice";

const AppointmentForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appointmentsState = useSelector((state) => state.appointments || {});
  const { appointment = null, loading = false, error = null } = appointmentsState;
  const petsState = useSelector((state) => state.pets || {});
  const { pets = [] } = petsState;
  const usersState = useSelector((state) => state.users || {});
  const { users = [] } = usersState;
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    date: "",
    reason: "",
    petId: "",
    vetId: "",
    status: "Scheduled",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPets());
    dispatch(fetchUsers());
    if (isEditMode) {
      dispatch(fetchAppointment(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && appointment) {
      setFormData({
        date: new Date(appointment.date).toISOString().slice(0, 16),
        reason: appointment.reason || "",
        petId: appointment.pet?.id || "",
        vetId: appointment.vet?.id || "",
        status: appointment.status || "Scheduled",
      });
    } else if (user.role === "seller") {
      // Sellers can only book as themselves
      setFormData((prev) => ({ ...prev, vetId: user.id }));
    } else if (user.role === "client") {
      // Clients can only book for their pets
      setFormData((prev) => ({ ...prev, clientId: user.id }));
    }
  }, [isEditMode, appointment, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (new Date(formData.date) < new Date()) {
      newErrors.date = "Date cannot be in the past";
    }

    if (!formData.reason) {
      newErrors.reason = "Reason is required";
    }

    if (!formData.petId && user.role !== "admin") {
      newErrors.petId = "Pet is required";
    }

    if (!formData.vetId && user.role !== "client") {
      newErrors.vetId = "Veterinarian is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const appointmentData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        clientId: user.role === "client" ? user.id : formData.clientId,
      };

      if (isEditMode) {
        dispatch(updateAppointment({ id, data: appointmentData }))
          .unwrap()
          .then(() => navigate(`/appointments/${id}`))
          .catch((err) => console.error(err));
      } else {
        dispatch(createAppointment(appointmentData))
          .unwrap()
          .then((result) => navigate(`/appointments/${result.id}`))
          .catch((err) => console.error(err));
      }
    }
  };

  // Filter pets and vets based on role
  const availablePets = user.role === "client"
    ? pets.filter((pet) => pet.sellerId === user.id)
    : pets;
  const availableVets = user.role === "seller"
    ? users.filter((u) => u.id === user.id && u.role === "seller")
    : users.filter((u) => u.role === "seller");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Appointment" : "Book Appointment"}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label htmlFor="date" className="form-label">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              className={`form-input ${errors.date ? "border-red-500" : ""}`}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="4"
              className={`form-input ${errors.reason ? "border-red-500" : ""}`}
              value={formData.reason}
              onChange={handleChange}
            ></textarea>
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

          <div>
            <label htmlFor="petId" className="form-label">
              Pet
            </label>
            <select
              id="petId"
              name="petId"
              className={`form-input ${errors.petId ? "border-red-500" : ""}`}
              value={formData.petId}
              onChange={handleChange}
            >
              <option value="">Select a pet</option>
              {availablePets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species})
                </option>
              ))}
            </select>
            {errors.petId && <p className="text-red-500 text-sm mt-1">{errors.petId}</p>}
          </div>

          {(user.role === "admin" || user.role === "seller") && (
            <div>
              <label htmlFor="vetId" className="form-label">
                Veterinarian
              </label>
              <select
                id="vetId"
                name="vetId"
                className={`form-input ${errors.vetId ? "border-red-500" : ""}`}
                value={formData.vetId}
                onChange={handleChange}
                disabled={user.role === "seller"}
              >
                <option value="">Select a vet</option>
                {availableVets.map((vet) => (
                  <option key={vet.id} value={vet.id}>
                    {vet.name}
                  </option>
                ))}
              </select>
              {errors.vetId && <p className="text-red-500 text-sm mt-1">{errors.vetId}</p>}
            </div>
          )}

          {user.role === "admin" && (
            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={() => navigate("/appointments")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Appointment"
              : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;