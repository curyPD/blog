import React from "react";

function QuaternaryHeading({ children, text }) {
  return (
    <div className="mb-3 flex items-center gap-1.5 lg:mb-4 lg:gap-2 xl:mb-6 xl:gap-3">
      {children}
      <h4 className="font-sans text-xs font-semibold text-gray-700 lg:text-sm xl:text-lg">
        {text}
      </h4>
    </div>
  );
}

export default QuaternaryHeading;
