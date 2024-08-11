import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="anonymous" />
    <link
      href='https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap'
      rel='stylesheet'
    ></link>
    <App />
  </React.StrictMode>,
);
