const authRouter = require("express").Router();

const { userSignin, userSignup, userStateData } = require("../controllers/auth.ctrl");

authRouter.get("/me", userStateData);
authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);

module.exports = authRouter;
