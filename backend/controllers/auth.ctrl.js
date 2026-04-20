const { z } = require("zod");
const userModel = require("../models/users.model");
const { courseModel } = require("../models/course.model");
const db = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ILoveYouBaby,IfIt'sQuiteAllright?";

let signupSchema = z.object({
  username: z.string().min(4, "UserName too short."),
  email: z.email("Invalid Email"),
  password: z.string().min(8, "Password should be atleast 8 charachters long"),
  userType: z.enum(["admin", "user"]),
});

let userSignup = async (req, res) => {
  let schemaValidation = signupSchema.safeParse(req.body);
  let data;
  if (schemaValidation.success) {
    data = schemaValidation.data;
  } else {
    return res.status(400).json({
      error: schemaValidation.error,
    });
  }

  try {
    let { username, email, password, userType } = data;
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);

    await userModel.create({
      name: username,
      email: email,
      password: hashPassword,
      userType: userType,
    });

    return res.json({
      message: "User Signup Succesfull",
    });
  } catch (err) {
    return res.status(500).json({
      error: err?.errors || err?.name,
      message: "Internal Server Error",
    });
  }
};

let userSignin = async (req, res) => {
  let validateName = z.string().min(4).safeParse(req.body.username);
  let validateEmail = z.email().safeParse(req.body.email);
  let validatePassword = z.string().min(8).safeParse(req.body.password);
  let name, email, password;
  if (validatePassword.success) {
    password = validatePassword.data;
  } else {
    return res.status(400).json({
      error: validatePassword.error,
    });
  }

  if (validateName.success) {
    name = validateName.data;
  } else if (validateEmail.success) {
    email = validateEmail.data;
  } else {
    return res.status(400).json({
      error: validateName?.error || validateEmail?.error,
    });
  }

  try {
    if (name) {
      let userData = await userModel.findOne({
        name,
      });

      if (!userData) {
        return res.status(403).json({
          message: "Username or Password did not match.",
        });
      }

      const passCheck = await bcrypt.compare(password, userData.password);

      const userToken = jwt.sign(
        {
          id: userData.id,
          userType: userData.userType,
        },
        JWT_SECRET,
        {
          expiresIn: "5min",
        },
      );

      if (passCheck) {
        res.cookie("token", userToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        return res.json({
          message: "User SignIn Succesfull",
          userType: userData.userType,
        });
      } else {
        return res.status(403).json({
          message: "Username or Password did not match.",
        });
      }
    } else if (email) {
      let userData = await userModel.findOne({
        email,
      });

      if (!userData) {
        return res.status(403).json({
          message: "Username or Password did not match.",
        });
      }

      const passCheck = await bcrypt.compare(password, userData.password);

      const userToken = jwt.sign(
        {
          id: userData.id,
          userType: userData.userType,
        },
        JWT_SECRET,
      );

      if (passCheck) {
        return res.json({
          message: "User SignIn Succesfull",
          token: userToken,
          userType: userData.userType,
        });
      } else {
        return res.status(403).json({
          message: "Username or Password did not match.",
        });
      }
    } else {
      return res.json({
        message: "No user find with this UserName",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

let userStateData = async (req, res) => {
  // let userData = await userModel.findOne({
  //   id: req.currUser.id,
  // });

  res.json({
    userType: req.currUser.userType,
    isAuthenticated: true,
  });
};

module.exports = {
  userSignin,
  userSignup,
  userStateData,
};
