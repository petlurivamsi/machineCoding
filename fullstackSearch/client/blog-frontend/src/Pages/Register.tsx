import React from "react";
import Heading from "../Components/Heading/Heading";
import RegisterForm from "../Components/Register/RegisterForm";
import "../styles.css";
import "../Components/Register/RegisterForm.css";

const Register: React.FC = () => {
  return (
    <section className="registerHeadingAndContainer">
      <Heading />
      <div className="registerContainer">
        <h3>Create a new account</h3>
        <p className="registerTextDesc">Its quick and easy</p>
        <hr className="registerDescAndFormSeparator" />
        <RegisterForm />
      </div>
    </section>
  );
};

export default Register;
