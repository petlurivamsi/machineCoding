import React from "react";
import ReactDOM from "react-dom/client";
import img1 from "./assets/img1.jpeg";
import "./styles.css";
import Welcome from "./Pages/Welcome";
import Register from "./Pages/Register";
import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  return (
    <div className="container">
      {/* <Welcome /> */}
      <Register />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
