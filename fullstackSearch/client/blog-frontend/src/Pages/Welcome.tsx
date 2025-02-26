import React from "react";
import LoginForm from "../Components/Login/LoginForm";
import Footer from "../Components/Footer/Footer";

const Welcome: React.FC = () => {
  return (
    <div className="fb-container">
      <div className="headingAndLoginContainer">
        <div className="headingAndDesc">
          <h1 className="fb-heading">facebook</h1>
          <p className="fb-description">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
        <div className="loginAndCreatePage">
          <LoginForm />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Welcome;
