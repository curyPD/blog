import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import ArticlesProvider from "./contexts/ArticlesContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ArticlesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ArticlesProvider>
  </BrowserRouter>
);
