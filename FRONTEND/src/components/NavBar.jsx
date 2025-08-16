import React from "react";
import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <div className="flex flex-row w-full px-4 py-6 shadow justify-between items-center">
      <Link to={"/"} className="text-2xl font-bold">
        <h1>URL Shortner</h1>
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          to={"/auth?mode=login"}
          className="font-semibold hover:text-blue-600 transition-colors"
        >
          Login
        </Link>
        <Link
          to={"/auth?mode=signup"}
          className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition-colors"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
