const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white hover:bg-green-50 transition-all transform hover:scale-105 duration-300">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
        <p className="text-gray-700 text-lg mt-2">{product.price} USD</p>
        <button className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
