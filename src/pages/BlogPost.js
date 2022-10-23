import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticles } from "../contexts/ArticlesContext";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Comment from "../components/Comment";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

function BlogPost() {
  const [comment, setComment] = useState("");
  const { articleId } = useParams();
  const {
    articles,
    comments,
    addComment,
    setCurOpenArticleId,
    addLike,
    unlike,
  } = useArticles();
  const { curUser } = useAuth();

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
    try {
      e.preventDefault();
      if (!comment) return;
      const now = new Date().toISOString();
      await addComment(
        curUser.displayName,
        curUser.photoURL,
        curUser.uid,
        comment,
        now
      );
      setComment("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddLike() {
    try {
      await addLike(curUser.uid);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUnlike() {
    try {
      await unlike(curUser.uid);
    } catch (err) {
      console.error(err);
    }
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
      <section className="bg-white pt-9 pb-7 md:pt-12 md:pb-9 lg:pt-16 xl:py-20 xl:pb-16">
        <div className="mx-auto w-11/12 max-w-lg px-5 sm:max-w-xl md:w-full lg:max-w-2xl xl:max-w-3xl">
          <h1 className="mb-8 font-serif text-3xl font-medium text-gray-700 lg:text-4xl xl:mb-10 xl:text-5xl xl:leading-[1.1]">
            {curArticle.title}
          </h1>

          <p className="mb-2 text-right font-serif text-xs text-gray-500 sm:mb-3 md:mb-4 md:text-sm">
            {formattedDate}
          </p>

          <div className="mb-10 sm:mb-12 lg:mb-14">
            <img
              src={curArticle.image?.url}
              alt={curArticle.image?.name.slice(
                0,
                curArticle.image?.name?.indexOf(".")
              )}
              className="w-full"
            />
          </div>
          <div
            className="prose prose-sm prose-gray mb-4 font-serif prose-headings:font-semibold prose-headings:text-gray-800 sm:prose-base lg:prose-lg lg:mb-6 xl:prose-xl"
            dangerouslySetInnerHTML={{ __html: curArticle.content }}
          ></div>

          <div className="flex items-center justify-end gap-1.5 sm:justify-start md:gap-2 xl:gap-2.5">
            <button
              disabled={!curUser}
              onClick={
                curArticle.likes?.[curUser?.uid] ? handleUnlike : handleAddLike
              }
              className={`rounded-full focus:outline-none focus-visible:ring focus-visible:ring-offset-1 ${
                !curUser
                  ? "relative after:pointer-events-none after:invisible after:absolute after:top-1/2 after:left-full after:w-28 after:translate-x-1 after:rounded after:border after:border-gray-200 after:bg-gray-800/80 after:p-1 after:text-center after:text-[10px] after:text-white after:opacity-0 after:shadow-sm after:transition-all after:content-['Log_in_to_leave_a_like'] hover:after:visible hover:after:-translate-y-1/2 hover:after:opacity-100"
                  : ""
              }`}
            >
              {!curUser || !curArticle.likes?.[curUser?.uid] ? (
                <HiOutlineHeart className="text-2xl text-blue-400 md:text-3xl xl:text-4xl" />
              ) : (
                <HiHeart className="text-2xl text-blue-400 md:text-3xl xl:text-4xl" />
              )}
            </button>
            <p className="text-xs text-gray-400 md:text-sm xl:text-base">
              {curArticle.likes ? Object.keys(curArticle.likes).length : 0}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white pt-2 pb-20 lg:pb-24 xl:pb-36">
        <div className="mx-auto w-11/12 max-w-lg px-5 sm:max-w-xl md:w-full lg:max-w-2xl xl:max-w-3xl">
          {curUser && (
            <form onSubmit={handleSubmit}>
              <label
                className="mb-2 block font-serif text-base font-medium text-gray-700 sm:mb-3 sm:text-lg md:mb-4 md:text-xl xl:text-2xl"
                htmlFor="comment"
              >
                Add a comment
              </label>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="4"
                className="mb-4 block w-full rounded border border-gray-300 bg-white py-2 px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:mb-5 sm:text-sm lg:text-base"
                onChange={handleChange}
                value={comment}
                placeholder="Write something polite..."
              ></textarea>
              <Button type="submit" outline={true} text="comment" />
            </form>
          )}
          {comments.length !== 0 && (
            <div className="mt-11 sm:mt-14">
              <h4 className="mb-6 font-serif text-base font-medium text-gray-700 sm:mb-7 sm:text-lg md:mb-9 md:text-xl xl:text-2xl">
                Comments
              </h4>
              <div className="space-y-4 md:space-y-5 xl:space-y-6">
                {commentElements}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  ) : (
    <section className="min-h-screen bg-white py-9 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-md animate-pulse px-5 md:max-w-2xl lg:max-w-3xl">
        <div className="mb-8 h-6 bg-gray-300 lg:mb-10">&nbsp;</div>
        <div className="mb-10 h-44 bg-gray-300 lg:mb-14 lg:h-72">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300 lg:mb-4 lg:h-3.5">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300 lg:mb-4 lg:h-3.5">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300 lg:mb-4 lg:h-3.5">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300 lg:mb-4 lg:h-3.5">&nbsp;</div>
        <div className="mb-3 h-3 bg-gray-300 lg:mb-4 lg:h-3.5">&nbsp;</div>
      </div>
    </section>
  );
}

export default BlogPost;
