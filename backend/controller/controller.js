const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const Accountant = require("../models/accountantSchema");
const generateToken = require("../utils/generateToken");
const admin = require("../models/adminSchema");
const payment = require("../models/payment");
const SemesterFee = require("../models/semesterFeeStructure");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../config/email");

//?
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (email === admin.email && password === admin.password) {
      // Admin login
      generateToken(res, Admin._id);
      return res.status(200).json({
        _id: Admin._id,
        name: Admin.name,
        role: Admin.role,
        message: "Admin login successful",
        success: true,
      });
    }

    const user =
      (await User.findOne({ email })) || (await Accountant.findOne({ email }));

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }

    // User login
    generateToken(res, user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.constructor.modelName,
      message: "Successfully logged in",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

// @desc    Register a new user or student
// @route   POST /api/registerStudent
// @access  Private

const registerStudent = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      semester,
      password,
      guardianName,
      contact,
      CreatedAt,
    } = req.body;

    //  Check either student exists or not
    const existingStudent = await User.findOne({ email, name });
    if (existingStudent) {
      // Check if duplicate email
      if (existingStudent.email === email) {
        throw new Error("Email already exists");
      }

      // Check if duplicate name
      if (existingStudent.name === name) {
        throw new Error("Name already exists");
      }
    }

    //  if not create Student
    const createStudent = await User.create({
      name,
      email,
      gender,
      semester,
      guardianName,
      contact,
      password,
      CreatedAt,
    });

    if (createStudent) {
      // assign token with the id from mongoose
      generateToken(res, createStudent._id);

      console.log(createStudent); // check whether the token and student is created
      res.status(201).json({
        message: "Student created successfully",
        success: true,
        createStudent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occured while creating the post",
      succes: false,
    });
  }
});

//  @desc       Get students by semester
//  @route      GET  /api/student/:semester
//  @access     Private
const getStudentsBySemester = async (req, res) => {
  try {
    const { semester } = req.params;

    // Validate if semester is provided
    if (!semester) {
      return res
        .status(400)
        .json({ message: "Semester parameter is required." });
    }

    // Find students by semester
    const students = await User.find({ semester });

    // Check if any students are found
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this semester." });
    }

    // Return the students
    return res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the students." });
  }
};

// @desc    Update student
// @route   Put   /api/student
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        name: req.body.name,
        semester: req.body.semester,
        email: req.body.email,
        guardianName: req.body.guardianName,
        contact: req.body.contact,
        password: req.body.password,
        gender: req.body.gender,
      },
    );
    console.log(update);
    return res.status(200).json({ message: "Student updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while updating the post" });
  }
});

// @desc    Delete student
// @route   Delete  /api/deleteStudent
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Student not deleted", succes: false });
    }
    console.log(deleted);
    res
      .status(200)
      .json({ message: "Student deleted successfully", succes: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occured while deleting the post",
      succes: false,
    });
  }
});

// @desc    Register Accountant
// @route   POST  /api/accountant/create
// @access  Private
const registerAccountant = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // Check either student exists or not
    const existingAccountant = await Accountant.findOne({ email });
    if (existingAccountant) {
      return res.json({ error: "Accountant already exists" });
    }

    // if not create Accountant
    const createAccountant = await Accountant.create({
      name,
      semester,
      email,
      guardianName,
      contact,
      password,
      gender,
    });

    if (createAccountant) {
      // assign token with the id from mongoose
      generateToken(res, createAccountant._id);

      console.log(createAccountant); // check whether the token and accountant is created
      res.status(201).json({
        mesage: "Accountant created successfully",
        success: true,
        createAccountant,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occured while creating accountant" });
  }
});

// @desc    Get accountant
// @route   GET   /api/accountant
// @access  Private
const getAccountant = asyncHandler(async (req, res) => {
  try {
    const items = await Accountant.find();
    res.json(items);
  } catch (error) {
    throw new Error("Error while retrieving accountant");
  }
});

// @desc    Update Accountant
// @route   PUT   /api/accountant
// @access  Private
const updateAccountant = asyncHandler(async (req, res) => {
  try {
    const update = await Accountant.findByIdAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
      },
    );
    console.log(update);
    return res.status(200).json({ message: "Accountant updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while updating the Accountant" });
  }
});

//  @desc       Delete accountant
//  @route      Delete  /api/deleteAccountant
//  @access     Public
const deleteAccountant = async (req, res) => {
  try {
    const deleted = await Accountant.findByIdAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Accountant not deleted" });
    }
    console.log(deleted);
    res.status(200).json({ message: "Accountant deleted successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the accountant" });
  }
};

// @desc    Payment
// @route   POST api/processPayment
// @access  Private
const processPayments = asyncHandler(async (req, res) => {
  const {
    name,
    semester,
    address,
    parentsName,
    amount,
    paymentDate,
    email,
    guardianContact,
  } = req.body;

  try {
    const base64Image = req.file.base64Image;

    // Find the corresponding user
    const user = await User.findOne({ email });
    const feeStructure = await SemesterFee.findOne({ semester });

    if (user && feeStructure) {
      // If the user is found, update their status to "pending Verification"
      user.status = "pending Verification";
      await user.save();

      // Create a new payment instance
      const newPayment = new payment({
        name,
        address,
        semester,
        parentsName,
        amount,
        paymentDate,
        email,
        photo: base64Image,
        guardianContact,
        feeStructure: feeStructure._id,
      });

      // Save the payment
      const savedPayment = await newPayment.save();

      return res.status(201).json({
        message: "Payment processed successfully",
        success: true,
        payment: savedPayment,
      });
    } else {
      // If the user is not found, return an error
      console.log("User or fee Structure not found not found");
      return res
        .status(404)
        .json({ error: "User or fee Structure  not found" });
    }
  } catch (error) {
    console.error("Error during payment processing:", error);
    return res
      .status(500)
      .json({ error: "Payment unsuccessful", details: error.message });
  }
});

// @desc    Verify payments
// @route   POST /verify/payment
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  try {
    const { id, email } = req.body;

    // Find the payment in the Payment collection
    const paymentObject = await payment.findById(id);

    if (!paymentObject) {
      return res.status(404).json({ message: "No payment found" });
    }

    // Find the user in the User collection
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    // Check if payment is already verified
    if (paymentObject.verified) {
      return res.status(400).json({ message: "Payment is already verified" });
    }

    // Update user payment status to "paid"
    user.status = "paid";

    // Update payment status to "verified"
    paymentObject.verified = true;

    // Save changes to the database
    await Promise.all([user.save(), paymentObject.save()]);

    // Send success response
    res.status(200).json({
      message: "Payment verified successfully",
      user,
      payment: paymentObject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying payment", error: error.message });
  }
});

// @desc    Get payments
// @route   GET /statements
// @access  Private
const getPayment = asyncHandler(async (req, res) => {
  try {
    // get all payments excep photo
    const paid = await payment.find().select("-photo");
    res.json(paid);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occured while retrieving payments " });
  }
});

// @desc    Get payments based on the id
// @route   GET /statements
// @access  Private
const getByPaymentId = asyncHandler(async (req, res) => {
  try {
    const pay = await payment.findById(req.params.id);

    if (!pay) {
      return res.status(500).json("Payment not found ");
    }

    const photoBased64 = pay.photo.toString("base64");
    res.json({
      payment: {
        ...JSON.parse(JSON.stringify(pay)),
        photo: photoBased64,
      },
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occured while retrieving payments " });
  }
});

// @desc    Get payments based on semester
// @route   GET /statements/:semester
// @access  Private
const getInvoice = asyncHandler(async (req, res) => {
  const { semester } = req.params;

  if (!semester) {
    return res.status(400).json({ message: "Semester is required" });
  }

  try {
    const invoice = await payment
      .findOne({ semester }, { photo: 0 })
      .populate("feeStructure");

    if (!invoice) {
      return res
        .status(404)
        .json({ message: "Invoice not found for the specified semester" });
    }

    res.status(200).json(invoice);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the invoice" });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

// @desc    Get user profile
// @route   GET /users/profile
// @access  Private

const getUserProfile = async (req, res) => {
  const { userId, userRole } = req.params;

  try {
    let userProfile;

    if (userRole === "User") {
      userProfile = await User.findById(userId);
    } else if (userRole === "Accountant") {
      userProfile = await Accountant.findById(userId);
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /users/profile
// @access  Private
const updateUserProile = asyncHandler(async (req, res) => {
  res.json({ mesage: "update profile" });
});

// @desc    create a new semester fee
// @route   POST /createSemesterFee
// @access  Private
const createSemesterFee = asyncHandler(async (req, res) => {
  try {
    const {
      semester,
      admissionFee,
      tutionFee,
      libraryFee,
      internalExamFee,
      boardExamFee,
      infrastructureDevelopmentFee,
      labFee,
      identityCardFee,
    } = req.body;

    // Check either semester exists or not
    const existingSemester = await SemesterFee.findOne({ semester });
    if (existingSemester) {
      return res.json({ error: "Semester already exist" });
    }

    const totalFee =
      Number(admissionFee) +
      Number(tutionFee) +
      Number(libraryFee) +
      Number(internalExamFee) +
      Number(boardExamFee) +
      Number(infrastructureDevelopmentFee) +
      Number(labFee) +
      Number(identityCardFee);

    // if not create Semester Fee
    const newSemesterFee = await SemesterFee.create({
      semester,
      admissionFee,
      tutionFee,
      libraryFee,
      internalExamFee,
      boardExamFee,
      infrastructureDevelopmentFee,
      labFee,
      identityCardFee,
      totalFee,
    });

    console.log(newSemesterFee); //! check whether smessterFee is created or not
    res.status(201).json({
      message: `${semester} fee created successfully`,
      success: true,
      newSemesterFee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: " An error occured while creating new sememster fee ",
    });
  }
});

// @desc    Get fees
// @route   Get /api/fees
// @access  Private
const feeStructure = asyncHandler(async (req, res) => {
  try {
    const { semester } = req.body;
    console.log(req.body);
    const fee = await SemesterFee.find({ semester });
    if (!fee) {
      return res.status(404).json({ message: "Fee structure not found " });
    }
    console.log(fee);

    return res.status(200).json({ fee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occured while retrieving fee",
    });
  }
});

// @desc    Update Fee
// @route   Put   /api/updateFeeStructure
// @access  Private
const updateFeeStructure = asyncHandler(async (req, res) => {
  try {
    const {
      _id,
      semester,
      admissionFee,
      tutionFee,
      libraryFee,
      internalExamFee,
      boardExamFee,
      infrastructureDevelopmentFee,
      labFee,
      identityCardFee,
    } = req.body;

    console.log(req.body);

    // Parse fields as numbers using the unary plus operator otherwise they will be concatenated
    const numericAdmissionFee = +admissionFee;
    const numericTutionFee = +tutionFee;
    const numericLibraryFee = +libraryFee;
    const numericInternalExamFee = +internalExamFee;
    const numericBoardExamFee = +boardExamFee;
    const numericInfrastructureDevelopmentFee = +infrastructureDevelopmentFee;
    const numericLabFee = +labFee;
    const numericIdentityCardFee = +identityCardFee;

    // Calculate the total fee based on the received data
    const totalFee =
      numericAdmissionFee +
      numericTutionFee +
      numericLibraryFee +
      numericInternalExamFee +
      numericBoardExamFee +
      numericInfrastructureDevelopmentFee +
      numericLabFee +
      numericIdentityCardFee;

    const update = await SemesterFee.findByIdAndUpdate(
      { _id: req.params.id },
      {
        semester,
        admissionFee,
        tutionFee,
        libraryFee,
        internalExamFee,
        boardExamFee,
        infrastructureDevelopmentFee,
        labFee,
        identityCardFee,
        totalFee,
      },
      { new: true }, // Return the updated docment
    );

    if (!update) {
      return res.status(404).json({ message: "Fee Structure not found" });
    }
    res
      .status(200)
      .json({ message: "fee structured updated successfully", update });
    console.log(update);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occured while updating fee structure" });
  }
});

// @desc    Delete feeStructure
// @route   Delete /api/deleteFeeStructure
// @access  Private
const deleteFeeStructure = asyncHandler(async (req, res) => {
  try {
    const deleted = await SemesterFee.findByIdAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Fee structure not deleted" });
    }
    console.log(deleted, "fee structure deleted");
    return res
      .status(200)
      .json({ message: "Fee structure Deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while deleting the fee Structure" });
  }
});

// @desc    Send Mail
// @route   POST /api/sendMail
// @access  Private
const sendMail = asyncHandler(async (req, res) => {
  try {
    const { userEmail, userName, dueDate } = req.body;

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL, // School email id
        pass: PASSWORD, // school email password
      },
    };

    let transporter = await nodemailer.createTransport(config);

    let mailGenerator = await new Mailgen({
      theme: "default",
      product: {
        name: "Aaadikavi Bhanubhakta Campus",
        link: "https://aadikavicampus.edu.np",
      },
    });

    let emailContent = {
      body: {
        name: userName, // User's name
        intro: `We would like to remind you that your payment is due on ${dueDate}.`,
        outro: `Please ensure that your payment is made by the due date to avoid any late fees. Should you have any questions, please do not hesitate to contact us.`,
      },
    };

    let emailBody = await mailGenerator.generate(emailContent);

    let message = {
      from: EMAIL,
      to: userEmail,
      subject: "Payment Due Notice",
      html: emailBody,
    };

    transporter
      .sendMail(message)
      .then(() => {
        res.status(200).json({
          message: "Email sent successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error sending email", error: error });
      });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error });
  }
});

// @desc    Send Mail Verification
// @route   POST /api/sendMailVerification
// @access  Private
const sendMailVerification = asyncHandler(async (req, res) => {
  try {
    const { userEmail, userName } = req.body;

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL, // School email id
        pass: PASSWORD, // school email password
      },
    };

    let transporter = await nodemailer.createTransport(config);

    let mailGenerator = await new Mailgen({
      theme: "default",
      product: {
        name: "Aaadikavi Bhanubhakta Campus",
        link: "https://aadikavicampus.edu.np",
      },
    });

    let emailContent = {
      body: {
        name: userName, // User's name
        intro: `We're happy to confirm that your payment has been successfully verified. Thank you for your prompt transaction.`,
      },
    };

    let emailBody = await mailGenerator.generate(emailContent);

    let message = {
      from: EMAIL,
      to: userEmail,
      subject: "Payment verification complete",
      html: emailBody,
    };

    transporter
      .sendMail(message)
      .then(() => {
        res.status(200).json({
          message: "Email sent successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error sending email", error: error });
      });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error });
  }
});

module.exports = {
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
  verifyPayment,
  getPayment,
  getByPaymentId,
  getInvoice,
  createSemesterFee,
  feeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  sendMail,
  sendMailVerification,
};
