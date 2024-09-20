import Footer from "@/components/Footer/Footer";
import EmployeeRegistrationForm from "@/components/Form/RegistrationForm";
import NavBar from "@/components/NavBar/NavBar";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <EmployeeRegistrationForm />
      <Footer />
    </div>
  );
};

export default page;
