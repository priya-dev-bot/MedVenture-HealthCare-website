import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorName: { type: String, required: true },
  speciality: { type: String, required: true },
  fees: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  paymentstatus: { 
    type: String, 
    enum: ["Pending", "Completed", "Cancelled"], 
    default: "Pending" 
  },
  reason: { type: String, required: true },
  prescription: { type: String, default: "" },

  feedback: { 
    text: { type: String, default: "" }, // Store the actual feedback text
    rating: { type: Number, min: 1, max: 5, default: null }, // Store ratings (optional)
    submittedAt: { type: Date, default: null } // Store submission time
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
