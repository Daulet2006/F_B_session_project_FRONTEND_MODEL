// src/components/layout/NotFound.js
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for seems to have escaped from our zoo.
      </p>
      <Link to="/" className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
