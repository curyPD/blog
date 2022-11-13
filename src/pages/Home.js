import React, { useEffect, useRef } from "react";

import { useArticles } from "../contexts/ArticlesContext";

import ArticleCard from "../components/ArticleCard";
import HeroSection from "../components/HeroSection";
import SecondaryHeading from "../components/SecondaryHeading";

function Home() {
  const { articles, setCurOpenArticleId } = useArticles();

  const postsSectionRef = useRef(null);

  useEffect(() => setCurOpenArticleId(""), [setCurOpenArticleId]);

  function scrollToPosts() {
    if (postsSectionRef?.current)
      postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

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
      <HeroSection
        sText="polyglot dream"
        hText="Hop on, it's time to learn a foreign language."
        pText="Hi, my name is Roman. Here I share what I know about language
        learning. Twice a year, maybe 😴."
        buttonText="Jump to articles"
        clickHandler={scrollToPosts}
      />
      <section
        className="bg-white pt-8 pb-20 md:pt-11 lg:pt-20 lg:pb-24 xl:pb-32 2xl:pb-36"
        id="articles"
        ref={postsSectionRef}
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
