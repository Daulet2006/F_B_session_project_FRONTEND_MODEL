import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const { user: currentUser } = useSelector((state) => state.auth);

  // Mock data for demonstration
  const mockAppointments = [
    { 
      id: 1, 
      petName: 'Max',
      ownerName: 'John Smith',
      vetName: 'Dr. Sarah Wilson',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'scheduled',
      notes: 'Regular health check'
    },
    { 
      id: 2, 
      petName: 'Luna',
      ownerName: 'Emily Brown',
      vetName: 'Dr. Michael Lee',
      date: '2024-01-21',
      time: '2:30 PM',
      type: 'Vaccination',
      status: 'completed',
      notes: 'Annual vaccination'
    },
    { 
      id: 3, 
      petName: 'Rocky',
      ownerName: 'David Wilson',
      vetName: 'Dr. Sarah Wilson',
      date: '2024-01-22',
      time: '11:15 AM',
      type: 'Surgery',
      status: 'pending',
      notes: 'Dental cleaning'
    },
  ];

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const filteredAppointments = sortedAppointments.filter(
    (appointment) =>
      appointment.petName.toLowerCase().includes(filter.toLowerCase()) ||
      appointment.ownerName.toLowerCase().includes(filter.toLowerCase()) ||
      appointment.vetName.toLowerCase().includes(filter.toLowerCase()) ||
      appointment.type.toLowerCase().includes(filter.toLowerCase())
  );

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Appointment Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => alert('Add Appointment functionality to be implemented')}
        >
          Add Appointment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Pet Name', 'Owner', 'Veterinarian', 'Date', 'Time', 'Type', 'Status', 'Notes', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                  >
                    {header}
                    {sortBy === header.toLowerCase().replace(' ', '') && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.petName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.vetName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-sm font-semibold
                        ${appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => alert(`Edit appointment ${appointment.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => alert(`Delete appointment ${appointment.id}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;