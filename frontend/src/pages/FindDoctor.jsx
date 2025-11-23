import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./FindDoctor.css";
import Footer from "./Footer";

const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((response) => {
        console.log("Doctors Data:", response.data);
        const doctorList = response.data.filter((doctor) => doctor.speciality);
        setDoctors(doctorList);
        setLoading(false);

        const uniqueSpecialities = [...new Set(doctorList.map((doctor) => doctor.speciality))];
        setSpecialities(uniqueSpecialities);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error.response?.data || error.message);
        setError("Error fetching doctors. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Navigate to Appointment page with the selected doctor's ID
  const handleBookAppointment = (doctorId) => {
    const userRole = localStorage.getItem("userRole"); // Assuming user role is stored in local storage
    if (userRole === "Doctor") {
      alert("Doctors are not allowed to book appointments.");
      return;
    }
    navigate(`/appointment/${doctorId}?mode=physical`);
  };
  
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSpeciality === "" || doctor.speciality === selectedSpeciality)
  );

  return (
    <main>
      <div className="find-doctor-container">
        <div className="banner">
          <img src="/find-doctor-gallery/find-doctor-banner.png" alt="Health Checkup Banner" className="banner-image" />
        </div>
        <div className="left-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search Doctors, Specialities, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="speciality-dropdown">
            <label>Select Speciality:</label>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
            >
              <option value="">All Specialities</option>
              {specialities.map((speciality, index) => (
                <option key={index} value={speciality}>{speciality}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading doctors...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="doctor-list">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor._id} className="doctor-card">
                    <img
                      src={doctor.photo ? `http://localhost:5000${doctor.photo}` : "default-profile.png"}
                      alt="Doctor"
                      className="doctor-photo"
                    />
                    <h3>Dr.{doctor.fullName}</h3>
                    <p>Speciality: {doctor.speciality}</p>
                    <p>Email: {doctor.email}</p>
                    <p>Experience: {doctor.experience && doctor.experience > 0 ? `${doctor.experience} years` : "N/A"}</p>
                    <p>Fees: {doctor.fees !== undefined ? `₹${doctor.fees}` : "N/A"}</p>
                    <button onClick={() => handleBookAppointment(doctor._id)}>Book Appointment</button>
                  </div>
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default FindDoctor;
