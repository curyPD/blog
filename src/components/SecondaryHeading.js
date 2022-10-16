import React from "react";

function SecondaryHeading({ hText, sText }) {
  return (
    <div className="container mx-auto px-4 text-center">
      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-blue-400">
        {sText}
      </span>
      <h2 className="mb-10 font-serif text-xl font-medium text-gray-700">
        {hText}
      </h2>
    </div>
  );
}

export default SecondaryHeading;
