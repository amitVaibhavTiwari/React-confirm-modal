import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Confirm from "./Components/Confirmation-Modal/Confirm.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Confirm>
      <App />
    </Confirm>
  </React.StrictMode>
);
