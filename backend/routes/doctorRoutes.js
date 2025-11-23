import express from "express";
import User from "../models/User.js"; // Import User model

const router = express.Router();

// ✅ Get all doctors or filter by speciality
router.get("/", async (req, res) => {
  try {
    const { speciality } = req.query;
    console.log("Speciality received in API:", speciality); // ✅ Debugging

    let query = { speciality: { $ne: null } }; // Fetch only users where speciality is NOT NULL

    if (speciality) {
      query.speciality = { $regex: new RegExp(`^${speciality}$`, "i") }; // Case-insensitive match
    }

    console.log("Query used:", query); // ✅ Debugging

    const doctors = await User.find(query).select(
      "fullName speciality photo email gender experience fees"
    );

    console.log("Fetched Doctors:", doctors);
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

// ✅ Get a single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("Doctor ID received:", req.params.id); // Debugging

    const doctor = await User.findById(req.params.id).select(
      "fullName speciality photo email gender experience aboutDoctor fees"
    );

    if (!doctor) {
      console.log("Doctor not found!");
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
