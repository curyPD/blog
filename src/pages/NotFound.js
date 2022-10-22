import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="py-14">
      <div className="mx-auto w-5/6 max-w-lg rounded-md bg-white px-4 py-5 md:px-8 xl:px-12">
        <h1 className="mb-3 text-center font-serif text-8xl font-bold text-gray-300">
          404
        </h1>
        <h3 className="mb-5 text-center font-serif text-xl font-bold text-gray-600">
          Oops! Page not found
        </h3>
        <p className="mb-10 text-center font-serif text-sm font-medium text-gray-500">
          Sorry, the page you're looking for does not exist. Maybe we should go
          back home?
        </p>
        <div>
          <Link to="/" className="group focus:outline-none">
            <Button type="button" text="go back home" outline={true} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
