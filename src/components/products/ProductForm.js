import { useState, useEffect } from "react";
   import { useDispatch, useSelector } from "react-redux";
   import { useNavigate, useParams } from "react-router-dom";
   import { createProduct, fetchProductById, updateProduct, clearProductState } from "../../redux/slices/productSlice";
   import FileUpload from "../common/FileUpload";

   const ProductForm = () => {
     const { id } = useParams();
     const isEditMode = !!id;

     const [formData, setFormData] = useState({
       name: "",
       description: "",
       price: "",
       stock: "", // Добавлено поле stock
       categoryId: "",
       image: null,
     });
     const [errors, setErrors] = useState({});
     const [imageFile, setImageFile] = useState(null);

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { product, loading, error } = useSelector((state) => state.products);
     const { user } = useSelector((state) => state.auth);
     const { categories } = useSelector((state) => state.categories);

     useEffect(() => {
       if (isEditMode) {
         dispatch(fetchProductById(id));
       } else {
         dispatch(clearProductState());
       }

       return () => {
         dispatch(clearProductState());
       };
     }, [dispatch, id, isEditMode]);

     useEffect(() => {
       if (isEditMode && product) {
         setFormData({
           name: product.name || "",
           description: product.description || "",
           price: product.price || "",
           stock: product.stock || "", // Добавлено поле stock
           categoryId: product.category_id || "",
           image: product.image_url || null,
         });
       }
     }, [isEditMode, product]);

     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({
         ...formData,
         [name]: value,
       });
     };

     const handleImageChange = (file) => {
       setImageFile(file);
     };

     const validate = () => {
       const newErrors = {};

       if (!formData.name) {
         newErrors.name = "Название обязательно";
       }

       if (!formData.description) {
         newErrors.description = "Описание обязательно";
       }

       if (!formData.price) {
         newErrors.price = "Цена обязательна";
       } else if (isNaN(formData.price) || Number.parseFloat(formData.price) <= 0) {
         newErrors.price = "Цена должна быть положительным числом";
       }

       if (!formData.stock) {
         newErrors.stock = "Количество на складе обязательно";
       } else if (isNaN(formData.stock) || Number.parseInt(formData.stock) < 0) {
         newErrors.stock = "Количество не может быть отрицательным";
       }

       if (!formData.categoryId) {
         newErrors.categoryId = "Категория обязательна";
       }

       if (!isEditMode && !imageFile && !formData.image) {
         newErrors.image = "Изображение обязательно";
       }

       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = (e) => {
       e.preventDefault();

       if (validate()) {
         const productData = {
           ...formData,
           price: Number.parseFloat(formData.price),
           stock: Number.parseInt(formData.stock), // Добавлено поле stock
           seller_id: user.id,
         };

         if (imageFile) {
           productData.image = imageFile;
         }

         if (isEditMode) {
           dispatch(updateProduct({ id, productData }))
             .unwrap()
             .then(() => navigate(`/products/${id}`));
         } else {
           dispatch(createProduct(productData))
             .unwrap()
             .then((result) => navigate(`/products/${result.product_id}`));
         }
       }
     };

     return (
       <div>
         <h1 className="text-3xl font-bold mb-6">{isEditMode ? "Редактировать продукт" : "Добавить продукт"}</h1>

         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
               <div>
                 <label htmlFor="name" className="form-label">
                   Название продукта
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
                 <label htmlFor="price" className="form-label">
                   Цена ($)
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

               <div>
                 <label htmlFor="stock" className="form-label">
                   Количество на складе
                 </label>
                 <input
                   type="number"
                   id="stock"
                   name="stock"
                   min="0"
                   className={`form-input ${errors.stock ? "border-red-500" : ""}`}
                   value={formData.stock}
                   onChange={handleChange}
                 />
                 {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
               </div>

               <div>
                 <label htmlFor="categoryId" className="form-label">
                   Категория
                 </label>
                 <select
                   id="categoryId"
                   name="categoryId"
                   className={`form-input ${errors.categoryId ? "border-red-500" : ""}`}
                   value={formData.categoryId}
                   onChange={handleChange}
                 >
                   <option value="">Выберите категорию</option>
                   {categories.map((category) => (
                     <option key={category.id} value={category.id}>
                       {category.name}
                     </option>
                   ))}
                 </select>
                 {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
               </div>
             </div>

             <div className="space-y-4">
               <div>
                 <label htmlFor="description" className="form-label">
                   Описание
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

               <FileUpload onChange={handleImageChange} preview={formData.image} label="Изображение продукта" />
               {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
             </div>
           </div>

           <div className="flex justify-end mt-6 space-x-4">
             <button type="button" onClick={() => navigate("/products")} className="btn btn-secondary">
               Отмена
             </button>
             <button type="submit" className="btn btn-primary" disabled={loading}>
               {loading ? "Сохранение..." : isEditMode ? "Обновить продукт" : "Создать продукт"}
             </button>
           </div>
         </form>
       </div>
     );
   };

   export default ProductForm;