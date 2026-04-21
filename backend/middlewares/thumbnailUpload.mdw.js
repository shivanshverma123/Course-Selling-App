const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnailFile") {
      cb(null, path.join(__dirname, "..", "public", "thumbnails"));
    } else {
      cb(null, path.join(__dirname, "..", "public", "instructorDp"));
    }
  },
  filename: (req, file, cb) => {
    let filename;
    if (file.fieldname === "thumbnailFile") {
      filename =
        req.currUser.id +
        "_" +
        `${Date.now()}` +
        path.extname(file.originalname);

      req.thumbnailName = filename;
    } else if (file.fieldname === "instructorDp") {
      filename = `${Date.now()}_` + file.originalname;
    }

    cb(null, filename);
  },
});

let upload = multer({ storage });

module.exports = upload;
