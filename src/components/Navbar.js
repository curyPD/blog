import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { curUser, logOut } = useAuth();

  return (
    <nav className="flex h-full gap-1">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "flex items-center border-b-2 border-blue-900 px-3 font-sans text-sm font-semibold text-blue-900 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
            : "flex items-center border-b-2 border-transparent px-3 font-sans text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700"
        }
        to="/"
      >
        <span>Home</span>
      </NavLink>

      {curUser && curUser.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2" && (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center border-b-2 border-blue-900 px-3 font-sans text-sm font-semibold text-blue-900 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
              : "flex items-center border-b-2 border-transparent px-3 font-sans text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700"
          }
          to="/dashboard"
        >
          <span>Dashboard</span>
        </NavLink>
      )}
      {curUser ? (
        <button
          className="flex items-center border-b-2 border-transparent px-3 font-sans text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700"
          onClick={logOut}
        >
          <span>Log Out</span>
        </button>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center border-b-2 border-blue-900 px-3 font-sans text-sm font-semibold text-blue-900 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
              : "flex items-center border-b-2 border-transparent px-3 font-sans text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700"
          }
          to="/login"
        >
          <span>Log In</span>
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
