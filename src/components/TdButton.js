import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
function TdButton() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <td className="relative py-2 px-3">
        <button onClick={() => setPopupOpen((prev) => !prev)}>
          <HiOutlineDotsVertical className="text-lg text-gray-500" />
        </button>
        {popupOpen && (
          <div className="absolute top-1/2 right-full z-20 flex w-24 flex-col items-stretch rounded border border-gray-100 bg-white py-1 shadow-md">
            <button className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100">
              Edit post
            </button>
            <button className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100">
              Delete post
            </button>
          </div>
        )}
      </td>
    </>
  );
}

export default TdButton;
