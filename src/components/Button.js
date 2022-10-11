import React from "react";

function Button({ type, text, clickHandler }) {
  return (
    <button
      type={type}
      className="w-full rounded-sm bg-blue-700 px-5 py-1.5 font-sans text-xs font-medium capitalize text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring focus:ring-offset-1 sm:text-sm"
      onClick={clickHandler ? () => clickHandler() : undefined}
    >
      {text}
    </button>
  );
}

export default Button;
