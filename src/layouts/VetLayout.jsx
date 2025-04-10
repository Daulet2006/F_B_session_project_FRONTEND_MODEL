import React from "react";
import Navbar from "../components/Navbar";

const VetLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VetLayout;