const AppointmentCard = ({ appointment }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white hover:bg-green-50 transition-all transform hover:scale-105 duration-300">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{appointment.petName}</h3>
        <p className="text-gray-700 text-sm mt-2">{appointment.date}</p>
        <p className="text-gray-600 text-sm">{appointment.vetName}</p>
        <button className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
