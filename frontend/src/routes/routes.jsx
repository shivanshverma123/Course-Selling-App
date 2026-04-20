import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "../components/signin";
import { Navbar } from "../components/navbar";
import { Cards } from "../components/courseCard";
import { LaunchCourse } from "../components/launchCourse";

function Route(props) {
  const path = ["/", "/home", "/dashboard"];
  const adminPath = [
    "/launchCourse",
    "/home/launchCourse",
    "/dashboard/launchCourse",
  ];
  return (
    <>
      <BrowserRouter>
        <Routes element={Layout}>
          <Route path={"/signin"} element={Signin} mode={"signin"} />
          <Route path={"/signup"} element={Signin} mode={"signup"} />
          {path.map((path) => {
            <Route path={path} element={Cards} />;
          })}
          {adminPath.map((path) => {
            <Route path={path} element={LaunchCourse} />;
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {}
