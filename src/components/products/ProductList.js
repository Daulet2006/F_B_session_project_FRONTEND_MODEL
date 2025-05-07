// src/components/products/ProductList.js
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts, deleteProduct } from "../../redux/slices/productSlice"
import { hasPermission, canPerformAction } from "../../utils/permissions"
import DeleteModal from "../common/DeleteModal"

const ProductList = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id))
      setDeleteModalOpen(false)
      setProductToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading products...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        {hasPermission(user, "create_product") && (
          <Link to="/products/add" className="btn btn-primary">
            Add New Product
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.svg?height=200&width=300"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex justify-between">
                  <Link to={`/products/${product.id}`} className="text-emerald-600 hover:text-emerald-800">
                    View Details
                  </Link>

                  {canPerformAction(user, "edit_product", product) && (
                    <Link to={`/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800">
                      Edit
                    </Link>
                  )}

                  {canPerformAction(user, "delete_product", product) && (
                    <button onClick={() => handleDeleteClick(product)} className="text-red-600 hover:text-red-800">
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
        itemName={productToDelete?.name || "this product"}
      />
    </div>
  )
}

export default ProductList
