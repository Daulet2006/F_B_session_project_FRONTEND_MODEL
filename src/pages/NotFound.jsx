import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-green-600">404</h1>
        <h2 className="text-2xl text-gray-700 mt-2">Page Not Found</h2>
        <p className="text-gray-500 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
