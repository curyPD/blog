import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { HiOutlineX, HiOutlineMenuAlt3 } from "react-icons/hi";

import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { curUser, logOut } = useAuth();

  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="hidden h-full space-x-1 sm:flex">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center border-b border-blue-800 px-2 font-sans text-sm font-normal text-blue-800 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
              : "flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
          }
          to="/"
        >
          <span>Home</span>
        </NavLink>

        {curUser && curUser.uid === process.env.REACT_APP_ADMIN_UID && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "flex items-center border-b border-blue-800 px-2 font-sans text-sm font-normal text-blue-800 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
                : "flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
            }
            to="/dashboard"
          >
            <span>Dashboard</span>
          </NavLink>
        )}
        {curUser ? (
          <button
            className="flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
            onClick={logOut}
          >
            <span>Log Out</span>
          </button>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "flex items-center border-b border-blue-800 px-2 font-sans text-sm font-normal text-blue-800 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
                : "flex items-center border-b border-transparent px-2 font-sans text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:border-gray-700"
            }
            to="/login"
          >
            <span>Log In</span>
          </NavLink>
        )}
      </nav>
      <div className="flex h-full sm:hidden">
        <button
          className="flex items-center focus:outline-none focus-visible:ring"
          onClick={() => setMobileMenuOpen(true)}
        >
          <HiOutlineMenuAlt3 className="text-2xl text-gray-700" />
        </button>
        {mobileMenuOpen && (
          <>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="absolute left-0 top-0 z-10 h-full w-full bg-black/20 backdrop-blur-sm"
            ></div>
            <nav className="absolute right-0 top-0 z-20 flex w-56 -translate-x-3 translate-y-2 flex-col space-y-4 rounded-md bg-white py-4 px-5 pb-8 shadow-lg">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-1 right-1 flex items-center focus:outline-none focus-visible:ring"
              >
                <HiOutlineX className="text-2xl text-gray-600" />
              </button>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "border-l-2 border-transparent pl-2 text-base font-semibold text-blue-600 focus:outline-none focus-visible:border-blue-300"
                    : "border-l-2 border-transparent pl-2 text-base font-semibold text-gray-700 focus:outline-none focus-visible:border-blue-300"
                }
                to="/"
              >
                <span>Home</span>
              </NavLink>
              {curUser && curUser.uid === process.env.REACT_APP_ADMIN_UID && (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-l-2 border-transparent pl-2 text-base font-semibold text-blue-600 focus:outline-none focus-visible:border-blue-300"
                      : "border-l-2 border-transparent pl-2 text-base font-semibold text-gray-700 focus:outline-none focus-visible:border-blue-300"
                  }
                  to="/dashboard"
                >
                  <span>Dashboard</span>
                </NavLink>
              )}
              {curUser ? (
                <button
                  className="border-l-2 border-transparent pl-2 text-left text-base font-semibold text-gray-700 focus:outline-none focus-visible:border-blue-300"
                  onClick={logOut}
                >
                  <span>Log Out</span>
                </button>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-l-2 border-transparent pl-2 text-base font-semibold text-blue-600 focus:outline-none focus-visible:border-blue-300"
                      : "border-l-2 border-transparent pl-2 text-base font-semibold text-gray-700 focus:outline-none focus-visible:border-blue-300"
                  }
                  to="/login"
                >
                  <span>Log In</span>
                </NavLink>
              )}
            </nav>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
