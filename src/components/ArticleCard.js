import React from "react";
import { HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router-dom";

function ArticleCard({ data, id }) {
  const date = new Date(data.date?.seconds * 1000);
  const formattedDate = data.date
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date)
    : null;

  return (
    <article className="overflow-hidden rounded-md bg-white shadow-lg">
      <Link to={`/articles/${id}`}>
        <div className="relative overflow-hidden">
          <img
            src={data.imageUrl}
            alt=""
            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5 pt-6">
        <h4 className="mb-3 font-serif text-lg font-bold leading-tight text-gray-800 md:text-xl md:leading-tight">
          {data.title}
        </h4>
        <p className="mb-6 font-sans text-sm leading-normal text-gray-500 md:text-base md:leading-normal">
          {data.preface}
        </p>
        <footer className="flex items-center gap-4">
          {formattedDate && (
            <p className="font-sans text-xs text-gray-400">{formattedDate}</p>
          )}
          <div className="flex items-center gap-1">
            <HiOutlineClock className="text-gray-400" />
            <p className="font-sans text-xs text-gray-400">
              <span>7</span> min
            </p>
          </div>
          <Link
            to={`/articles/${id}`}
            className="ml-auto inline-block rounded bg-blue-900 py-2 px-6 font-sans text-sm text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset-1 xl:py-1  xl:px-5 "
          >
            Read
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default ArticleCard;
