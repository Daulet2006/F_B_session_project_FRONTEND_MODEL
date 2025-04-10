// src/pages/PetList.jsx
import { useEffect, useState } from "react";
import { getPets, buyPet, deletePet } from "../services/petAPI";
import PetCard from "../components/PetCard";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.error("Failed to load pets", err);
      setError("Failed to load pets. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAdopt = async (id) => {
    try {
      await buyPet(id);
      alert("Pet adopted!");
      fetchPets();
    } catch (err) {
      alert("Failed to adopt pet");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePet(id);
      alert("Pet deleted");
      fetchPets();
    } catch (err) {
      alert("Failed to delete pet");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={fetchPets}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">No pets available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          role={role}
          onAdopt={() => handleAdopt(pet.id)}
          onDelete={() => handleDelete(pet.id)}
        />
      ))}
    </div>
  );
};

export default PetList;
