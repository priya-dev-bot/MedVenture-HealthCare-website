import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components
import { UserProvider } from "./pages/UserContext"; // Import UserProvider
import "./App.css";
import Header from "./pages/Header";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login"; // Import Login component
import VideoConsult from './pages/VideoConsult'; // Import the VideoConsult component
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ConsultCard from "./pages/ConsultCard";
import LabTest from './pages/Lab-Test'; 
import Articles from './pages/Articles';   //ye import kar
import Checkout from './pages/Checkout';
import Profile from "./pages/Profile"; 
import DoctorProfile from "./pages/DoctorProfile"; 
import FindDoctor from "./pages/FindDoctor";
import Appointment from "./pages/appointment";
import Payment from "./pages/Payment";
import ConsultationList from "./pages/ConsultationList";
//import Admindashboard from "./pages/adminDashboard";
import AdminDashboard from "./pages/AdminDashboard";




function App() {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Define Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/find-doctor" element={<FindDoctor />} />
              <Route path="/appointment/:doctorId" element={<Appointment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/video-consult" element={<VideoConsult />} />
              <Route path="/consult" element={<ConsultCard />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/lab-test" element={<LabTest />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/articles" element={<Articles />} />   
              <Route path="/profile" element={<Profile />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/consultationlist" element={<ConsultationList />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              {/* Add more routes if needed */}
            </Routes>
          </main>
          
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;