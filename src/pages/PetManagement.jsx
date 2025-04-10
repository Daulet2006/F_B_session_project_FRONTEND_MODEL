import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const { user: currentUser } = useSelector((state) => state.auth);

  // Mock data for demonstration
  const mockPets = [
    { 
      id: 1, 
      name: 'Max', 
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 2,
      status: 'available',
      price: 1200,
      seller: 'John Doe',
      createdAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Luna', 
      species: 'Cat',
      breed: 'Persian',
      age: 1,
      status: 'adopted',
      price: 800,
      seller: 'Jane Smith',
      createdAt: '2024-01-14'
    },
    { 
      id: 3, 
      name: 'Rocky', 
      species: 'Dog',
      breed: 'German Shepherd',
      age: 3,
      status: 'pending',
      price: 1000,
      seller: 'Mike Johnson',
      createdAt: '2024-01-13'
    },
  ];

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setPets(mockPets);
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

  const sortedPets = [...pets].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const filteredPets = sortedPets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(filter.toLowerCase()) ||
      pet.species.toLowerCase().includes(filter.toLowerCase()) ||
      pet.breed.toLowerCase().includes(filter.toLowerCase()) ||
      pet.seller.toLowerCase().includes(filter.toLowerCase())
  );

  const handleStatusChange = (petId, newStatus) => {
    setPets(pets.map(pet =>
      pet.id === petId ? { ...pet, status: newStatus } : pet
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
        <h1 className="text-2xl font-semibold">Pet Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => alert('Add Pet functionality to be implemented')}
        >
          Add Pet
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search pets..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Species', 'Breed', 'Age', 'Status', 'Price', 'Seller', 'Created At', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    {header}
                    {sortBy === header.toLowerCase() && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPets.map((pet) => (
                <tr key={pet.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.species}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.breed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.age} years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={pet.status}
                      onChange={(e) => handleStatusChange(pet.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-sm font-semibold
                        ${pet.status === 'available' ? 'bg-green-100 text-green-800' :
                          pet.status === 'adopted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      <option value="available">Available</option>
                      <option value="adopted">Adopted</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${pet.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.seller}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => alert(`Edit pet ${pet.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => alert(`Delete pet ${pet.id}`)}
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

export default PetManagement;