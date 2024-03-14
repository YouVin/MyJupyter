import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 렌더링합니다. */}
  </React.StrictMode>
);

reportWebVitals();
