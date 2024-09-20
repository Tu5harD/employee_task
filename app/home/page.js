import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <div className="flex text-lg items-center justify-center min-h-screen bg-gray-100">
        Welcome to Admin Panel 👋
      </div>
    </div>
  );
};

export default page;
