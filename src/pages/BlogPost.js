import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticles } from "../contexts/ArticlesContext";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Comment from "../components/Comment";

function BlogPost() {
  const [comment, setComment] = useState("");
  const { articleId } = useParams();
  const { articles, comments, addComment, setCurOpenArticleId } = useArticles();
  const { curUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurOpenArticleId(articleId);
  }, [articleId]);

  const curArticle = articles.find((article) => article.key === articleId);

  let formattedDate;
  if (curArticle?.upload) {
    const date = new Date(curArticle.upload);
    formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(date);
  }

  function handleChange(e) {
    setComment(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment) return;
    const now = new Date().toISOString();
    await addComment(
      curUser.displayName,
      curUser.photoURL,
      curUser.uid,
      comment,
      now,
      articleId
    );
  }

  const commentElements = comments.map((comment) => (
    <Comment
      author={comment.author}
      profilePicture={comment.profilePicture}
      upload={comment.upload}
      content={comment.content}
      key={comment.key}
    />
  ));

  return curArticle ? (
    <>
      <section className="bg-white pt-9 pb-7">
        <div className="mx-auto max-w-md px-5">
          <h1 className="mb-8 font-serif text-3xl font-medium text-gray-700">
            {curArticle.title}
          </h1>

          <p className="mb-2 text-right font-serif text-xs text-gray-500">
            {formattedDate}
          </p>

          <div className="mb-10">
            <img
              src={curArticle.image?.url}
              alt={curArticle.image?.name.slice(
                0,
                curArticle.image?.name?.indexOf(".")
              )}
            />
          </div>
          <div
            className="prose prose-sm prose-gray font-serif prose-headings:font-semibold prose-headings:text-gray-800"
            dangerouslySetInnerHTML={{ __html: curArticle.content }}
          ></div>
          <div className="mt-7 h-[1px] w-1/2 bg-blue-400"></div>
        </div>
      </section>
      <section className="bg-white pt-2 pb-20">
        <div className="mx-auto max-w-md px-5">
          {curUser && (
            <form onSubmit={handleSubmit}>
              <label
                className="mb-2 block font-serif text-base font-medium text-gray-700"
                htmlFor="comment"
              >
                Add a comment
              </label>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="4"
                className="mb-4 block w-full rounded border border-gray-300 bg-white py-2 px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                onChange={handleChange}
                value={comment}
                placeholder="Write something polite..."
              ></textarea>
              <Button type="submit" outline={true} text="comment" />
            </form>
          )}
          {comments.length !== 0 && (
            <div className="mt-11">
              <h4 className="mb-6 font-serif text-base font-medium text-gray-700">
                Comments
              </h4>
              <div className="space-y-4">{commentElements}</div>
            </div>
          )}
        </div>
      </section>
    </>
  ) : (
    <section className="min-h-screen bg-white py-9">
      <div className="mx-auto max-w-md animate-pulse px-5">
        <div className="mb-8 h-6 bg-gray-300">&nbsp;</div>
        <div className="mb-10 h-44 bg-gray-300">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300">&nbsp;</div>
      </div>
    </section>
  );
}

export default BlogPost;
