//backend/routes/laborderroutes.js
import express from "express";
import LabOrder from "../models/LabOrderModel.js"; // Import LabOrder model

const router = express.Router();

/**
 * ✅ Create a new lab order
 * Ensures the order is associated with the logged-in user
 */
router.post("/create", async (req, res) => {
  try {
    const { userId, tests, totalPrice, testDate  } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "❌ User ID is required. Please log in." });
    }

    if (!tests || tests.length === 0) {
      return res.status(400).json({ message: "❌ No tests selected!" });
    }

    // Set testDate if not provided (default: 2 days after createdAt)
const createdAt = new Date();
const finalTestDate = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0]; // Convert to YYYY-MM-DD string

const newOrder = new LabOrder({
  userId,
  tests,
  totalPrice,
  status: "Pending",
  createdAt, // Keep full timestamp for tracking
  testDate: finalTestDate, // Store only YYYY-MM-DD as a string
});


    await newOrder.save();
    res.status(201).json({ message: "✅ Lab test order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

/**
 * ✅ Get all lab orders for a specific user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "❌ User ID is required!" });
    }
    const orders = await LabOrder.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "❌ No lab orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

/**
 * ✅ Get lab tests for a specific user (Returns only test details)
 */
router.get("/tests/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "❌ User ID is required!" });
    }

    // Fetch lab orders with all tests included
    const labOrders = await LabOrder.find({ userId }).sort({ createdAt: -1 });

    if (!labOrders.length) {
      return res.status(404).json({ message: "❌ No lab tests found for this user." });
    }

    // Extract only the test details from each order
    const userLabTests = labOrders.flatMap(order =>
      order.tests.map(test => ({
        _id: test._id,  // Include test ID for deletion
        name: test.name,
        price: test.price,
        preparation: test.preparation,
        createdAt: order.createdAt, // Attach order date
        testDate: order.testDate || new Date(order.createdAt.getTime() + 2 * 24 * 60 * 60 * 1000), // Default if missing
        status: order.status        // Attach order status
      }))
    );

    res.status(200).json(userLabTests);
  } catch (error) {
    console.error("❌ Error fetching lab tests:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

/**
 * ✅ Delete a specific lab test from user's order
 */
router.delete("/tests/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the lab order that contains the test
    const labOrder = await LabOrder.findOne({ "tests._id": id });

    if (!labOrder) {
      return res.status(404).json({ message: "❌ Lab test not found." });
    }

    // Remove the test from the order
    labOrder.tests = labOrder.tests.filter(test => test._id.toString() !== id);

    // If no tests remain, delete the entire order
    if (labOrder.tests.length === 0) {
      await LabOrder.findByIdAndDelete(labOrder._id);
    } else {
      await labOrder.save(); // Save updated order
    }

    res.status(200).json({ message: "✅ Lab test deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting lab test:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

export default router;
