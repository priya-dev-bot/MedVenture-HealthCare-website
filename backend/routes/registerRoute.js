import express from "express";
import multer from "multer";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import path from "path";

const router = express.Router();

// 📌 Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `profileimg-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// 📌 **User Registration Route**
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("📩 Received registration request:", req.body);

    const { fullName, email, password, role, gender, speciality, aboutDoctor, timeSlots, experience,fees, mobileNumber } = req.body;
    
    console.log("✅ Extracted Data:", { fullName, email, password, role, gender, speciality, aboutDoctor, timeSlots, experience,fees, mobileNumber  });

    // ✅ Validate required fields
    if (!fullName || !email || !password || !role || !gender || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Ensure doctors provide a speciality, aboutDoctor, Experience and timeSlots
    if (role === "Doctor" && (!speciality || !aboutDoctor || !timeSlots || !experience || !fees)) {
      return res.status(400).json({ message: "Speciality, About Doctor, Time Slots and fees are required for doctors" });
    }

    // ✅ Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Parse timeSlots if it's sent as a JSON string
    const parsedTimeSlots = role === "Doctor" ? JSON.parse(timeSlots || "[]") : [];

    const parsedExperience = role === "Doctor" ? Number(experience) || 0 : null; // ✅ Convert to Number

    const parsedfees = role === "Doctor" ? Number(fees) || 0 : null;

    // ✅ Create a new user instance
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      gender,
      mobileNumber,
      speciality: role === "Doctor" ? speciality : null, 
      aboutDoctor: role === "Doctor" ? aboutDoctor : null, 
      timeSlots: role === "Doctor" ? parsedTimeSlots : [],
      experience: parsedExperience,
      fees: parsedfees,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
    });

    // ✅ Save user to the database
    await newUser.save();
    console.log("✅ User registered successfully:", newUser);

    // ✅ Send success response
    res.status(201).json({
      message: "Registration successful",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
        role: newUser.role,
        gender: newUser.gender,
        speciality: newUser.speciality,
        aboutDoctor: newUser.aboutDoctor,
        timeSlots: newUser.timeSlots,
        experience: newUser.experience,
        fees: newUser.fees,
        photo: newUser.photo ? `http://localhost:5000${newUser.photo}` : null,
      },
    });
  } catch (error) {
    console.error("❌ Error in registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
