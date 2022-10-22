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
      <td className="py-2 px-3 md:py-3 md:px-4 lg:py-3 lg:px-5 xl:px-6">
        <button
          onClick={props.showPopup}
          className="rounded-full focus:outline-none focus-visible:ring"
        >
          <HiOutlineDotsVertical className="text-lg text-gray-500 md:text-xl lg:text-2xl" />
        </button>
        {props.popupOpen && (
          <div
            style={styles}
            className="absolute top-full right-4 z-20 flex w-24 flex-col items-stretch rounded border border-gray-200 bg-white py-1 shadow-md md:w-28 xl:w-36"
          >
            <Link
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring md:px-4 md:py-2.5 md:text-sm xl:py-3 xl:px-5 xl:text-base"
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
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring md:px-4 md:py-2.5 md:text-sm xl:py-3 xl:px-5 xl:text-base"
            >
              Edit post
            </button>
            <button
              onClick={() => {
                props.setPostIdToDelete();
                props.closePopup();
              }}
              className="py-2 px-3 text-left text-xs text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring md:px-4 md:py-2.5 md:text-sm xl:py-3 xl:px-5 xl:text-base"
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
