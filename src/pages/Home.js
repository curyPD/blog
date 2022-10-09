import React from "react";

import ArticleCard from "../components/ArticleCard";

function Home() {
  return (
    <>
      <section className="pt-6 pb-14 pr-10">
        <div className="max-w-sm rounded-r bg-white px-4 pt-6 pb-8 shadow-sm">
          <h1 className="text-left font-serif text-3xl font-medium tracking-tight text-blue-900">
            Hop on, it's time to learn a foreign language.
          </h1>
        </div>
      </section>
      <section className="bg-white pt-8 pb-12">
        <div className="px-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-blue-400">
            articles
          </span>
          <h2 className="mb-10 font-serif text-xl font-medium text-gray-700">
            Find something interesting
          </h2>
        </div>
        <div className="container mx-auto grid grid-cols-1 justify-items-center gap-x-7 gap-y-9 px-4">
          <ArticleCard />
        </div>
      </section>
    </>
  );
}

export default Home;
