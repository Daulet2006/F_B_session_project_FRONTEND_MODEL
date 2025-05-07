// src/components/pets/PetDetail.js
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchPetById, deletePet } from "../../redux/slices/petSlice"
import { canPerformAction } from "../../utils/permissions"
import DeleteModal from "../common/DeleteModal"

const PetDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pet, loading } = useSelector((state) => state.pets)
  const { user } = useSelector((state) => state.auth)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchPetById(id))
  }, [dispatch, id])

  const handleDeleteClick = () => {
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    dispatch(deletePet(id))
      .unwrap()
      .then(() => {
        navigate("/pets")
      })
  }

  if (loading || !pet) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading pet details...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/pets" className="text-emerald-600 hover:underline">
          &larr; Back to Pets
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={pet.image_url || "/placeholder.svg?height=400&width=600"}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-emerald-600">${pet.price}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500">Species</h2>
                <p className="text-lg">{pet.species}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500">Breed</h2>
                <p className="text-lg">{pet.breed}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500">Age</h2>
                <p className="text-lg">{pet.age} years</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{pet.description}</p>
            </div>

            {pet.seller && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Seller/Vet</h2>
                <p className="text-gray-700">{pet.seller.name}</p>
              </div>
            )}

            <div className="flex space-x-4">
              {user?.role === "client" && <button className="btn btn-primary">Adopt Now</button>}

              {canPerformAction(user, "edit_pet", pet) && (
                <Link to={`/pets/edit/${pet.id}`} className="btn btn-secondary">
                  Edit
                </Link>
              )}

              {canPerformAction(user, "delete_pet", pet) && (
                <button onClick={handleDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={pet.name}
      />
    </div>
  )
}

export default PetDetail
