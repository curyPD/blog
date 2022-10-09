import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { curUser, logOut } = useAuth();

  return (
    <nav className="flex h-full gap-2">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "flex items-center px-3 font-sans text-sm font-medium text-blue-700 hover:bg-gray-100 hover:text-gray-800"
            : "flex items-center px-3 font-sans text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-800"
        }
        to="/"
      >
        <span>Home</span>
      </NavLink>

      {curUser && curUser.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2" && (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-3 font-sans text-sm font-medium text-blue-700 hover:bg-gray-100 hover:text-gray-800"
              : "flex items-center px-3 font-sans text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-800"
          }
          to="/dashboard"
        >
          <span>Dashboard</span>
        </NavLink>
      )}
      {curUser ? (
        <button
          className="flex items-center px-3 font-sans text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-800"
          onClick={logOut}
        >
          <span>Log Out</span>
        </button>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-3 font-sans text-sm font-medium text-blue-700 hover:bg-gray-100 hover:text-gray-800"
              : "flex items-center px-3 font-sans text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-800"
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
