import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function SharedLayout() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-blue-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default SharedLayout;
