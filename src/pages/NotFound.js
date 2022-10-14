import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-2 text-center font-sans text-8xl font-semibold text-blue-200">
          404
        </h1>
        <h3 className="mb-6 text-center font-serif text-xl font-bold text-gray-700">
          Oops! Page not found
        </h3>
        <p className="mb-6 text-center font-serif text-sm font-medium text-gray-600">
          Sorry, the page you're looking for does not exist. Maybe we should go
          back home?
        </p>
        <div>
          <Link to="/">
            <Button type="button" text="go back home" outline={true} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
