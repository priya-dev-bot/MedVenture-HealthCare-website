import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import registerRoute from './routes/registerRoute.js';
import loginRoute from './routes/loginRoute.js';
import labOrderRoutes from './routes/labOrderRoutes.js'; // Import lab order routes
import doctorRoutes from "./routes/doctorRoutes.js"; // Import doctor routes
import appointmentRoutes from "./routes/appointmentRoutes.js"; // Import routes
import AdminRoutes from "./routes/AdminRoutes.js"; // Import Admin routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://medventure.vercel.app"
  ],
  credentials: true
}));
 // Allow frontend access
app.use(express.json()); // Parse incoming JSON requests
app.use("/uploads", express.static(path.join(path.resolve(), "uploads"))); // Serve static image uploads
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", AdminRoutes);


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected to MEDVENTURE database');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit on DB failure
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/register', registerRoute); // Register route
app.use('/api/login', loginRoute); // Login route
app.use('/api/lab-orders', labOrderRoutes); // Lab Order route ✅
// Add doctor route
app.use("/api/doctors", doctorRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: '✅ Server is healthy and running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: '❌ Something went wrong on the server!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
