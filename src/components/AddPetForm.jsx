// src/components/AddPetForm.jsx
import { useState } from "react";
import { addPet } from "../services/petAPI";
import { useNavigate } from "react-router-dom";

const AddPetForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(form);
      alert("Pet added!");
      navigate("/pets");
    } catch (err) {
      alert("Failed to add pet");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6 mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Add New Pet</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Add Pet
      </button>
    </form>
  );
};

export default AddPetForm;
