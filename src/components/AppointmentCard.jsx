const AppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-700">
          Dr. {appointment.vet_name}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {appointment.status}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(appointment.date).toLocaleString()}
        </p>
      </div>
    </div>
    );};
export default AppointmentCard;
