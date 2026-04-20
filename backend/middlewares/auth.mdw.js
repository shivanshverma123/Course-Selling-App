require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  if (
    req.path === "/auth/signin" ||
    req.path === "/auth/signup" ||
    req.path.startsWith("/thumbnails")
  ) {
    next();
  } else {
    try {
      let token = req.cookie("token");
      if (token) {
        let verifiedData = jwt.verify(token, jwt_secret);
        req.currUser = verifiedData;
        console.log("Yaha print ho rha currUser Obj:-", req.currUser);
      } else {
        return res.status(403).json({
          message: "User not authenticated, Please signIn again.",
          isAuthenticated: false,
        });
      }

      next();
    } catch (err) {
      res.status(403).json({
        message: "Bad Token, Retry signIn.",
        isAuthenticated: false,
      });
    }
  }
}

module.exports = authenticate;
