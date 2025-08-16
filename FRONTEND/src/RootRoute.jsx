import React from "react";
import { Outlet } from "@tanstack/react-router";
import NavBar from "./components/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
