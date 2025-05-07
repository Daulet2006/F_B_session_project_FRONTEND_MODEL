// src/components/dashboard/Dashboard.js
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts } from "../../redux/slices/productSlice"
import { fetchPets } from "../../redux/slices/petSlice"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { products, loading: productsLoading } = useSelector((state) => state.products)
  const { pets, loading: petsLoading } = useSelector((state) => state.pets)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchPets())
  }, [dispatch])

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Manage Products" count={products.length} icon="🛍️" link="/products" color="bg-blue-500" />
      <DashboardCard title="Manage Pets" count={pets.length} icon="🐾" link="/pets" color="bg-green-500" />
      <DashboardCard title="Manage Users" count="All" icon="👥" link="/users" color="bg-purple-500" />
      <DashboardCard title="View Orders" count="All" icon="📦" link="/orders" color="bg-yellow-500" />
    </div>
  )

  const renderSellerDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="My Products"
        count={products.filter((p) => p.sellerId === user.id).length}
        icon="🛍️"
        link="/products"
        color="bg-blue-500"
      />
      <DashboardCard
        title="My Pets"
        count={pets.filter((p) => p.sellerId === user.id).length}
        icon="🐾"
        link="/pets"
        color="bg-green-500"
      />
      <DashboardCard title="My Orders" count="View" icon="📦" link="/orders" color="bg-yellow-500" />
      <DashboardCard title="Add New Product" count="+" icon="➕" link="/products/add" color="bg-emerald-500" />
      <DashboardCard title="Add New Pet" count="+" icon="🐶" link="/pets/add" color="bg-emerald-500" />
    </div>
  )

  const renderClientDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Browse Products" count={products.length} icon="🛍️" link="/products" color="bg-blue-500" />
      <DashboardCard title="Browse Pets" count={pets.length} icon="🐾" link="/pets" color="bg-green-500" />
      <DashboardCard title="My Orders" count="View" icon="📦" link="/orders" color="bg-yellow-500" />
    </div>
  )

  const renderDashboardByRole = () => {
    if (!user) return null

    switch (user.role) {
      case "admin":
        return renderAdminDashboard()
      case "seller":
        return renderSellerDashboard()
      case "client":
        return renderClientDashboard()
      default:
        return null
    }
  }

  if (productsLoading || petsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">You are logged in as a {user?.role}. Here's your dashboard.</p>
      </div>

      {renderDashboardByRole()}
    </div>
  )
}

// Dashboard Card Component
const DashboardCard = ({ title, count, icon, link, color }) => (
  <Link to={link} className="block">
    <div className={`${color} text-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105`}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-3xl font-bold mt-2">{count}</p>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
      <div className="bg-black bg-opacity-10 py-2 text-center">View Details</div>
    </div>
  </Link>
)

export default Dashboard
