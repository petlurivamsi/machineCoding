import React from "react";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  return (
    <div className="loginFormContainer">
      <form action="#" className="loginForm">
        <input
          type="text"
          className="inputField email"
          placeholder="Email address or phone number"
        />
        <input
          type="password"
          className="inputField password"
          placeholder="Password"
        />
        <button type="submit" className="loginSubmitButton">
          Log in
        </button>
      </form>
      <div className="forgotPwdContainer">
        <a href="#" className="forgot-password">
          Forgotten password?
        </a>
        <hr className="separator" />
        <button className="createNewAccountButton">Create new account</button>
      </div>
    </div>
  );
};

export default LoginForm;
