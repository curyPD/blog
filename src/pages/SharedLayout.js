import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function SharedLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 bg-blue-100/70">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SharedLayout;
