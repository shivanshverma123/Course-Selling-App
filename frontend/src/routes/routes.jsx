import { useState, useRef, Children } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Signin from "../components/signin";
import Navbar from "../components/navbar";
import Cards from "../components/courseCard";
import LaunchCourse from "../components/launchCourse";
import LoadingSpinner from "../components/loadingSpinner";

function ProtectedRoute(props) {
  if (props.loading) {
    return <LoadingSpinner />;
  }

  if (!props.userSignIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}

function Routing(props) {
  const path = ["/", "/home", "/dashboard"];
  const adminPath = [
    "/launchCourse",
    "/home/launchCourse",
    "/dashboard/launchCourse",
  ];
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/signin"}
            element={
              <Signin
                mode={"signin"}
                setRole={props.setRole}
                setUserSignin={props.setUserSignin}
              />
            }
          />
          <Route
            path={"/signup"}
            element={
              <Signin
                mode={"signup"}
                setRole={props.setRole}
                setUserSignin={props.setUserSignin}
              />
            }
          />
          <Route
            element={
              <ProtectedRoute
                userSignIn={props.userSignIn}
                loading={props.loading}
              />
            }
          >
            <Route
              element={
                <Layout
                  setUserSignin={props.setUserSignin}
                  setCourses={props.setCourses}
                />
              }
            >
              {path.map((path) => {
                return (
                  <Route
                    path={path}
                    element={
                      <Cards role={props.role} userSignIn={props.userSignIn} />
                    }
                  />
                );
              })}
              {adminPath.map((path) => {
                return <Route path={path} element={<LaunchCourse />} />;
              })}
            </Route>
          </Route>
          <Route path={"*"} element={<div>404 not found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout(props) {
  return (
    <>
      <Navbar
        setUserSignin={props.setUserSignin}
        setCourses={props.setCourses}
      />
      <Outlet />
    </>
  );
}

export default Routing;
