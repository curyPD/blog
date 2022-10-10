import React from "react";
import { HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router-dom";
import image from "../img/aaron-burden-QJDzYT_K8Xg-unsplash.jpg";
import Button from "./Button";

function ArticleCard() {
  // const date = new Date(data.date?.seconds * 1000);
  // const formattedDate = data.date
  //   ? new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "medium",
  //     }).format(date)
  //   : null;

  return (
    <article className="max-w-sm overflow-hidden rounded-lg shadow-md">
      <div>
        <img src={image} alt="" className="h-40 w-full object-cover" />
      </div>
      <div className="p-5 pt-6">
        <h3 className="mb-4 font-serif text-lg font-medium leading-tight text-gray-800">
          Best Japanese Learning Resources
        </h3>
        <p className="mb-6 font-serif text-sm text-gray-600">
          Perhaps the hardest part when starting to learn a new language is
          finding the right learning material
        </p>
        <Button type="button" text="read" />
      </div>
    </article>
  );
}

export default ArticleCard;
