import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-b-blue-50 bg-white">
      <div className="mx-auto flex h-14 max-w-screen-xl justify-between px-4 md:px-12 xl:px-4">
        <h2 className="self-center font-serif text-xl font-black text-blue-900">
          <Link to="/">Blog</Link>
        </h2>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
