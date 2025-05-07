// src/components/pets/PetList.js
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchPets, deletePet } from "../../redux/slices/petSlice"
import { hasPermission, canPerformAction } from "../../utils/permissions"
import DeleteModal from "../common/DeleteModal"

const PetList = () => {
  const dispatch = useDispatch()
  const { pets, loading } = useSelector((state) => state.pets)
  const { user } = useSelector((state) => state.auth)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [petToDelete, setPetToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchPets())
  }, [dispatch])

  const handleDeleteClick = (pet) => {
    setPetToDelete(pet)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (petToDelete) {
      dispatch(deletePet(petToDelete.id))
      setDeleteModalOpen(false)
      setPetToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading pets...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pets</h1>

        {hasPermission(user, "create_pet") && (
          <Link to="/pets/add" className="btn btn-primary">
            Add New Pet
          </Link>
        )}
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No pets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.id} className="card">
              <div className="h-48 overflow-hidden">
                <img
                  src={pet.image_url || "/placeholder.svg?height=200&width=300"}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{pet.species}</span>
                  <span className="text-emerald-600 font-bold">${pet.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {pet.breed}, {pet.age} years old
                </p>

                <div className="flex justify-between">
                  <Link to={`/pets/${pet.id}`} className="text-emerald-600 hover:text-emerald-800">
                    View Details
                  </Link>

                  {canPerformAction(user, "edit_pet", pet) && (
                    <Link to={`/pets/edit/${pet.id}`} className="text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                  )}

                  {canPerformAction(user, "delete_pet", pet) && (
                    <button onClick={() => handleDeleteClick(pet)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={petToDelete?.name || "this pet"}
      />
    </div>
  )
}

export default PetList
