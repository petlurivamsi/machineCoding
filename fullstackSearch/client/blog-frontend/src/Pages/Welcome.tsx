import React from "react";
import LoginForm from "../Components/Login/LoginForm";
import Footer from "../Components/Footer/Footer";
import Heading from "../Components/Heading/Heading";

const Welcome: React.FC = () => {
  return (
    <div className="fb-container">
      <div className="headingAndLoginContainer">
        <div className="headingAndDesc">
          <Heading />
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
