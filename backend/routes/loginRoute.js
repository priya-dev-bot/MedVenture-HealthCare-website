import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/admin.js";

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Change this to a secure key

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // First, check if the user is an admin
    let user = await Admin.findOne({ email });

    if (user) {
      // Compare password for admin
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT Token for admin
      const token = jwt.sign({ id: user._id, email: user.email, role: "admin" }, SECRET_KEY, { expiresIn: "1h" });

      return res.status(200).json({
        message: "Admin login successful",
        user: {
          id: user._id,
          email: user.email,
          role: "admin",
          fullName: user.name, // Admin schema has 'name' instead of 'fullName'
          photo: user.photo ? `/uploads/${user.photo}` : "/uploads/admin.png",
        },
        token,
      });
    }

    // If not an admin, check the User collection
    user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password for normal user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token for normal user
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({
      message: "User login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        photo: user.photo ? `http://localhost:5000${user.photo}` : "",
      },
      token,
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
