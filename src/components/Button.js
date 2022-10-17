import React from "react";

function Button({ type, text, clickHandler, outline }) {
  const styles = outline
    ? "bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white"
    : "bg-blue-600 text-white hover:bg-blue-500 hover:border-blue-500";

  return (
    <button
      type={type}
      className={`w-full rounded-sm border border-blue-600 px-4 py-1 font-sans text-xs font-medium capitalize transition-colors focus:outline-none focus:ring focus:ring-offset-1 ${styles}`}
      onClick={clickHandler ? () => clickHandler() : undefined}
    >
      {text}
    </button>
  );
}

export default Button;
