import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { curUser, logOut } = useAuth();

  return (
    <nav className="flex h-full space-x-1">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "flex items-center border-b border-blue-800 px-2 font-sans text-sm font-normal text-blue-800 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
            : "flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700"
        }
        to="/"
      >
        <span>Home</span>
      </NavLink>

      {curUser && curUser.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2" && (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center border-b border-blue-800 px-2 font-sans text-sm font-normal text-blue-800 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
              : "flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700"
          }
          to="/dashboard"
        >
          <span>Dashboard</span>
        </NavLink>
      )}
      {curUser ? (
        <button
          className="flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700"
          onClick={logOut}
        >
          <span>Log Out</span>
        </button>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center border-b border-blue-800 px-2 font-sans text-sm font-normal text-blue-800 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
              : "flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700"
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
