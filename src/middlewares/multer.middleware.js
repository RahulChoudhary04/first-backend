// Multer middleware for handling file uploads, storing files in './public/temp' with original names.
import multer from "multer";

// Set up storage engine to store files in './public/temp' with original names
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

export const upload = multer({ 
    storage,
 });
