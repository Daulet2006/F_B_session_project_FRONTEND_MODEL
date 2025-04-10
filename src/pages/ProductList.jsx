// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, filterProducts, buyProduct, deleteProduct } from '../services/productAPI';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { role } = user;
  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const isVet = role === 'vet';
  const isCustomer = role === 'customer';

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Error loading products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await filterProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert('Error filtering products');
    }
  };

  const handleBuy = async (productId) => {
    try {
      await buyProduct(productId);
      alert('Product purchased!');
      loadProducts(); // Обновляем список после покупки
    } catch (error) {
      alert('Purchase failed: ' + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(productId);
      alert('Product deleted successfully');
      loadProducts(); // Обновляем список после удаления
    } catch (error) {
      alert('Delete failed: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {(isAdmin || isSeller) && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddProductForm
            onSuccess={() => {
              setShowAddForm(false);
              loadProducts();
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const canEdit = isAdmin || (isSeller && product.sellerId === user.id);
          const canDelete = isAdmin || (isSeller && product.sellerId === user.id);
          const canBuy = isCustomer;
          const canRecommend = isVet;
          return (
          <ProductCard
            key={product.id}
            product={product}
            onBuy={handleBuy}
            onDelete={handleDelete}
            isSeller={isSeller}
            isAdmin={isAdmin}
            isOwner={isSeller && product.seller_id === user.id}
          />
        );
      })}
      </div>
    </div>
  );
};

export default ProductList;
