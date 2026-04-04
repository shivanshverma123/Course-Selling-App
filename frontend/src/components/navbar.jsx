import { useState, useEffect } from "react";
import userLogo from "../assets/user.png";

export default function Navbar(props) {
  const [accountModelVisible, setAccountModelVisible] = useState(false);

  function logoutUser() {
    localStorage.removeItem("token");
    setAccountModelVisible(false);
    props.setUserSignin((prev) => false);
    props.setCourses([]);
  }

  return (
    <div className="flex flex-col md:flex-row p-8 gap-7 md:gap-10 items-center md:max-h-25 text-white bg-purple-400 rounded-sm w-full relative">
      <div className="flex flex-col md:flex-row md:flex-1 gap-7 md:gap-10  justify-center items-center ">
        <div>Home</div>
        <div>Courses</div>
        {props.role === "user" && (
          <div className="w-2/3 md:w-auto">Purchased Courses</div>
        )}
      </div>
      <div className="size-11 mr-2">
        <img
          src={userLogo}
          alt="userImage"
          onClick={() => setAccountModelVisible((prev) => !prev)}
        />
      </div>
      {accountModelVisible && (
        <div className="flex flex-col gap-3 p-3 border border-slate-200 bg-white text-black rounded-md absolute right-3 top-20 z-50">
          <div className="basis-2/3">Account</div>
          <div className="basis-2/3" onClick={logoutUser}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
