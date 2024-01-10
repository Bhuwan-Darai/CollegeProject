const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  parentsName: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // save the photo path or URL
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  guardianContact: {
    type: Number,
    required: true,
  },
  feeStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SemesterFee",
    required: true,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
