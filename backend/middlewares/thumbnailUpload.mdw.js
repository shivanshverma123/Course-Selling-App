const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Inside Destination");
    cb(null, path.join(__dirname, "..", "public", "thumbnails"));
  },
  filename: (req, file, cb) => {
    console.log("Inside filename");
    let filename =
      req.currUser.id + "_" + `${Date.now()}` + path.extname(file.originalname);
    req.thumbnailName = filename;
    cb(null, filename);
  },
});

let upload = multer({ storage });

module.exports = upload;
