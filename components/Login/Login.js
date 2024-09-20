"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mockLogin = (username, password) => {
    const validUsername = "admin";
    const validPassword = "admin123";

    return username === validUsername && password === validPassword;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in both fields");
      return;
    }

    const isValid = mockLogin(username, password);
    if (isValid) {
      localStorage.setItem("username", username);
      window.location.href = "/home";
    } else {
      alert("Invalid login details");
    }
  };

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col text-lg font-medium items-center justify-center mx-auto ">
        <Image
          height={500}
          width={500}
          className="w-20 h-20"
          src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
          alt=""
        />
        DealsDray Online Pvt. Ltd.
      </div>

      <form className="mt-6" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
            >
              Forget Password?
            </a>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-2.5 text-sm font-bold tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
