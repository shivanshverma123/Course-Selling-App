import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import showPasswordLogo from "../assets/showPassword.png";
import hidePasswordLogo from "../assets/hidePassword.png";
import { useNavigate, Link } from "react-router-dom";

import { api } from "../App";

function Signin(props) {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    email: "",
    username: "",
    password: "",
    userType: "admin",
  });

  const [schemaValidationError, setSchemaValidationError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // const [signinFlag, setSigninFlag] = useState(true);
  const signinFlag = props.mode === "signin";
  const [signInFailed, setSignInFailed] = useState({});
  const [signUpFailed, setSignUpFailed] = useState({});

  let timer = useRef({
    emailTimer: null,
    usernameTimer: null,
    passwordTimer: null,
  });

  let signupSchema = z.object({
    email: z.email(),
    username: z.string().min(4, "Username should be atleast 4 character long."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[0-9]/, "Password must contain atLeast one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain atLeast one special character.",
      ),
  });

  function setUserEmail(e) {
    clearTimeout(timer.current.emailTimer);
    setUserDetail((prev) => ({
      ...prev,
      email: e.target.value,
    }));

    timer.current.emailTimer = setTimeout(() => {
      let emailValidation = signupSchema.shape.email.safeParse(e.target.value);
      if (!emailValidation.success) {
        let errorMessage = z.flattenError(emailValidation.error).formErrors[0];
        setSchemaValidationError((prev) => ({
          ...prev,
          email: errorMessage,
        }));
      } else {
        setSchemaValidationError((prev) => ({ ...prev, email: "" }));
      }
    }, 800);
  }

  function setUserName(e) {
    clearTimeout(timer.current.usernameTimer);
    setUserDetail((prev) => ({
      ...prev,
      username: e.target.value,
    }));

    timer.current.usernameTimer = setTimeout(() => {
      let usernameValidation = signupSchema.shape.username.safeParse(
        e.target.value,
      );

      if (!usernameValidation.success) {
        let errorMessage = z.flattenError(usernameValidation.error)
          .formErrors[0];
        setSchemaValidationError((prev) => ({
          ...prev,
          username: errorMessage,
        }));
      } else {
        setSchemaValidationError((prev) => ({ ...prev, username: "" }));
      }
    }, 800);
  }

  function setUserPassword(e) {
    clearTimeout(timer.current.passwordTimer);
    setUserDetail((prev) => ({
      ...prev,
      password: e.target.value,
    }));

    timer.current.passwordTimer = setTimeout(() => {
      let passwordValidation = signupSchema.shape.password.safeParse(
        e.target.value,
      );

      if (!passwordValidation.success) {
        let errorMessage = z.flattenError(passwordValidation.error)
          .formErrors[0];
        setSchemaValidationError((prev) => ({
          ...prev,
          password: errorMessage,
        }));
      } else {
        setSchemaValidationError((prev) => ({ ...prev, password: "" }));
      }
    }, 800);
  }

  async function submitSigninForm(e) {
    e.preventDefault();
    try {
      if (userDetail.email !== "" && userDetail.password !== "") {
        // const response = await fetch("http://localhost:3000/auth/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(userDetail),
        // });
        // const responseBody = await response.json();
        let response = await api.post("/auth/signin", userDetail);
        if (response.status === 200) {
          props.setRole((prev) => response.data.userType);
          props.setUserSignin((prev) => true);
        } else {
          setSignInFailed(response);
        }
      }
    } catch (err) {
      setSignInFailed({
        message: "It's not you it's us, please try again after sometimes.",
      });
    }
  }

  async function submitSignupForm(e) {
    e.preventDefault();
    let schemaValidation = signupSchema.safeParse(userDetail);
    if (schemaValidation.success) {
      props.setRole(userDetail.userType);
      try {
        // let response = await fetch("http://localhost:3000/auth/signup", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(userDetail),
        // });
        let response = await api.post("/auth/signup", userDetail);
        if (response.status === 200) {
          navigate("/signin");
        } else {
          setSignUpFailed({
            message: "It's not you it's us, please try again after sometimes.",
          });
        }
      } catch (err) {
        setSignUpFailed({
          message: "It's not you it's us, please try again after sometimes.",
        });
      }
    } else {
      schemaValidation = z.flattenError(schemaValidation.error).fieldErrors;

      setSchemaValidationError({
        username: schemaValidation?.username?.[0],
        email: schemaValidation?.email?.[0],
        password: schemaValidation?.password?.[0],
      });
    }
  }

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 h w-full bg-slate-700/30 absolute backdrop-blur-xs z-50 overflow-y-auto">
        <div className="flex flex-col justify-center items-center gap-y-7 pt-3 pb-1 max-h-[700px] h-auto w-[450px] min-h-[500px] min-w-[450px] rounded-md bg-white font-sans shadow-2xl">
          <div className="text-3xl font-semibold">
            {signinFlag ? "Log in to Coursify" : "Sign up to Coursify"}
          </div>
          <div className="text-sm">
            {signinFlag
              ? "Didn't have an account?"
              : "Already have and account?"}
            <span className="text-purple-500 hover:text-purple-800">
              {signinFlag ? (
                <Link to="/signup">"SignUp"</Link>
              ) : (
                <Link to="/signin">"SignIn"</Link>
              )}
            </span>
          </div>
          <div className="text-sm">
            {userDetail.userType === "user"
              ? "Want to sell courses?"
              : "Want to buy courses?"}
            <span
              onClick={(e) =>
                setUserDetail((prev) => {
                  return {
                    ...prev,
                    userType: prev.userType === "admin" ? "user" : "admin",
                  };
                })
              }
              className="text-purple-500 hover:text-purple-800"
            >
              {userDetail.userType === "user" ? "Sell Courses" : "Buy Courses"}
            </span>
          </div>
          {signinFlag ? "or" : null}
          {signInFailed.message && (
            <p className="text-sm bg-pink-500 text-white p-2 rounded-md">
              {signInFailed.message}
            </p>
          )}
          <form
            className="flex flex-col gap-5 p-4 w-4/5"
            onSubmit={signinFlag ? submitSigninForm : submitSignupForm}
            noValidate
          >
            {signinFlag || (
              <input
                type="text"
                placeholder="User Name"
                className="p-2 border-2 border-purple-300 rounded-md invalid:outline-pink-500 focus:outline-purple-500 focus:invalid:text-pink-500 focus:invalid:outline-pink-500"
                onChange={setUserName}
                onBlur={() =>
                  setSchemaValidationError((prev) => ({
                    ...prev,
                    username: "",
                  }))
                }
                required
              />
            )}{" "}
            {schemaValidationError.username && (
              <p className="text-sm text-pink-500">
                {schemaValidationError.username}
              </p>
            )}
            <input
              type={signinFlag ? "text" : "email"}
              placeholder={signinFlag ? "Username or Email" : "Email"}
              className="p-2 border-2 border-purple-300 rounded-md invalid:outline-pink-500 focus:outline-purple-500 focus:invalid:text-pink-500 focus:invalid:outline-pink-500 peer"
              onChange={setUserEmail}
              onBlur={() =>
                setSchemaValidationError((prev) => ({ ...prev, email: "" }))
              }
              required
            />
            {!signinFlag && schemaValidationError.email && (
              <p className="text-sm text-pink-500">
                {schemaValidationError.email}
              </p>
            )}
            <div className="flex relative m-0 p-0 border border-slate-200">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="p-2 border-2 border-purple-300 rounded-md invalid:outline-pink-500 focus:invalid:text-pink-500 focus:invalid:outline-pink-500 focus:outline-purple-500 w-full"
                onChange={setUserPassword}
                onBlur={() =>
                  setSchemaValidationError((prev) => ({
                    ...prev,
                    password: "",
                  }))
                }
                required
              />
              <button
                className="absolute top-2 right-2 m-0 p-0"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                <img
                  src={showPassword ? hidePasswordLogo : showPasswordLogo}
                  alt={"showPasswordIcon"}
                  className="w-[30px] h-[30px]"
                />
              </button>
            </div>
            {schemaValidationError.password && (
              <p className="text-sm text-pink-500">
                {schemaValidationError.password}
              </p>
            )}
            <button
              className="border-2 rounded-lg bg-purple-500 hover:bg-purple-700 text-purple-100  p-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
