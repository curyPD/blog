import React from "react";

import { useArticles } from "../contexts/ArticlesContext";

import ArticleCard from "../components/ArticleCard";
import PrimaryHeading from "../components/PrimaryHeading";
import SecondaryHeading from "../components/SecondaryHeading";

function Home() {
  const { articles } = useArticles();

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
      <section className="pb-16 pt-12">
        <PrimaryHeading text="Hop on, it's time to learn a foreign language." />
      </section>
      <section className="bg-white pt-8 pb-12" id="articles">
        <SecondaryHeading sText="articles" hText="Find something interesting" />
        <div className="container mx-auto grid grid-cols-1 gap-x-7 gap-y-9 px-4">
          {articleCards}
        </div>
      </section>
    </>
  );
}

export default Home;
