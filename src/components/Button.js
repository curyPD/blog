import React from "react";

function Button({ type, text, clickHandler, outline }) {
  const styles = outline
    ? "bg-transparent text-blue-700 hover:bg-blue-700 hover:text-white"
    : "bg-blue-700 text-white hover:bg-blue-600 hover:border-blue-600";

  return (
    <button
      type={type}
      className={`w-full rounded-sm border border-blue-700 px-4 py-0.5 font-sans text-xs font-medium capitalize transition-colors focus:outline-none focus:ring focus:ring-offset-1 sm:text-sm ${styles}`}
      onClick={clickHandler ? () => clickHandler() : undefined}
    >
      {text}
    </button>
  );
}

export default Button;
