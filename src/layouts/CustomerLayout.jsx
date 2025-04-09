import React from "react";
import Navbar from "../components/Navbar/Navbar";

const CustomerLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default CustomerLayout;
