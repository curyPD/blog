import React from "react";
import { HiOutlineUser } from "react-icons/hi";

function Comment({ author, profilePicture, upload, content }) {
  const date = new Date(upload);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
  return (
    <article className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-x-3 gap-y-1.5 rounded px-4 md:gap-x-4  xl:gap-x-6">
      {profilePicture ? (
        <div className="row-span-full">
          <img
            className="h-8 w-8 rounded-full md:h-10 md:w-10 xl:h-12 xl:w-12"
            src={profilePicture}
            alt={`${author}'s avatar`}
          />
        </div>
      ) : (
        <div className="row-span-full flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 md:h-10 md:w-10 xl:h-12 xl:w-12">
          <HiOutlineUser className="text-xl text-blue-400 md:text-2xl xl:text-3xl" />
        </div>
      )}
      <p className="font-sans text-xs font-semibold text-gray-700 md:text-sm xl:text-base">
        {author}
      </p>
      <p className="font-sans text-xs text-gray-600 md:text-sm xl:text-base">
        {content}
      </p>
      <p className="justify-self-end font-sans text-[10px] text-gray-400/60 md:text-xs xl:text-sm">
        {formattedDate}
      </p>
    </article>
  );
}

export default Comment;
