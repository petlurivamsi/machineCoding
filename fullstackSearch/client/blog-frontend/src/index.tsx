import React from "react";
import ReactDOM from "react-dom/client";
import img1 from "./assets/img1.jpeg";
import "./styles.css";
import Welcome from "./Pages/Welcome";

const App: React.FC = () => {
  return (
    <div className="container">
      <Welcome />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
