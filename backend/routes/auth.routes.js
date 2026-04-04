const authRouter = require("express").Router();

const { userSignin, userSignup } = require("../controllers/auth.ctrl");

authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);

module.exports = authRouter