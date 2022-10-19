import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

function TdButton(props) {
  const styles = {
    transform: `translateY(-${
      (props.arrLength - props.index) * props.trHeight
    }px)`,
  };

  return (
    <>
      <td className="py-2 px-3">
        <button
          onClick={props.showPopup}
          className="rounded-full focus:outline-none focus-visible:ring"
        >
          <HiOutlineDotsVertical className="text-lg text-gray-500" />
        </button>
        {props.popupOpen && (
          <div
            style={styles}
            className="absolute top-full right-4 z-20 flex w-24 flex-col items-stretch rounded border border-gray-200 bg-white py-1 shadow-md"
          >
            <Link
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring"
              to={`/articles/${props.id}`}
            >
              See post
            </Link>
            <button
              onClick={() => {
                props.closePopup();
                props.setEditedArticleId();
                props.scrollToSection();
              }}
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring"
            >
              Edit post
            </button>
            <button
              onClick={() => {
                props.setPostIdToDelete();
                props.closePopup();
              }}
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring"
            >
              Delete post
            </button>
          </div>
        )}
      </td>
    </>
  );
}

export default TdButton;
