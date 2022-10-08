import React from "react";
import { useParams } from "react-router-dom";
// import { useFirestore } from "../contexts/FirestoreContext";

function BlogPost() {
  const { articleId } = useParams();

  const { articles } = useFirestore();

  const articleObj = articles.find(article => article.id === articleId);
  const article = articleObj?.data();
  console.log(article);

  const date = new Date(article.date?.seconds * 1000);
  const formattedDate = article.date
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date)
    : null;

  return (
    <article className="bg-white py-10 md:py-12 lg:py-14 xl:py-16">
      <div className="mx-auto mb-5 w-5/6 max-w-lg sm:px-6 md:max-w-screen-sm lg:w-auto lg:max-w-screen-md lg:px-8">
        <div className="mb-4 h-px w-52 bg-blue-300 md:w-72">&nbsp;</div>
        <h1 className="mb-5 font-serif text-2xl font-bold text-blue-900 md:mb-8 md:text-3xl lg:mb-10 lg:text-4xl">
          {article.title}
        </h1>
        <div className="mb-10 md:mb-14 lg:mb-16">
          {formattedDate && (
            <p className="mb-3 text-xs text-gray-400 md:text-sm">
              {formattedDate}
            </p>
          )}
          <img src={article.imageUrl} className="w-full" alt="Car" />
        </div>
        {/* <p className="text-lg md:text-xl">{article.preface}</p> */}
      </div>
      <section
        dangerouslySetInnerHTML={{ __html: article.content }}
        className="prose prose-sm prose-gray mx-auto w-5/6 max-w-lg sm:px-6 md:prose-base md:max-w-screen-sm lg:prose-lg lg:w-auto lg:max-w-screen-md lg:px-8"
      ></section>
      <div className="mx-auto mb-5 w-5/6 max-w-screen-sm sm:px-6 lg:w-auto lg:max-w-screen-md lg:px-8">
        <div className="mt-6 h-px w-52 bg-blue-300 md:w-72">&nbsp;</div>
      </div>
    </article>
  );
}

export default BlogPost;
