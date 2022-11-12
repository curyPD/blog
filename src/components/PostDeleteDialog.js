import React from "react";

import { HiOutlineX, HiOutlineExclamation } from "react-icons/hi";

function PostDeleteDialog(props) {
  return (
    <>
      <div
        className="absolute left-0 top-0 z-10 h-full w-full bg-black/20 backdrop-blur-sm"
        onClick={props.setPostIdToDelete}
      ></div>
      <div className="fixed top-1/2 left-1/2 z-30 w-5/6 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 shadow-lg lg:max-w-lg lg:p-6 xl:max-w-2xl xl:p-7">
        <button
          onClick={props.setPostIdToDelete}
          className="absolute top-2 right-2 flex items-center justify-center focus:outline-none focus-visible:ring xl:top-3 xl:right-3"
        >
          <HiOutlineX className="text-lg text-gray-700 lg:text-xl xl:text-2xl" />
        </button>
        <h5 className="mb-4 font-sans text-base font-medium text-gray-800 lg:mb-5 lg:text-lg xl:mb-6 xl:text-xl">
          Delete post
        </h5>
        <div className="mb-5 flex gap-2 rounded bg-red-100 py-2 px-3 text-red-800 lg:mb-6 lg:py-3 xl:mb-7">
          <HiOutlineExclamation className="shrink-0 text-lg lg:text-xl xl:text-2xl" />
          <p className="self-center text-xs font-medium lg:text-sm xl:text-base">
            After you delete a post, it cannot be undeleted.
          </p>
        </div>
        <p className="mb-7 text-xs text-gray-500 lg:text-sm xl:mb-8 xl:text-base">
          Post Id: <span className="text-gray-800">{props.postIdToDelete}</span>
        </p>
        <div className="flex items-center justify-end gap-2 lg:gap-3">
          <button
            className="rounded-sm bg-white py-1.5 px-3 font-sans text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-red-200 focus-visible:ring-offset-1 lg:text-sm xl:px-4 xl:text-base"
            onClick={props.setPostIdToDelete}
          >
            Cancel
          </button>
          <button
            className="rounded-sm bg-red-700 py-1.5 px-3 font-sans text-xs font-medium text-red-50 transition-colors hover:bg-red-800 focus:outline-none focus-visible:ring focus-visible:ring-red-200 focus-visible:ring-offset-1 lg:text-sm xl:px-4 xl:text-base"
            onClick={props.handleDeletePost}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default PostDeleteDialog;
