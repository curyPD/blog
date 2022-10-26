import React, { useEffect } from "react";

import { useArticles } from "../contexts/ArticlesContext";

import ArticleCard from "../components/ArticleCard";
import PrimaryHeading from "../components/PrimaryHeading";
import SecondaryHeading from "../components/SecondaryHeading";

function Home() {
  const { articles, setCurOpenArticleId } = useArticles();

  useEffect(() => setCurOpenArticleId(""), [setCurOpenArticleId]);

  const articleCards = articles.map((article) => (
    <ArticleCard
      key={article.key}
      title={article.title}
      image={article.image}
      id={article.key}
      content={article.content}
      date={article.upload}
    />
  ));

  return (
    <>
      <section className="pb-16 pt-12 sm:pt-14 xl:pt-20 xl:pb-20 2xl:pt-24 2xl:pb-24">
        <div className="2xl:mx-auto 2xl:max-w-screen-2xl">
          <PrimaryHeading text="Hop on, it's time to learn a foreign language." />
        </div>
      </section>
      <section
        className="bg-white pt-8 pb-20 md:pt-11 lg:pt-20 lg:pb-24 xl:pb-32 2xl:pb-36"
        id="articles"
      >
        <SecondaryHeading sText="articles" hText="Find something interesting" />
        <div className="container mx-auto grid grid-cols-1 justify-items-center gap-x-7 gap-y-9 px-4 sm:gap-y-11 md:grid-cols-2 md:justify-items-stretch md:px-7 lg:gap-x-14 lg:gap-y-16 xl:max-w-screen-xl xl:grid-cols-3 xl:gap-y-20">
          {articleCards}
        </div>
      </section>
    </>
  );
}

export default Home;
