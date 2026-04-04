import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Cards from "./components/courseCard";
import LaunchCourse from "./components/launchCourse";
import Signin from "./components/signin";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CourseDetials from "./components/courseDetail";

function App() {
  const [courses, setCourses] = useState([]);
  const [publishNewCourse, setPublishNewCourse] = useState(false);
  const [userSignIn, setUserSignin] = useState(
    localStorage.getItem("token") ? true : false,
  );
  const [role, setRole] = useState(
    userSignIn ? jwtDecode(localStorage.getItem("token")).userType : null,
  );

  useEffect(() => {
    if (!publishNewCourse && userSignIn) {
      fetch("http://localhost:3000/api/getAllCourse", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setCourses((prev) => [...response.courses]);
        });
    }
  }, [publishNewCourse, userSignIn]);

  return (
    <>
      <Navbar
        role={role}
        setUserSignin={setUserSignin}
        setCourses={setCourses}
      />
      {userSignIn || (
        <Signin setUserSignin={setUserSignin} role={role} setRole={setRole} />
      )}

      <div className="flex flex-col min-h-screen min-w-screen relative p-10 gap-10">
        {role === "user" ? null : (
          <button
            className="border border-slate-200 p-5 w-max rounded-lg"
            onClick={() => setPublishNewCourse(true)}
          >
            Publish New Course
          </button>
        )}
        {courses.map((course) => (
          <Cards
            title={course.title}
            description={course.description}
            price={course.price}
            id={course._id}
            key={course._id}
            thumbnail={course.thumbnail}
            setCourses={setCourses}
            role={role}
          />
        ))}
        {publishNewCourse && (
          <LaunchCourse
            setCourses={setCourses}
            setPublishNewCourse={setPublishNewCourse}
          />
        )}
      </div>
      {/* <LaunchCourse
        setCourses={setCourses}
        setPublishNewCourse={setPublishNewCourse}
      /> */}
      {/* <CourseDetials /> */}
    </>
  );
}

export default App;
