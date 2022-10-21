import React from "react";
import { HiOutlineUserCircle, HiOutlineUser } from "react-icons/hi";

function Comment({ author, profilePicture, upload, content }) {
  const date = new Date(upload);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
  return (
    <article className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-x-3 gap-y-1.5 rounded px-4">
      {profilePicture ? (
        <div className="row-span-full">
          <img
            className="h-8 w-8 rounded-full"
            src={profilePicture}
            alt={`${author}'s avatar`}
          />
        </div>
      ) : (
        <div className="row-span-full flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-300">
          <HiOutlineUser className="text-xl text-blue-300" />
        </div>
      )}
      <p className="font-sans text-xs font-semibold text-gray-700">{author}</p>
      <p className="font-sans text-xs text-gray-600">{content}</p>
      <p className="justify-self-end font-sans text-[10px] text-gray-400/80">
        {formattedDate}
      </p>
    </article>
  );
}

export default Comment;
