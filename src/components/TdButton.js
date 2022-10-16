import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

function TdButton(props) {
  const [popupOpen, setPopupOpen] = useState(false);

  console.log(props.trHeight, props.index, props.arrLength);
  const styles = {
    transform: `translateY(-${
      (props.arrLength - props.index) * props.trHeight
    }px)`,
  };

  return (
    <>
      <td className="py-2 px-3">
        <button onClick={() => setPopupOpen((prev) => !prev)}>
          <HiOutlineDotsVertical className="text-lg text-gray-500" />
        </button>
        {popupOpen && (
          <div
            style={styles}
            className="absolute top-full right-4 z-20 flex w-24 flex-col items-stretch rounded border border-gray-100 bg-white py-1 shadow-md"
          >
            <Link
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100"
              to={`/articles/${props.id}`}
            >
              See post
            </Link>
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
