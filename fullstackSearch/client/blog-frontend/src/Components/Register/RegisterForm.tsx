import React from "react";

const RegisterForm: React.FC = () => {
  return (
    <form className="registerForm">
      <div className="name-details">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Surname" />
      </div>
      <label htmlFor="dob-details">
        Date of birth{" "}
        <i
          title="Click for more information"
          className="bi bi-question-circle-fill"
        ></i>
      </label>
      {/* @TODO: Enable on click on tooltip. */}
      <div className="tooltip-dob">
        Tooltip content Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Officiis architecto iusto odio ducimus necessitatibus porro
        officia hic repellendus eos maiores eum enim voluptate sit aperiam,
        accusantium amet, molestias vero quisquam?
      </div>
      <div className="dob-details" id="dob-details">
        <select className="dob-details-day">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <select className="dob-details-month">
          <option>January</option>
          <option>February</option>
          <option>March</option>
        </select>
        <select className="dob-details-year">
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
      </div>
      <label htmlFor="gender-details">
        Gender{" "}
        <i
          title="Click for more information"
          className="bi bi-question-circle-fill"
        ></i>
      </label>
      <div className="gender-details" id="gender-details">
        <div>
          <label htmlFor="female">Female</label>
          <input type="radio" name="female" id="female" />
        </div>
        <div>
          <label htmlFor="male">Male</label>
          <input type="radio" name="male" id="male" />
        </div>
        <div>
          <label htmlFor="custom">Custom</label>
          <input type="radio" name="custom" id="custom" />
        </div>
      </div>
      <div className="contact-details">
        <input
          type="text"
          name="mobile-or-email"
          id="mobileOrEmail"
          placeholder="Mobile number or email address"
        />
      </div>
      <div className="password-details">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="New password"
        />
      </div>
      <div className="people-text-and-signup-details">
        <p className="people-text">
          People who use our service may have uploaded your contact information
          to Facebook.
          <a className="learnMore" href="#">
            Learn more
          </a>
        </p>
        <p className="signup-details">
          By clicking Sign Up, you agree to our{" "}
          <a href="#" className="terms">
            Terms
          </a>
          ,
          <a href="#" className="privacyPolicy">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="cookiesPolicy">
            Cookies Policy
          </a>
          . You may receive SMS notifications from us and can opt out at any
          time.
        </p>
      </div>
      <button className="signUpButton">Sign Up</button>
      <div className="already-have-account-details">
        <a href="#" className="have-account">
          Already have an account?
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
