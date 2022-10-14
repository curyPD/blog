import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function ArticleCard(props) {
  let formattedDate;
  if (props.date) {
    const date = new Date(props.date);
    formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(date);
  }

  return (
    <article className="overflow-hidden rounded-lg shadow-md">
      <Link to={`/articles/${props.id}`}>
        <div className="overflow-hidden">
          <img
            src={props.image.url}
            alt={props.image.name?.slice(0, props.image.name?.indexOf("."))}
            className="h-40 w-full object-cover duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-5 pt-6">
        <Link to={`/articles/${props.id}`}>
          <h3 className="mb-3 font-serif text-xl font-medium leading-tight text-gray-700">
            {props.title}
          </h3>
        </Link>
        <p
          className="mb-4 font-serif text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></p>
        <div className="mb-3 text-right font-serif text-xs text-gray-500">
          <span>{formattedDate}</span>
        </div>
        <Link to={`/articles/${props.id}`}>
          <Button type="button" text="read" />
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
