import React from "react";
import { FcGoogle } from "react-icons/fc";

function GoogleAuthButton(props) {
  return (
    <div>
      <button
        onClick={props.handleClick}
        type="button"
        className="flex w-full items-center space-x-4 rounded-sm border border-gray-200 bg-gray-50 p-2 transition-colors hover:bg-gray-100 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 md:space-x-5"
      >
        <FcGoogle className="text-xl md:text-3xl" />
        <span className="font-sans text-xs text-gray-800 md:text-sm">
          Sign in with Google
        </span>
      </button>
      <div className="my-3 flex items-center gap-2 text-sm text-gray-300 before:h-[1px] before:flex-1 before:bg-gray-200 after:h-[1px] after:flex-1 after:bg-gray-200">
        or
      </div>
    </div>
  );
}

export default GoogleAuthButton;
