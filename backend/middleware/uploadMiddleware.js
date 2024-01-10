const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // filename
  },
});

const upload = multer({ storage });

const convertToBase64 = async (file) => {
  try {
    if (file) {
      const imagePath = path.join(__dirname, "..", "uploads", file.filename);
      const imageBuffer = await fs.readFile(imagePath);
      return imageBuffer.toString("base64");
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const uploadMiddleware = (req, res, next) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      req.file.base64Image = await convertToBase64(req.file);
      next();
    } catch (error) {
      console.error("Error processing image:", error);
      return res
        .status(500)
        .json({ error: "Error processing image", details: error.message });
    }
  });
};

module.exports = uploadMiddleware;
