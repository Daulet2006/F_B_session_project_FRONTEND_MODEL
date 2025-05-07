import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createPet, fetchPetById, updatePet, clearPetState } from "../../redux/slices/petSlice";
import FileUpload from "../common/FileUpload";

const PetForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    price: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pet, loading, error } = useSelector((state) => state.pets);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchPetById(id));
    } else {
      dispatch(clearPetState());
    }

    return () => {
      dispatch(clearPetState());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && pet) {
      setFormData({
        name: pet.name || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        price: pet.price || "",
        description: pet.description || "",
        image: pet.image_url || null,
      });
    }
  }, [isEditMode, pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (file) => {
    setImageFile(file); // This should only be a File object or null
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.species) {
      newErrors.species = "Species is required";
    }

    if (!formData.breed) {
      newErrors.breed = "Breed is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || Number.parseFloat(formData.age) < 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
    }

    if (!isEditMode && !imageFile && !formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const petData = {
        ...formData,
        age: Number.parseFloat(formData.age),
        price: Number.parseFloat(formData.price),
        sellerId: user.id,
      };

      if (imageFile) {
        petData.image = imageFile;
      }

      // Log JWT payload for debugging
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("PetForm JWT Payload:", payload);
      }

      if (isEditMode) {
        dispatch(updatePet({ id, petData }))
          .unwrap()
          .then(() => navigate(`/pets/${id}`))
          .catch((err) => console.error("Update pet error:", err));
      } else {
        dispatch(createPet(petData))
          .unwrap()
          .then((result) => navigate(`/pets/${result.pet_id}`))
          .catch((err) => console.error("Create pet error:", err));
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? "Edit Pet" : "Add New Pet"}</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">
                Pet Name
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
              <label htmlFor="species" className="form-label">
                Species
              </label>
              <input
                type="text"
                id="species"
                name="species"
                className={`form-input ${errors.species ? "border-red-500" : ""}`}
                value={formData.species}
                onChange={handleChange}
              />
              {errors.species && <p className="text-red-500 text-sm mt-1">{errors.species}</p>}
            </div>

            <div>
              <label htmlFor="breed" className="form-label">
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                className={`form-input ${errors.breed ? "border-red-500" : ""}`}
                value={formData.breed}
                onChange={handleChange}
              />
              {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="form-label">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  step="0.1"
                  min="0"
                  className={`form-input ${errors.age ? "border-red-500" : ""}`}
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label htmlFor="price" className="form-label">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.price ? "border-red-500" : ""}`}
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className={`form-input ${errors.description ? "border-red-500" : ""}`}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <FileUpload onChange={handleImageChange} preview={formData.image} label="Pet Image" />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button type="button" onClick={() => navigate("/pets")} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update Pet" : "Create Pet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;
