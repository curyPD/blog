import React from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../contexts/FirestoreContext";

function BlogPost() {
  const { articleId } = useParams();

  const { articles } = useFirestore();

  const articleObj = articles.find(article => article.id === articleId);
  const article = articleObj?.data();
  console.log(article);

  return (
    <article className="bg-white">
      {/* <div className="mx-auto w-5/6 max-w-screen-md"> */}
      <h1 className="mx-auto mb-7 w-5/6 max-w-screen-sm font-serif text-3xl font-bold text-blue-900">
        {article.title}
      </h1>
      <img
        src={article.imageUrl}
        alt="Image for this blog post"
        className="mx-auto mb-8 w-5/6 max-w-screen-sm"
      />
      <p className="mx-auto mb-5 w-5/6 max-w-screen-sm text-xl text-gray-600">
        {article.preface}
      </p>
      <section
        dangerouslySetInnerHTML={{ __html: article.content }}
        className="prose prose-lg prose-gray mx-auto max-w-screen-sm prose-headings:font-serif prose-headings:text-blue-900"
      ></section>
      {/* </div> */}
    </article>
  );
}

export default BlogPost;
