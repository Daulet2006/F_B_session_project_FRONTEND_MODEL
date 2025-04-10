import React, { useState } from 'react';
import { updateProduct } from '../services/productAPI';

const ProductCard = ({
  product,
  onBuy, 
  onDelete, 
  canEdit, 
  canDelete, 
  canBuy, 
  canRecommend 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEdit = async () => {
    try {
      await updateProduct(product.id, editedProduct);
      setIsEditing(false);
      alert('Product updated successfully');
      window.location.reload(); // Обновляем страницу для отображения изменений
    } catch (error) {
      alert('Update failed: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transform transition-all duration-300 hover:shadow-xl">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <textarea
            value={editedProduct.description}
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            value={editedProduct.stock}
            onChange={(e) => setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2 text-green-700">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-bold text-green-600">${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
          
          <div className="space-y-2">
            {canBuy && (
              <button
                onClick={() => onBuy(product.id)}
                disabled={product.stock <= 0}
                className={`w-full ${product.stock > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300`}
              >
                {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>
            )}
            
            {(canEdit || canDelete) && (
              <div className="flex gap-2">
                {canEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => onDelete(product.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
                {canRecommend && (
                  <button
                    onClick={() => {
                      // Ensure onRecommend prop is passed before calling
                      if (typeof onRecommend === 'function') {
                        // Skip recommend action since onRecommend is not defined
                        console.warn('onRecommend prop is not defined');
                      }
                    }}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Recommend
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
