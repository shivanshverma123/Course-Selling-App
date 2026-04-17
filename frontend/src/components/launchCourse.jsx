import { useState } from "react";
import addDetail from "../assets/addDetail.png";
import closeIcon from "../assets/closeIcon.png";
import leftArrowIcon from "../assets/leftArrowIcon.png";
import rightArrowIcon from "../assets/rightArrowIcon.png";

export default function LaunchCourse(props) {
  const [courseDetail, setCourseDetail] = useState({
    id: `${Date.now()}`,
    title: "",
    description: "",
    price: "",
    details: [
      { id: Date.now(), topic: "", topicDetails: "" },
      { duration: "" },
      {
        instructors: [
          { id: crypto.randomUUID(), name: "", description: "", dpfile: "" },
        ],
      },
    ],
  });

  const [sections, setSections] = useState(1);

  async function submitForm(e) {
    e.preventDefault();
    let formData = new FormData();

    let fileInput = e.target.CourseThumbnail;
    let file = fileInput.files[0];

    formData.append("title", courseDetail.title);
    formData.append("description", courseDetail.description);
    formData.append("price", courseDetail.price);
    formData.append("details", JSON.stringify(courseDetail.details));
    formData.append("thumbnailFile", file);
    courseDetail.details.forEach((det) => {
      if (det.instructors) {
        det.instructors.forEach((ins) => {
          if (ins.name) {
            let ext = ins.dpfile.name.split(".").pop();
            formData.append("instructorDp", ins.dpfile, `${ins.id}.${ext}`);
          }
        });
      }
    });

    let response = await fetch("http://localhost:3000/api/create-new-course", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    console.log("formData Response:-", response);
    props.setCourses((prev) => [...prev, courseDetail]);
    props.setPublishNewCourse(false);
  }

  return (
    <>
      <div
        className="absolute flex justify-center items-center bg-gradient backdrop-blur-sm inset-0 p-10"
        onClick={() => {
          props.setPublishNewCourse(false);
        }}
      >
        <div
          className="border border-slate-300 p-10 bg-white rounded-lg shadow-lg/30 max-h-[90vh] max-w-[65vh] overflow-y-auto"
          id="mainCard"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            className="flex flex-col gap-10 h-full items-center md:items-stretch"
            onSubmit={submitForm}
          >
            <div className="text-3xl font-semibold mx-auto font-medium mb-10">
              Launch New Course
            </div>

            {/* Course Description and Price ----------- Section-1  */}

            {sections == 1 && (
              <>
                <label
                  className="flex flex-col md:flex-row justify-center items-center gap-5 bg-red-500 p-3 text-white rounded-lg w-2/3"
                  htmlFor={"fileUpload"}
                >
                  Choose File To Upload
                  <input
                    type={"file"}
                    className="border border-slate-200 font-light font-medium rounded-lg hidden"
                    id="fileUpload"
                    name="CourseThumbnail"
                  />
                </label>

                <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
                  Course Title :
                  <input
                    type={"text"}
                    className="border border-slate-200 font-light rounded-lg flex-1 p-2"
                    onChange={(e) =>
                      setCourseDetail((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
                  Course Description :
                  <textarea
                    className="border border-slate-200 font-light md:h-30 md:w-70 rounded-lg flex-1 p-3"
                    onChange={(e) =>
                      setCourseDetail((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter description of you course"
                  ></textarea>
                </label>
                <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
                  Course Price :
                  <input
                    type={"text"}
                    className="border border-slate-200 font-light rounded-lg p-2"
                    onChange={(e) =>
                      setCourseDetail((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                </label>
              </>
            )}

            {/* Course Detail -------- Section-2 */}

            {sections == 2 && (
              <div
                className="flex justify-center items-center gap-10 bg-slate-900 rounded-xl p-3 h-auto text-md text-white"
                onClick={() => {
                  let id = Date.now();
                  setCourseDetail((prev) => ({
                    ...prev,
                    details: [
                      ...prev.details,
                      { id: id, topic: "", topicDetails: "" },
                    ],
                  }));
                }}
              >
                Add Course Details
                <img
                  src={addDetail}
                  alt={"addCourseDetails"}
                  className="h-7 w-7 rounded-lg"
                />
              </div>
            )}
            {sections == 2 ? (
              courseDetail.details.length > 0 ? (
                courseDetail.details.map((detail) => (
                  <AddDetail
                    key={detail.id}
                    id={detail.id}
                    setCourseDetail={setCourseDetail}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center min-w-[55vh] border border-slate-200 rounded-lg p-10 relative">
                  Please Add Course Details.
                </div>
              )
            ) : null}

            {/* Course Instructor and Duration Detail -------- Section-3  */}
            {sections == 3 && (
              <AddAdditionalDetail
                courseDetail={courseDetail}
                setCourseDetail={setCourseDetail}
              />
            )}
            {/* Fixed Controller Buttons -------------- */}

            <div className="flex flex-row justify-between">
              <button
                type="button"
                onClick={() =>
                  setSections((prev) => (prev !== 1 ? prev - 1 : prev))
                }
              >
                <img
                  src={leftArrowIcon}
                  alt={"leftArrowIcon"}
                  className="size-7"
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSections((prev) => (prev !== 3 ? prev + 1 : prev))
                }
              >
                <img
                  src={rightArrowIcon}
                  alt={"rightArrowIcon"}
                  className="size-7"
                />
              </button>
            </div>
            <button className="border border-slate-200 p-2 rounded-lg bg-purple-300 hover:bg-purple-500">
              Publish Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function AddDetail(props) {
  function deleteDetails() {
    props.setCourseDetail((prev) => ({
      ...prev,
      details: prev.details.filter((det) => {
        if (det.id !== props.id) {
          return det;
        }
      }),
    }));
  }

  return (
    <div className="flex flex-col gap-10 h-fit border border-slate-200 rounded-lg p-5 pt-10 relative">
      <button
        type="button"
        className="absolute top-2 right-1"
        onClick={deleteDetails}
      >
        <img src={closeIcon} alt="closeIcon" className="rounded-2xl h-5 w-5" />
      </button>
      <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
        Detail Title:-
        <input
          type={"text"}
          className="border border-slate-200 font-light rounded-lg flex-1 p-2"
          onChange={(e) =>
            props.setCourseDetail((prev) => ({
              ...prev,
              details: prev.details.map((det) => {
                if (det.id === props.id) {
                  return { ...det, topic: e.target.value };
                }
                return det;
              }),
            }))
          }
        />
      </label>
      <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
        Detail Description:-
        <textarea
          placeholder="If you are entering topics please seperate those topics by commas or paragraph description will work fine as well."
          className="border border-slate-200 font-light md:h-30 md:w-70 rounded-lg flex-1 p-3"
          onChange={(e) =>
            props.setCourseDetail((prev) => ({
              ...prev,
              details: prev.details.map((det) => {
                if (det.id === props.id) {
                  return { ...det, topicDetails: e.target.value };
                }
                return det;
              }),
            }))
          }
        ></textarea>
      </label>
    </div>
  );
}

function AddAdditionalDetail(props) {
  function addInstructors() {
    props.setCourseDetail((prev) => {
      return {
        ...prev,
        details: prev.details.map((det) => {
          if (det.instructors) {
            return {
              ...det,
              instructors: [
                ...det.instructors,
                { id: crypto.randomUUID(), name: "", description: "" },
              ],
            };
          }
          return det;
        }),
      };
    });
  }

  return (
    <>
      <div className="flex flex-col gap-10 p-5">
        <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
          Course Duration (In hrs) :
          <input
            type={"text"}
            className="border border-slate-200 font-light rounded-lg flex-1 p-2"
            onChange={(e) =>
              setCourseDetail((prev) => ({
                ...prev,
                details: prev.details.map((det) => {
                  if (det.duration) {
                    return {
                      ...det,
                      duration: e.target.value,
                    };
                  }
                  return det;
                }),
              }))
            }
          />
        </label>
        <div
          className="flex justify-center items-center gap-10 bg-slate-900 rounded-xl p-3 h-auto text-md text-white"
          onClick={addInstructors}
        >
          Add Instructor Details
          <img
            src={addDetail}
            alt={"addCourseDetails"}
            className="h-7 w-7 rounded-lg"
          />
        </div>
        {props.courseDetail.details.map((det) => {
          if (det.instructors) {
            return det.instructors.map((inst) => {
              return (
                <InstructorDetail
                  key={inst.id}
                  id={inst.id}
                  setCourseDetail={props.setCourseDetail}
                />
              );
            });
          }
          return null;
        })}
      </div>
    </>
  );
}

function InstructorDetail(props) {
  function saveInstructorDp(e) {
    props.setCourseDetail((prev) => {
      let dp = e.target.files[0];
      return {
        ...prev,
        details: prev.details.map((det) => {
          if (det.instructors) {
            return {
              ...det,
              instructors: det.instructors.map((ins) => {
                if (ins.id === props.id) {
                  return {
                    ...ins,
                    dpfile: dp,
                  };
                }
                return ins;
              }),
            };
          }
          return det;
        }),
      };
    });
  }

  function saveInstructorName(e) {
    props.setCourseDetail((prev) => {
      return {
        ...prev,
        details: prev.details.map((det) => {
          if (det.instructors) {
            return {
              ...det,
              instructors: det.instructors.map((ins) => {
                if (ins.id === props.id) {
                  return {
                    ...ins,
                    name: e.target.value,
                  };
                }
                return ins;
              }),
            };
          }
          return det;
        }),
      };
    });
  }

  function saveInstructorDescription(e) {
    props.setCourseDetail((prev) => {
      return {
        ...prev,
        details: prev.details.map((det) => {
          if (det.instructors) {
            return {
              ...det,
              instructors: det.instructors.map((ins) => {
                if (ins.id === props.id) {
                  return {
                    ...ins,
                    description: e.target.value,
                  };
                }
                return ins;
              }),
            };
          }
          return det;
        }),
      };
    });
  }

  function deleteInstructorDetail(e) {
    props.setCourseDetail((prev) => {
      return {
        ...prev,
        details: prev.details.map((det) => {
          if (det.instructors) {
            return {
              ...det,
              instructors: det.instructors.filter((ins) => ins.id !== props.id),
            };
          }
          return det;
        }),
      };
    });
  }

  return (
    <div className="flex flex-col gap-10 p-5 pt-13 border border-slate-200 rounded-lg w-auto relative">
      <button
        type="button"
        className="absolute top-3 right-3"
        onClick={deleteInstructorDetail}
      >
        <img src={closeIcon} alt="closeIcon" className="rounded-2xl h-5 w-5" />
      </button>
      <label
        className="flex flex-col md:flex-row justify-center items-center gap-5 bg-red-500 p-3 text-white rounded-lg"
        htmlFor={"dpUpload"}
      >
        Choose dp To Upload
        <input
          type={"file"}
          className="border border-slate-200 font-light font-medium rounded-lg hidden"
          id="dpUpload"
          name="InstructorThumbnail"
          onChange={saveInstructorDp}
        />
      </label>
      <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
        Instructor Name :
        <input
          type={"text"}
          className="border border-slate-200 font-light rounded-lg flex-1 p-2"
          onChange={saveInstructorName}
        />
      </label>
      <label className="flex flex-col md:flex-row gap-5 items-center font-medium">
        Detail Description:-
        <textarea
          placeholder="Enter Instructor Bio"
          className="border border-slate-200 font-light md:h-30 md:w-70 rounded-lg flex-1 p-3"
          onChange={saveInstructorDescription}
        ></textarea>
      </label>
    </div>
  );
}
