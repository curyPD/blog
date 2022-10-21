import React from "react";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-b-blue-100/70 bg-white">
      <div className="mx-auto flex h-12 max-w-screen-xl justify-between px-4">
        <h2 className="self-center font-serif text-2xl font-medium tracking-tight text-blue-800">
          <Link to="/" className="focus:outline-none">
            Blog
          </Link>
        </h2>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
