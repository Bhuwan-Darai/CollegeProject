const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { uuidv4 } = require("uuid");

// User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4().replace(/-/g, "").slice(0, 5),
    },
    semester: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 9;
        },
        message: "Semester must be between 1 to 9",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    guardianName: {
      type: String,
      required: true,
    },
    contact: {
      type: String, // Assuming phone number is a string for flexibility
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Contact number must be 10 digits",
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    status: {
      type: String,
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
