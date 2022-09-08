import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import RecentCard from "../components/RecentCard";
import ArticleCard from "../components/ArticleCard";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-blue-50 py-10 sm:py-16 xl:py-20">
        <div className="flex max-w-screen-xl flex-col gap-12 px-3 sm:px-6 md:px-12 lg:mx-auto lg:flex-row lg:items-start lg:justify-between xl:px-4">
          <div className="max-w-sm rounded-md bg-white px-7 py-8 shadow-md md:max-w-lg lg:mt-16 lg:max-w-md xl:max-w-lg">
            <h1 className="mb-5 font-sans text-2xl font-bold text-blue-900 sm:text-3xl md:text-4xl md:leading-tight">
              Hop on, it's time to learn a foreign language
            </h1>
            <p className="mb-6 font-serif text-sm text-gray-600 sm:text-base lg:text-lg">
              Hi, my name is Roman, and here I share my language learning
              journey. If you like learning new things, keep on reading.
            </p>
            <button className="group flex items-center gap-2 rounded font-serif text-lg font-medium text-blue-900 focus:outline-none focus:ring-2">
              See all articles
              <HiOutlineChevronDown className="transition-transform group-hover:translate-y-1" />
            </button>
          </div>

          <section className="hidden shrink-0 sm:block">
            <h3 className="mb-8 text-xl font-bold text-blue-900 md:text-2xl">
              Recent Posts
            </h3>
            <RecentCard />
            <RecentCard />
            <RecentCard />
          </section>
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section className="bg-white py-12 px-3 pb-16 md:py-14 md:px-6 md:pb-24">
        <h2 className="mb-10 text-center text-2xl font-bold text-blue-900 md:mb-12 md:text-3xl">
          Articles
        </h2>
        <div className="mx-auto grid grid-cols-1 items-start justify-items-center gap-x-6 gap-y-12 sm:max-w-2xl sm:grid-cols-2 sm:gap-y-16 md:gap-y-20 lg:max-w-5xl lg:grid-cols-3">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </section>
    </>
  );
}

export default Home;
