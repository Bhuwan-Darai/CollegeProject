const express = require("express");
const { isStudent, protect } = require("../middleware/authMiddleware");

const {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProile,
  registerStudent,
  getStudentsBySemester,
  updateStudent,
  deleteStudent,
  registerAccountant,
  getAccountant,
  updateAccountant,
  deleteAccountant,
  processPayments,
  getPayment,
  getByPaymentId,
  getInvoice,
  getNotification,
  readNotification,
  createSemesterFee,
  feeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  sendMail,
  verifyPayment,
} = require("../controller/controller");
const uploadMidlleware = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile/:id")
  .get(protect, getUserProfile)
  .put(protect, updateUserProile);
router.post("/registerStudent", registerStudent);
router.get("/getStudents/:semester", getStudentsBySemester);
router.put("/updateStudent/:id", updateStudent);
router.route("/student/:id").put(protect, updateStudent);
router.delete("/deleteStudent/:id", deleteStudent);
router.post("/registerAccountant", registerAccountant);
router.get("/getAccountant", getAccountant);
router
  .route("/accountant")
  .get(protect, getAccountant)
  .put(protect, updateAccountant);
router.delete("/deleteAccountant/:id", deleteAccountant);
router.put("/updateAccountant/:id", updateAccountant);
router.post("/processPayment", uploadMidlleware, processPayments);
router.post("/verify/payment", verifyPayment);

router.get("/payments", getPayment);
router.get("/payments/:id", getByPaymentId);

router.get("/invoice/:semester", getInvoice);
router.put("/notification/:id/mark-as-read", readNotification);
router.post("/createSemesterFee", createSemesterFee);
router.post("/fees", feeStructure);
router.put("/updateFeeStructure/:id", updateFeeStructure);
router.delete("/deleteFeeStructure/:id", deleteFeeStructure);
router.post("/sendMail", sendMail);
module.exports = router;
