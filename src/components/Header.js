import React from "react";

import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../logo.svg";

function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-12 max-w-screen-2xl justify-between px-4 lg:h-14 lg:px-6 xl:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none lg:gap-2.5 xl:gap-3"
        >
          <img
            src={logo}
            alt="Polyglot Dream logo"
            className="h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8"
          />
          <h2 className="self-center font-serif text-base font-semibold tracking-tight text-gray-800 lg:text-lg xl:text-xl">
            Polyglot Dream
          </h2>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
