import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-b-blue-50 bg-white">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-12 xl:px-4">
        <h2 className="font-serif text-2xl font-bold text-blue-900">
          <Link to="/">Blog</Link>
        </h2>
        <button className="rounded focus:outline-none focus:ring-2 md:hidden">
          <HiOutlineMenuAlt3 className="text-2xl  text-blue-900" />
        </button>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
