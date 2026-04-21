const authRouter = require("express").Router();

const {
  userSignin,
  userSignup,
  userStateData,
  userLogout,
} = require("../controllers/auth.ctrl");

authRouter.get("/me", userStateData);
authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);
authRouter.post("/logout", userLogout);

module.exports = authRouter;
