import React from "react";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-b-blue-100/70 bg-white">
      <div className="mx-auto flex h-12 max-w-screen-2xl justify-between px-4 lg:h-14 lg:px-6 xl:px-10">
        <h2 className="self-center font-serif text-2xl font-medium tracking-tight text-blue-800 lg:text-3xl">
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
