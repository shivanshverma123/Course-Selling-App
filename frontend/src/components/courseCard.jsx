import { useState, useEffect, useRef } from "react";
import closeIconLogo from "../assets/closeIcon.png";

export default function Cards(props) {
  const [deleteCourse, setDeleteCourse] = useState(false);

  async function deleteCourseRequest(e) {
    let response = await fetch(
      `http://localhost:3000/api/deleteCourse/${props.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    response = await response.json();
    props.setCourses([...response.courses]);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row p-5 w-auto h-auto border border-slate-300 gap-10 rounded-lg shadow-2xl hover:shadow-2xl/40 relative">
        {props.role === "admin" && (
          <button
            className="absolute z-10 top-3 right-5 h-5 w-5"
            onClick={() => setDeleteCourse(true)}
          >
            <img src={closeIconLogo} alt={"closeIcon"} />
          </button>
        )}
        <div className="basis-2/3 md:basis-2/5">
          <img
            src={`http://localhost:3000/thumbnails/${props.thumbnail}`}
            alt="courseThumbnail"
            className="rounded-lg w-auto max-h-[350px] w-auto md:max-w-[550px]"
          />
        </div>
        <div className="flex flex-col gap-3 md:gap-1 md:justify-between basis-1/3 md:basis-3/5 p-3">
          <div>{props.title}</div>
          <div>{props.description}</div>
          <div>{props.price}</div>
          <button className="border rounded-md h-auto md:h-1/10 text-white bg-sky-300 hover:bg-sky-600 drop-shadow-md/20 hover:drop-shadow-sm">
            Buy
          </button>
        </div>
        {deleteCourse && (
          <div
            className="absolute z-40 flex justify-center items-center inset-0 bg-black/30 rounded-lg"
            onClick={(e) => {
              setDeleteCourse(false);
            }}
          >
            <div
              className="flex flex-col border border-slate-200 rounded-lg  bg-white p-5 gap-5 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              Are you sure you want to delete this course? Clicking Yes will
              delete this course completely along with all it's component.
              <div className="flex gap-30 justify-center items-center">
                <button
                  className="border border-slate-200 rounded-md p-3 bg-sky-300 hover:bg-sky-500"
                  onClick={deleteCourseRequest}
                >
                  Accept
                </button>
                <button
                  className="border border-slate-200 rounded-md p-3 bg-red-300 hover:bg-red-500"
                  onClick={() => setDeleteCourse(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


