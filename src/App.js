import React from "react";

import { Routes, Route } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import FirestoreProvider from "./contexts/FirestoreContext";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FirestoreProvider>
    </AuthProvider>
  );
}
