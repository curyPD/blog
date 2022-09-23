import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import FirestoreProvider from "./contexts/FirestoreContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <FirestoreProvider>
        <App />
      </FirestoreProvider>
    </AuthProvider>
  </BrowserRouter>
);
