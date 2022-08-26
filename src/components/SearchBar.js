import React from "react";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

function SearchBar() {
  return (
    <form className="relative hidden h-9 basis-96 rounded bg-gray-100 md:block">
      <HiOutlineSearch className="absolute top-1/2 left-0  translate-x-3 -translate-y-1/2 text-gray-400 " />
      <input
        type="text"
        placeholder="Search for posts"
        className="block h-full w-full rounded bg-transparent px-10 font-serif text-sm text-gray-700 placeholder:font-serif placeholder:text-sm  placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
      />
      <button
        type="button"
        className="absolute top-1/2 right-0 flex h-full w-8 -translate-y-1/2 items-center justify-center rounded text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2"
      >
        <HiOutlineX />
      </button>
    </form>
  );
}

export default SearchBar;
