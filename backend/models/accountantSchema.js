const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const accountantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
    default: "accountant", // default role
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

//?  Match user entered password to hashed password
accountantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//? Encrypt password using bcrypt
accountantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Accountant = mongoose.model("Accountant", accountantSchema);

module.exports = Accountant;
