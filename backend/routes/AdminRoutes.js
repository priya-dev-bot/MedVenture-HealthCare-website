//backend/routes/AdminRoutes.js
import express from "express";
import User from "../models/User.js"; // ✅ Ensure the correct path
import Appointment from "../models/AppointmentModel.js";
import LabOrder from "../models/LabOrderModel.js"; // ✅ Ensure correct path




const router = express.Router();

// ✅ Fetch all doctors
router.get("/doctors", async (req, res) => {
    try {
      const doctors = await User.find({ role: "Doctor" });
      console.log("Doctors found:", doctors); // Debugging log
      res.status(200).json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: "Error fetching doctors", error });
    }
  });

  


  // Delete a doctor from both the doctors and users schema
  router.delete("/doctors/:id", async (req, res) => {
    const doctorId = req.params.id;
    console.log("Attempting to delete doctor with ID:", doctorId);  // Log the doctor ID
  
    try {
      const doctorDeleted = await User.findByIdAndDelete(doctorId);
      if (!doctorDeleted) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      console.log("Doctor deleted successfully:", doctorId); // Log success
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      console.error("Error deleting doctor:", error); // Log error
      res.status(500).json({ message: "Failed to delete doctor", error });
    }
  });

  // ✅ Fetch completed appointments
  router.get("/appointments/completed", async (req, res) => {
    try {
      const completedAppointments = await Appointment.find({ paymentstatus: "Completed" })
        .populate("userId", "fullName")
        .populate("doctorId", "fullName speciality fees");
  
      res.json(completedAppointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch completed appointments" });
    }
  });


  // ✅ Fetch Lab Tests for Current Date
  router.get("/lab-tests/today", async (req, res) => {
    try {
        const todayStr = new Date().toISOString().split("T")[0];

        console.log("Today's Date String:", todayStr);

        // ✅ Fetch lab tests and populate `userId` with `fullName`
        const todayLabOrders = await LabOrder.find({ testDate: todayStr })
            .populate("userId", "fullName"); // Fetch only `fullName`

        console.log("Populated Lab Tests:", todayLabOrders); // Log for debugging

        res.status(200).json(todayLabOrders);
    } catch (error) {
        console.error("Error fetching today's lab tests:", error);
        res.status(500).json({ message: "Failed to fetch lab tests", error });
    }
});

  

export default router; // ✅ Use export default instead of module.exports
