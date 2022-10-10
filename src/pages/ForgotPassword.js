import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import Button from "../components/Button";

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
    if (!inputData) {
      setError("Plese enter your email");
      return;
    }
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
    <section className="mb-7 px-4 py-8 sm:pt-12 md:pt-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-3 max-w-xs rounded-md bg-white px-5 py-5 shadow-md sm:max-w-sm"
      >
        <h3 className="mb-4 font-sans text-lg font-semibold text-gray-800 sm:text-lg md:text-xl">
          Reset Password
        </h3>

        <label
          htmlFor="email"
          className="mb-1 block font-sans text-xs text-gray-700 sm:text-sm"
        >
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          value={inputData}
          className="mb-4 block w-full rounded-sm border border-gray-300 bg-white py-2  px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 invalid:border-red-500 invalid:text-red-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="email"
          id="email"
          placeholder="myemail@gmail.com"
          autoComplete="email"
        />

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <HiOutlineExclamationCircle className="text-base" />
            <p className="font-sans text-xs">{error}</p>
          </div>
        )}

        {message && (
          <div className="flex items-start gap-2 text-green-600">
            <HiOutlineCheckCircle className="text-base" />
            <p className="font-sans text-xs">{message}</p>
          </div>
        )}

        <div className={error ? "mt-4" : "mt-6"}>
          <Button type="submit" text="reset password" />
        </div>
      </form>
      <p className="mx-auto max-w-xs text-center font-sans text-xs sm:max-w-sm">
        <Link className="text-blue-700 hover:underline" to="/login">
          Log In
        </Link>
      </p>
    </section>
  );
}

export default ForgotPassword;
