import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function ArticleCard(props) {
  const date = new Date(props.date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);

  return (
    <article className="flex w-full max-w-xs flex-col overflow-hidden rounded-md shadow-md sm:max-w-sm md:max-w-none">
      <Link to={`/articles/${props.id}`} className="focus:outline-none">
        <div className="overflow-hidden">
          <img
            src={props.image?.url}
            alt={props.image?.name?.slice(0, props.image.name?.indexOf("."))}
            className="h-48 w-full object-cover duration-300 hover:scale-110 sm:h-52"
          />
        </div>
      </Link>
      <div className="flex h-full flex-col p-5 pt-6 sm:p-7">
        <Link to={`/articles/${props.id}`} className="focus:outline-none">
          <h3 className="mb-3 font-serif text-lg font-semibold leading-tight text-gray-800 sm:mb-4 sm:text-xl lg:mb-5 lg:text-2xl">
            {props.title}
          </h3>
        </Link>
        <p
          className="mb-5 flex-1 font-serif text-sm text-gray-600 line-clamp-3 sm:mb-7 sm:text-base lg:text-lg"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></p>
        <div className="mb-2.5 text-left font-serif text-xs text-gray-400 lg:mb-3 lg:text-sm">
          <span>{formattedDate}</span>
        </div>
        <Link to={`/articles/${props.id}`} className="group focus:outline-none">
          <Button type="button" text="read" />
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
