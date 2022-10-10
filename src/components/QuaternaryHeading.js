import React from "react";

function QuaternaryHeading({ children, text }) {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      {children}
      <h4 className="font-sans text-xs font-semibold text-gray-700">{text}</h4>
    </div>
  );
}

export default QuaternaryHeading;
