// src/components/products/ProductDetail.js
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchProductById, deleteProduct } from "../../redux/slices/productSlice"
import { canPerformAction } from "../../utils/permissions"
import DeleteModal from "../common/DeleteModal"

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { product, loading } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  const handleDeleteClick = () => {
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        navigate("/products")
      })
  }

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading product details...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/products" className="text-emerald-600 hover:underline">
          &larr; Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image_url || "/placeholder.svg?height=400&width=600"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
              {product.category && (
                <span className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                  {product.category.name}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {product.seller && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Seller</h2>
                <p className="text-gray-700">{product.seller.name}</p>
              </div>
            )}

            <div className="flex space-x-4">
              {user?.role === "client" && <button className="btn btn-primary">Add to Cart</button>}

              {canPerformAction(user, "edit_product", product) && (
                <Link to={`/products/edit/${product.id}`} className="btn btn-secondary">
                  Edit
                </Link>
              )}

              {canPerformAction(user, "delete_product", product) && (
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
        itemName={product.name}
      />
    </div>
  )
}

export default ProductDetail
