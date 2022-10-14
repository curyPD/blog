import React from "react";

function PrimaryHeading({ text }) {
  return (
    <div className="mr-10 max-w-sm rounded-r bg-white px-4 pt-8 pb-12 shadow-sm">
      <h1 className="text-left font-serif text-3xl font-medium tracking-tight text-gray-700">
        {text}
      </h1>
    </div>
  );
}

export default PrimaryHeading;
