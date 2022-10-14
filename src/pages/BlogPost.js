import React from "react";
import { useParams } from "react-router-dom";
import { useArticles } from "../contexts/ArticlesContext";

function BlogPost() {
  const { articleId } = useParams();
  const { articles } = useArticles();
  const curArticle = articles.find((article) => article.key === articleId);
  console.log(curArticle);
  let formattedDate;
  if (curArticle?.upload) {
    const date = new Date(curArticle.upload);
    formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(date);
  }

  return (
    <section className="bg-white py-9">
      <div className="mx-auto max-w-md px-5">
        {curArticle ? (
          <>
            <h1 className="mb-8 font-serif text-3xl font-medium text-gray-700">
              {curArticle.title}
            </h1>
            {formattedDate && (
              <p className="mb-2 text-right font-serif text-xs text-gray-500">
                {formattedDate}
              </p>
            )}
            <div className="mb-10">
              <img
                src={curArticle.image.url}
                alt={curArticle.image.name.slice(
                  0,
                  curArticle.image.name?.indexOf(".")
                )}
              />
            </div>
            <div
              className="prose prose-sm prose-gray font-serif prose-headings:font-semibold prose-headings:text-gray-800"
              dangerouslySetInnerHTML={{ __html: curArticle.content }}
            ></div>
          </>
        ) : (
          <div className="animate-pulse">
            <div className="mb-8 h-6 bg-gray-300">&nbsp;</div>
            <div className="mb-10 h-44 bg-gray-300">&nbsp;</div>
            <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
            <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
            <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
            <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
            <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPost;
