import React from "react";

import ArticleCard from "../components/ArticleCard";
import SecondaryHeading from "../components/SecondaryHeading";

function Home() {
  return (
    <>
      <section className="pb-16 pt-12 pr-10">
        <div className="max-w-sm rounded-r bg-white px-4 pt-8 pb-12 shadow-sm">
          <h1 className="text-left font-serif text-3xl font-medium tracking-tight text-gray-800">
            Hop on, it's time to learn a foreign language.
          </h1>
        </div>
      </section>
      <section className="bg-white pt-8 pb-12">
        <SecondaryHeading sText="articles" hText="Find something interesting" />
        <div className="container mx-auto grid grid-cols-1 justify-items-center gap-x-7 gap-y-9 px-4">
          <ArticleCard />
        </div>
      </section>
    </>
  );
}

export default Home;
