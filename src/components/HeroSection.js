import React from "react";

function HeroSection({ sText, hText, pText, buttonText, clickHandler }) {
  return (
    <section className="bg-white bg-gradient-to-t from-blue-50/70 py-12 md:py-14 lg:py-16 xl:py-24">
      <div className="px-4 text-center sm:px-9 md:container md:mx-auto md:text-left xl:max-w-screen-xl">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 sm:text-xs lg:text-sm lg:font-extrabold xl:mb-2">
          {sText}
        </p>
        <h1 className="mb-4 font-serif text-2xl font-semibold leading-tight text-gray-800 sm:text-3xl md:w-2/3 lg:mb-5 lg:w-1/2 lg:text-4xl xl:mb-8 xl:text-5xl">
          {hText}
        </h1>
        <p className="mb-5 text-xs text-gray-700 sm:text-sm md:w-2/3 lg:mb-6 lg:w-1/2 lg:text-base xl:mb-9 xl:text-lg">
          {pText}
        </p>
        <button
          onClick={clickHandler}
          className="rounded p-1 text-xs font-semibold text-blue-500 transition-colors hover:bg-blue-100/50 sm:text-sm xl:text-base"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
