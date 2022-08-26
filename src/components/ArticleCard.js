import React from "react";
import image from "../img/aaron-burden-QJDzYT_K8Xg-unsplash.jpg";
import { HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router-dom";

function ArticleCard(props) {
  return (
    <article className="max-w-xs overflow-hidden rounded-md bg-white shadow-lg sm:w-72">
      <div>
        <img
          src={image}
          alt="books on a desk"
          className="h-44 w-full object-cover"
        />
      </div>
      <div className="p-5 pt-6">
        <h4 className="mb-3 font-sans text-lg font-normal leading-tight text-gray-700 md:text-xl md:leading-tight">
          How to learn a language in 6 months
        </h4>
        <p className="mb-6 font-serif text-sm leading-normal text-gray-600 md:text-base md:leading-normal">
          You might have seen a title like that somewhere on Youtube, but are
          you sure it's the right question to ask?
        </p>
        <footer className="flex items-center gap-4">
          <p className="font-serif text-xs text-gray-400">Oct 12, 2022</p>
          <div className="flex items-center gap-1">
            <HiOutlineClock className="text-gray-400" />
            <p className="font-serif text-xs text-gray-400">
              <span>7</span> min
            </p>
          </div>
          <Link
            to="/"
            className="ml-auto inline-block rounded bg-blue-900 py-2 px-6 font-serif text-sm text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-offset-1 xl:py-1  xl:px-5 "
          >
            Read
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default ArticleCard;
