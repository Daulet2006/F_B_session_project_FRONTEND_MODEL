// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import PetCard from "../components/PetCard";
import ProductCard from "../components/ProductCard";
import AppointmentCard from "../components/AppointmentCard";
import { getPets } from "../services/petAPI";
import { getProducts } from "../services/productAPI";
import { getAppointments } from "../services/appointmentAPI";

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [pets, setPets] = useState([]);
  const [products, setProducts] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petList = await getPets();
        const productList = await getProducts();
        const appointmentList = await getAppointments();
        setPets(petList);
        setProducts(productList);
        setAppointments(appointmentList);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex flex-1">
        <main className="flex-1 p-6 space-y-8 animate-fadeIn">
          {/* Welcome Section */}
          <section className="text-center py-12 bg-white rounded-xl shadow-lg mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
              Welcome to ZooStore
            </h1>
            {!isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-lg text-gray-600 mb-6">
                  Join our community to explore pets, products, and services!
                </p>
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-xl text-gray-700">
                Welcome back, {user?.username}!
              </p>
            )}
          </section>
          <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2 border-green-200">
              Available Pets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-cards">
              {pets.map((pet, index) => (
                <PetCard key={index} pet={pet} />
              ))}
            </div>
          </section>

          {/* Products */}
          <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2 border-green-200">
              Products for Your Pets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-cards">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>

          {/* Appointments */}
          <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2 border-green-200">
              Upcoming Appointments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-cards">
              {appointments.map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
