import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function LogIn() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData(prevData => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      const userCredential = await logIn(inputData.email, inputData.password);
      if (userCredential.user.uid === "FHkXeKqFiNX6CEMoGInSoMiYelk2") {
        navigate("/dashboard");
        return;
      }
      if (userCredential.user) navigate("/");
    } catch (err) {
      setError("Failed to log in");
      console.error(err.message);
    }
  }

  return (
    <section className="p-5 pt-8 sm:pt-12 md:pt-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-3 max-w-xs rounded-lg bg-white px-6 py-5 shadow-lg sm:max-w-sm"
      >
        <h3 className="mb-4 font-serif text-base font-bold text-blue-900 sm:text-lg md:text-xl">
          Log In
        </h3>

        <label
          htmlFor="email"
          className="mb-2 block font-sans text-xs text-gray-600 sm:text-sm"
        >
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          value={inputData.email}
          className="placeholder:gray-400 mb-4 block w-full rounded-md border border-gray-300 bg-white  py-2 px-3 font-sans text-xs text-gray-700 shadow-sm invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="email"
          id="email"
          placeholder="myemail@gmail.com"
          autoComplete="email"
        />

        <label
          htmlFor="password"
          className="mb-2 block font-sans text-xs text-gray-600 sm:text-sm"
        >
          Password
        </label>
        <input
          onChange={handleChange}
          name="password"
          value={inputData.password}
          className="placeholder:gray-400 mb-4 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 font-sans text-xs text-gray-700 shadow-sm invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="password"
          id="password"
          placeholder="johny1234"
          minLength="8"
          autoComplete="current-password"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <HiOutlineExclamationCircle className="text-base" />
            <p className="font-sans text-sm">{error}</p>
          </div>
        )}
        <div className="mt-6 flex justify-start">
          <button className="rounded-md bg-blue-900 px-5 py-2 font-sans text-sm text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset-1 sm:text-base">
            Log In
          </button>
        </div>
        <Link
          to="/forgot-password"
          className="mt-4 inline-block font-sans text-xs text-blue-900 hover:underline"
        >
          Forgot password?
        </Link>
      </form>
      <p className="mx-auto max-w-xs text-center font-sans text-sm text-gray-500 sm:max-w-sm">
        Need an account?{" "}
        <Link className="text-blue-900 hover:underline" to="/signup">
          Sign Up
        </Link>
      </p>
    </section>
  );
}
