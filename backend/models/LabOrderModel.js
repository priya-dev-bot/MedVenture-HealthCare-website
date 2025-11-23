//backend/models/LabOrderModel.js
import mongoose from "mongoose";

const LabOrderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "User ID is required"]
  },
  tests: [
    {
        name: { 
        type: String, 
        required: [true, "Test name is required"] 
      },
      price: { 
        type: Number, 
        required: [true, "Test price is required"] 
      },
      preparation: { 
        type: String, 
        default: "No special preparation required" 
      }
    }
  ],
  totalPrice: { 
    type: Number, 
    required: [true, "Total price is required"] 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Completed", "Cancelled"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now }, // Keep createdAt as a Date
  testDate: { type: String, required: true }, // Store date as "YYYY-MM-DD"
});

// ✅ Add logging for debugging
LabOrderSchema.pre("save", function (next) {
  console.log("Saving Lab Order:", this);
  next();
});

export default mongoose.model("LabOrder", LabOrderSchema);
