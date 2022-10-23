import React from "react";

function PrimaryHeading({ text }) {
  return (
    <div className="mr-10 max-w-sm rounded-r bg-white px-4 pt-8 pb-12 shadow-sm sm:mr-0 sm:ml-6 sm:rounded sm:px-7 sm:pt-9 lg:ml-10 xl:max-w-lg xl:px-9 xl:pt-11 xl:pb-16 2xl:max-w-xl 2xl:px-12 2xl:pb-20 2xl:pt-14 2xl:shadow">
      <h1 className="text-left font-serif text-3xl font-medium tracking-tight text-gray-700 sm:text-4xl xl:text-5xl xl:leading-[1.1]">
        {text}
      </h1>
    </div>
  );
}

export default PrimaryHeading;
