import React from "react";
import image from "../img/aaron-burden-QJDzYT_K8Xg-unsplash.jpg";
import { HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router-dom";

function RecentCard(props) {
  return (
    <article className="mb-6 flex max-w-md gap-6 rounded-md bg-white p-4 pr-8 shadow-md last:mb-0">
      <div className="shrink-0">
        <img
          src={image}
          alt=""
          className="h-24 w-auto rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="mt-1 font-sans text-base font-normal leading-snug text-gray-700 md:text-lg md:leading-snug">
          How to learn a language in 6 months
        </h4>
        <div className="flex items-center gap-4">
          <p className="font-serif text-xs text-gray-400">Oct 12, 2022</p>
          <div className="flex items-center gap-1">
            <HiOutlineClock className="text-gray-400" />
            <p className="font-serif text-xs text-gray-400">
              <span>7</span> min
            </p>
          </div>
          <Link
            to="/"
            className="ml-auto inline-block rounded bg-blue-900 py-2 px-5 font-serif text-sm text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-offset-1 xl:py-1 "
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RecentCard;
