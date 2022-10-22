import React from "react";

function SecondaryHeading({ hText, sText }) {
  return (
    <div className="container mx-auto mb-10 px-4 text-center md:mb-12 md:px-7 md:text-left lg:mb-14 xl:max-w-screen-xl">
      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-blue-400 sm:text-xs lg:text-sm lg:font-extrabold">
        {sText}
      </span>
      <h2 className="font-serif text-xl font-medium text-gray-700 sm:text-2xl lg:text-3xl">
        {hText}
      </h2>
    </div>
  );
}

export default SecondaryHeading;
