import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // Ensures the test is linked to a user
  },
  name: {
    type: String,
    required: [true, "❌ Test name is required."],
  },
  testType: {
    type: String,
    required: [true, "❌ Test type is required."],
  },
  price: {
    type: Number,
    required: [true, "❌ Test price is required."],
    min: [0, "❌ Price must be a positive value."],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  results: {
    type: String, // Can store test results or link to a PDF report
    default: "Not Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LabTest = mongoose.model("LabTest", labTestSchema);
export default LabTest;
