import React from "react";

import { Routes, Route } from "react-router-dom";

import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
      </Route>
    </Routes>
  );
}
