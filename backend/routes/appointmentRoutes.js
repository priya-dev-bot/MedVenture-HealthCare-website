import express from "express";
import mongoose from "mongoose";
import Appointment from "../models/AppointmentModel.js";
import User from "../models/User.js";

const router = express.Router();


/**
 * ✅ Create a new appointment
 * Ensures the appointment is associated with a valid patient and doctor
 */
router.post("/create", async (req, res) => {
  try {
    const { userId, doctorId, date, time, reason, paymentstatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "❌ Invalid userId or doctorId format." });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "Patient") {
      return res.status(404).json({ message: "❌ Patient not found." });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "Doctor") {
      return res.status(404).json({ message: "❌ Doctor not found." });
    }

    const existingAppointment = await Appointment.findOne({ doctorId, date, time });
    if (existingAppointment) {
      return res.status(409).json({ message: "❌ This slot is already booked. Please choose another time." });
    }

    const newAppointment = new Appointment({
      userId,
      doctorId,
      doctorName: doctor.fullName,
      speciality: doctor.speciality,
      fees: doctor.fees,
      date,
      time,
      reason,
      paymentstatus: paymentstatus || "Pending", // Default to Pending if not provided
      createdAt: new Date(),
    });

    await newAppointment.save();
    res.status(201).json({ message: "✅ Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});

/**
 * ✅ Get all appointments for a specific user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "❌ User ID is required!" });
    }

    const appointments = await Appointment.find({ userId }).sort({ createdAt: -1 });
    if (!appointments.length) {
      return res.status(404).json({ message: "❌ No appointments found for this user." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});

/**
 * ✅ Get doctor appointments
 */
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) {
      return res.status(400).json({ message: "❌ Doctor ID is required!" });
    }

    const appointments = await Appointment.find({ doctorId }).populate("userId", "fullName email mobileNumber") // ✅ Populating userId to get fullName(fetch patient data)
    .sort({ createdAt: -1 });
    if (!appointments.length) {
      return res.status(404).json({ message: "❌ No appointments found for this doctor." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching doctor appointments:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});



router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) {
      return res.status(400).json({ message: "❌ Doctor ID is required!" });
    }

    const doctor = await User.findById(doctorId).select(
      "fullName email mobileNumber gender speciality experience fees aboutDoctor"
    );

    if (!doctor) {
      return res.status(404).json({ message: "❌ Doctor not found." });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("❌ Error fetching doctor details:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});




/**
 * ✅ Update payment status for an appointment
 */
/**
 * ✅ Update payment status for an appointment
 */
router.put("/update-payment-status/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "❌ Invalid appointment ID." });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { paymentstatus: "Completed" }, // Ensure the correct field is updated
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "❌ Appointment not found." });
    }

    res.status(200).json({ message: "✅ Payment status updated successfully!", appointment: updatedAppointment });
  } catch (error) {
    console.error("❌ Error updating payment status:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});



/**
 * ✅ Delete a specific appointment
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "❌ Invalid appointment ID." });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "❌ Appointment not found." });
    }

    res.status(200).json({ message: "✅ Appointment deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});



// Update prescription for an appointment
router.post("/:id/prescription", async (req, res) => {
  try {
    const { prescription } = req.body;
    const appointmentId = req.params.id;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { prescription },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("❌ Error updating prescription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.get("/prescriptions/completed", async (req, res) => {
  try {
    const completedAppointments = await Appointment.find({ paymentstatus: "Completed" })
      .select("doctorName prescription");

    if (!completedAppointments.length) {
      return res.status(404).json({ message: "❌ No completed appointments found." });
    }

    const response = completedAppointments.map((appointment) => ({
      doctorName: appointment.doctorName,
      prescription: appointment.prescription ? appointment.prescription : "Doctor has not yet given any prescription.",
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error fetching prescriptions:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});




// Submit Feedback for an Appointment
router.post("/:appointmentId/feedback", async (req, res) => {
  const { appointmentId } = req.params;
  const { userId, text, rating } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "❌ Appointment not found" });
    }

    if (appointment.userId.toString() !== userId) {
      return res.status(403).json({ message: "❌ Unauthorized to give feedback for this appointment" });
    }

    if (appointment.feedback.text) {
      return res.status(400).json({ message: "❌ Feedback already submitted" });
    }

    appointment.feedback = {
      text,
      rating,
      submittedAt: new Date(),
    };

    await appointment.save();

    res.status(200).json({ message: "✅ Feedback submitted successfully", appointment });
  } catch (error) {
    console.error("❌ Error submitting feedback:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});




router.get("/doctors-by-speciality/:speciality", async (req, res) => {
  try {
    const { speciality } = req.params;

    // Fetch doctors with the given speciality
    const doctors = await User.find({ role: "Doctor", speciality });

    if (!doctors.length) {
      return res.status(404).json({ message: "❌ No doctors found for this speciality." });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("❌ Error fetching doctors by speciality:", error);
    res.status(500).json({ message: "❌ Internal Server Error." });
  }
});




export default router;
