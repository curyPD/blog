import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-2 font-serif text-base  text-blue-900"
                : "p-2 font-serif text-base  text-gray-600"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-2 font-serif text-base text-blue-900"
                : "p-2 font-serif text-base text-gray-600"
            }
            to="/signup"
          >
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-2 font-serif text-base text-blue-900"
                : "p-2 font-serif text-base text-gray-600"
            }
            to="/login"
          >
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
