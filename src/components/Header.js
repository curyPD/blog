import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="mx-auto flex h-14 max-w-screen-xl items-center justify-between bg-white px-4">
      <h2 className="font-sans text-2xl font-bold text-blue-900">Blog</h2>
      <SearchBar />
      <button className="rounded focus:outline-none focus:ring-2 md:hidden">
        <HiOutlineMenuAlt3 className="text-2xl  text-blue-900" />
      </button>
    </header>
  );
}

export default Header;
