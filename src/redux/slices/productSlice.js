import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
   import { toast } from "react-toastify";
   import api from "../../utils/api";

   // Initial state
   const initialState = {
     products: [],
     product: null,
     loading: false,
     error: null,
   };

   // Async thunks
   export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
     try {
       const response = await api.get("/products/");
       return response.data;
     } catch (error) {
       console.error("fetchProducts error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Не удалось загрузить продукты");
     }
   });

   export const fetchProductById = createAsyncThunk("products/fetchById", async (id, { rejectWithValue }) => {
     try {
       const response = await api.get(`/products/${id}`);
       return response.data;
     } catch (error) {
       console.error("fetchProductById error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Не удалось загрузить продукт");
     }
   });

   export const createProduct = createAsyncThunk("products/create", async (productData, { rejectWithValue }) => {
     try {
       const formData = new FormData();
       Object.keys(productData).forEach((key) => {
         if (key === "image" && productData[key] instanceof File) {
           formData.append(key, productData[key]);
         } else {
           formData.append(key, productData[key]);
         }
       });

       const response = await api.post("/products", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });

       return response.data; // Возвращаем {message, product_id}
     } catch (error) {
       console.error("createProduct error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Не удалось создать продукт");
     }
   });

   export const updateProduct = createAsyncThunk("products/update", async ({ id, productData }, { rejectWithValue }) => {
     try {
       const formData = new FormData();
       Object.keys(productData).forEach((key) => {
         if (key === "image" && productData[key] instanceof File) {
           formData.append(key, productData[key]);
         } else {
           formData.append(key, productData[key]);
         }
       });

       const response = await api.put(`/products/${id}`, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });

       return response.data.product; // Бэкенд возвращает {message, product}
     } catch (error) {
       console.error("updateProduct error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Не удалось обновить продукт");
     }
   });

   export const deleteProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue }) => {
     try {
       await api.delete(`/products/${id}`);
       return id;
     } catch (error) {
       console.error("deleteProduct error:", error.response?.data || error.message);
       return rejectWithValue(error.response?.data?.message || "Не удалось удалить продукт");
     }
   });

   // Product slice
   const productSlice = createSlice({
     name: "products",
     initialState,
     reducers: {
       clearProductState: (state) => {
         state.product = null;
         state.error = null;
       },
     },
     extraReducers: (builder) => {
       builder
         // Fetch all products
         .addCase(fetchProducts.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
           state.loading = false;
           state.products = action.payload;
         })
         .addCase(fetchProducts.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
           toast.error(action.payload);
         })
         // Fetch product by ID
         .addCase(fetchProductById.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(fetchProductById.fulfilled, (state, action) => {
           state.loading = false;
           state.product = action.payload;
         })
         .addCase(fetchProductById.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
           toast.error(action.payload);
         })
         // Create product
         .addCase(createProduct.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(createProduct.fulfilled, (state, action) => {
           state.loading = false;
           state.products.push({ id: action.payload.product_id, ...action.payload }); // Добавляем product_id
           toast.success("Продукт успешно создан!");
         })
         .addCase(createProduct.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
           toast.error(action.payload);
         })
         // Update product
         .addCase(updateProduct.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(updateProduct.fulfilled, (state, action) => {
           state.loading = false;
           const index = state.products.findIndex((p) => p.id === action.payload.id);
           if (index !== -1) {
             state.products[index] = action.payload;
           }
           state.product = action.payload;
           toast.success("Продукт успешно обновлён!");
         })
         .addCase(updateProduct.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
           toast.error(action.payload);
         })
         // Delete product
         .addCase(deleteProduct.pending, (state) => {
           state.loading = true;
           state.error = null;
         })
         .addCase(deleteProduct.fulfilled, (state, action) => {
           state.loading = false;
           state.products = state.products.filter((p) => p.id !== action.payload);
           toast.success("Продукт успешно удалён!");
         })
         .addCase(deleteProduct.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
           toast.error(action.payload);
         });
     },
   });

   export const { clearProductState } = productSlice.actions;

   export default productSlice.reducer;