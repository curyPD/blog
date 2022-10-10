import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { HiOutlineExclamationCircle } from "react-icons/hi";

import Button from "../components/Button";

function SignUp() {
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { signUp, updateUserName } = useAuth();

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
    if (
      !inputData.userName ||
      !inputData.email ||
      !inputData.password ||
      !inputData.confirmPassword
    ) {
      setError("Please fill out all fields");
      return;
    }
    if (inputData.password !== inputData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      const userCredential = await signUp(inputData.email, inputData.password);
      await updateUserName(userCredential.user, inputData.userName);
    } catch (err) {
      setError("Failed to sign up");
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
          Sign Up
        </h3>

        <label
          htmlFor="name"
          className="mb-1 block font-sans text-xs text-gray-700 sm:text-sm"
        >
          Name
        </label>
        <input
          onChange={handleChange}
          name="userName"
          value={inputData.userName}
          className="mb-4 block w-full rounded-sm border border-gray-300 bg-white py-2  px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 invalid:border-red-500 invalid:text-red-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="text"
          id="name"
          placeholder="John Smith"
          autoComplete="name"
        />

        <label
          htmlFor="email"
          className="mb-1 block font-sans text-xs text-gray-700 sm:text-sm"
        >
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          value={inputData.email}
          className="mb-4 block w-full rounded-sm border border-gray-300 bg-white py-2  px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 invalid:border-red-500 invalid:text-red-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="email"
          id="email"
          placeholder="myemail@gmail.com"
          autoComplete="email"
        />

        <label
          htmlFor="password"
          className="mb-1 block font-sans text-xs text-gray-700 sm:text-sm"
        >
          Password
        </label>
        <input
          onChange={handleChange}
          name="password"
          value={inputData.password}
          className="mb-4 block w-full rounded-sm border border-gray-300 bg-white py-2 px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 invalid:border-red-500 invalid:text-red-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="password"
          id="password"
          placeholder="johny1234"
          minLength="8"
          autoComplete="new-password"
        />

        <label
          htmlFor="confirm-password"
          className="mb-1 block font-sans text-xs text-gray-700 sm:text-sm"
        >
          Confirm password
        </label>
        <input
          onChange={handleChange}
          name="confirmPassword"
          value={inputData.confirmPassword}
          className="mb-4 block w-full rounded-sm border border-gray-300 bg-white py-2 px-3 font-sans text-xs text-gray-700 shadow-sm placeholder:text-gray-300 invalid:border-red-500 invalid:text-red-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:invalid:border-gray-300 focus:invalid:text-gray-700 sm:text-sm"
          type="password"
          id="confirm-password"
          placeholder="johny1234"
          minLength="8"
          autoComplete="new-password"
        />

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <HiOutlineExclamationCircle className="text-base" />
            <p className="font-sans text-xs">{error}</p>
          </div>
        )}

        <div className={error ? "mt-4" : "mt-6"}>
          <Button type="submit" text="sign up" />
        </div>
      </form>
      <p className="mx-auto max-w-xs text-center font-sans text-xs text-gray-500 sm:max-w-sm">
        Already have an account?{" "}
        <Link className="text-blue-700 hover:underline" to="/login">
          Log In
        </Link>
      </p>
    </section>
  );
}

export default SignUp;
