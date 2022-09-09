import React from "react";
import image from "../img/aaron-burden-QJDzYT_K8Xg-unsplash.jpg";
import { HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router-dom";

function RecentCard({ data }) {
  return (
    <article className="mb-6 flex max-w-md gap-6 rounded-md bg-white p-4 pr-8 shadow-sm last:mb-0">
      <div className="w-32 shrink-0 overflow-hidden rounded-md">
        <img src={data.imageUrl} alt="" className="h-24 w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="mt-1 cursor-pointer font-sans text-base font-semibold leading-tight text-gray-800 transition-colors duration-200 hover:text-blue-700 md:text-lg md:leading-snug">
          <Link to="/">{data.title}</Link>
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
            className="ml-auto inline-block rounded bg-blue-900 py-2 px-5 font-serif text-sm text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset-1 xl:py-1"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RecentCard;
