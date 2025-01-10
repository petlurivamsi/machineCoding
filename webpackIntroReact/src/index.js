import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<h1>Hello World</h1>);

// createRoot.render(<h1>Hello World</h1>, document.getElementById("root"));