import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PetCard from "../components/PetCard";
import ProductCard from "../components/ProductCard";
import AppointmentCard from "../components/AppointmentCard";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  const pets = [
    { name: "Bella", description: "Friendly dog", image: "pet1.jpg" },
    { name: "Lucy", description: "Cute cat", image: "pet2.jpg" },
    { name: "Max", description: "Playful rabbit", image: "pet3.jpg" },
  ];

  const products = [
    { name: "Pet Food", price: 25, image: "product1.jpg" },
    { name: "Pet Toys", price: 15, image: "product2.jpg" },
    { name: "Pet Bed", price: 50, image: "product3.jpg" },
  ];

  const appointments = [
    { petName: "Bella", date: "2025-04-10", vetName: "Dr. Smith" },
    { petName: "Lucy", date: "2025-04-12", vetName: "Dr. Johnson" },
    { petName: "Max", date: "2025-04-15", vetName: "Dr. Lee" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-6">
          {/* Section for Pets */}
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Available Pets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet, index) => (
                <PetCard key={index} pet={pet} />
              ))}
            </div>
          </section>

          {/* Section for Products */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Products for Your Pets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>

          {/* Section for Appointments */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Upcoming Appointments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment, index) => (
                <AppointmentCard key={index} appointment={appointment} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
