// src/components/PetCard.jsx
const PetCard = ({ pet, role, onAdopt, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 text-green-700">{pet.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{pet.description}</p>
      <div className="flex gap-2">
        {role === "customer" && (
          <button
            onClick={onAdopt}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-md transform hover:-translate-y-1"
          >
            Adopt
          </button>
        )}
        {role === "admin" || role === "seller" ? (
          <button
            onClick={onDelete}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-md transform hover:-translate-y-1"
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PetCard;
