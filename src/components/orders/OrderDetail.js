// src/components/orders/OrderDetail.js
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { fetchOrderById, updateOrderStatus } from "../../redux/slices/orderSlice"
import { hasPermission } from "../../utils/permissions"

const OrderDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { order, loading } = useSelector((state) => state.orders)
  const { user } = useSelector((state) => state.auth)

  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    dispatch(fetchOrderById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (order) {
      setNewStatus(order.status)
    }
  }, [order])

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value)
  }

  const handleUpdateStatus = () => {
    if (newStatus !== order.status) {
      dispatch(updateOrderStatus({ id, status: newStatus }))
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading || !order) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-emerald-600">Loading order details...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/orders" className="text-emerald-600 hover:underline">
          &larr; Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <span
              className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Information</h2>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {order.user?.name || "Unknown"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {order.user?.email || "Unknown"}
              </p>
              {order.shippingAddress && (
                <p className="text-gray-700">
                  <span className="font-medium">Shipping Address:</span> {order.shippingAddress}
                </p>
              )}
            </div>
          </div>

          {hasPermission(user, "update_order") && (
            <div className="mb-6 p-4 border border-gray-200 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Update Order Status</h2>
              <div className="flex items-center space-x-4">
                <select value={newStatus} onChange={handleStatusChange} className="form-input">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={handleUpdateStatus} className="btn btn-primary" disabled={newStatus === order.status}>
                  Update Status
                </button>
              </div>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={item.image || "/placeholder.svg?height=40&width=40"}
                            alt={item.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {item.sellerId && (
                            <div className="text-sm text-gray-500">Seller: {item.sellerName || "Unknown"}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-medium">
                    Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">${order.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
