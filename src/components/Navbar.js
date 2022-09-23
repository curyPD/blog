import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { curUser, logOut } = useAuth();

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-2 font-sans text-base text-blue-900"
                : "p-2 font-sans text-base text-gray-600"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        {curUser && curUser.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2" && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-2 font-sans text-base text-blue-900"
                  : "p-2 font-sans text-base text-gray-600"
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {curUser ? (
          <li>
            <button
              className="p-2 font-sans text-base text-gray-600"
              onClick={logOut}
            >
              Log Out
            </button>
          </li>
        ) : (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-2 font-sans text-base text-blue-900"
                  : "p-2 font-sans text-base text-gray-600"
              }
              to="/login"
            >
              Log In
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
