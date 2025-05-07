// src/components/users/UserForm.js
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { createUser, fetchUserById, updateUser, clearUserState } from "../../redux/slices/userSlice"

const UserForm = () => {
  const { id } = useParams()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  })
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector((state) => state.users)

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchUserById(id))
    } else {
      dispatch(clearUserState())
    }

    return () => {
      dispatch(clearUserState())
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        role: user.role || "client",
      })
    }
  }, [isEditMode, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    } else {
      // In edit mode, only validate password if it's provided
      if (formData.password && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (!formData.role) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData

      // If editing and password is empty, remove it
      if (isEditMode && !userData.password) {
        const { password, ...userDataWithoutPassword } = userData

        dispatch(updateUser({ id, userData: userDataWithoutPassword }))
          .unwrap()
          .then(() => navigate("/users"))
      } else if (isEditMode) {
        dispatch(updateUser({ id, userData }))
          .unwrap()
          .then(() => navigate("/users"))
      } else {
        dispatch(createUser(userData))
          .unwrap()
          .then(() => navigate("/users"))
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? "Edit User" : "Add New User"}</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? "border-red-500" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? "border-red-500" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              {isEditMode ? "Password (leave blank to keep current)" : "Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? "border-red-500" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? "border-red-500" : ""}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className={`form-input ${errors.role ? "border-red-500" : ""}`}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="client">Client</option>
              <option value="vet">Vet</option>

            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button type="button" onClick={() => navigate("/users")} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
