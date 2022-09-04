import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { HiOutlineExclamationCircle } from "react-icons/hi";

function ForgotPassword() {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  function handleChange(e) {
    setInputData(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      await resetPassword(inputData);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to reset password");
      console.error(err.message);
    }
  }

  return (
    <section className="p-5 pt-8 sm:pt-12 md:pt-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-3 max-w-xs rounded-lg bg-white px-6 py-5 shadow-lg sm:max-w-sm"
      >
        <h3 className="mb-4 font-sans text-base font-bold text-blue-900 sm:text-lg md:text-xl">
          Reset Password
        </h3>

        <label
          htmlFor="email"
          className="mb-2 block font-serif text-xs text-gray-600 sm:text-sm"
        >
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          value={inputData}
          className="placeholder:gray-400 mb-4 block w-full rounded-md border border-gray-300 bg-white  py-2 px-3 font-serif text-xs text-gray-700 shadow-sm invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="email"
          id="email"
          placeholder="myemail@gmail.com"
          autoComplete="email"
        />

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <HiOutlineExclamationCircle className="text-base" />
            <p className="font-serif text-sm">{error}</p>
          </div>
        )}
        {message && (
          <div>
            <p className="font-serif text-sm text-green-600">{message}</p>
          </div>
        )}
        <div className="mt-6 flex justify-start">
          <button className="rounded-md bg-blue-900 px-5 py-2 font-serif text-sm text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset-1 sm:text-base">
            Reset Password
          </button>
        </div>
      </form>
      <p className="mx-auto max-w-xs text-center font-serif text-sm sm:max-w-sm">
        <Link className="text-blue-900 hover:underline" to="/login">
          Log In
        </Link>
      </p>
    </section>
  );
}

export default ForgotPassword;
