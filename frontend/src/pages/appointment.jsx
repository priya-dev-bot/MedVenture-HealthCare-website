import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import "./appointment.css";

const Appointment = () => {
  const { doctorId } = useParams();
  const location = useLocation(); // Get current route location
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode") || "physical"; // Default to 'physical'
  
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  const slots = [
    "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  ];

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        setError("Error fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleConfirmAppointment = async () => {
    if (!selectedSlot) {
      alert("Please select a slot before confirming.");
      return;
    }

    if (!userId) {
      alert("Please log in first.");
      return;
    }

    const appointmentData = {
      userId,
      doctorId,
      date: new Date().toISOString().split("T")[0],
      time: selectedSlot,
      reason: mode === "video" ? "Video Consultation" : "General Checkup",
      type: mode // Store whether it's a physical or video consultation
    };

    try {
      const response = await axios.post("http://localhost:5000/api/appointments/create", appointmentData);
      if (response.status === 201) {
        setBookingMessage(`✅ Appointment confirmed successfully for a consultation!`);
      }
    } catch (error) {
      setBookingMessage("❌ The Slot is already booked. Please select another slot.");
    }
  };

  return (
    <div className="appointment-container">
      <div className="left-section">
        <h2>{mode === "video" ? "Schedule Video Consultation" : "Schedule Appointment"}</h2>
        {loading ? (
          <p>Loading doctor details...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : doctor ? (
          <div className="doctor-card">
            <img
              src={doctor.photo ? `http://localhost:5000${doctor.photo}` : "default-profile.png"}
              alt="Doctor"
              className="doctor-photo"
            />
            <h3>Dr.{doctor.fullName}</h3>
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
            <p><strong>Fees:</strong> {doctor.fees ? `₹${doctor.fees}` : "N/A"}</p>
            <p><strong>Experience:</strong> {doctor.experience ? `${doctor.experience} years` : "N/A"}</p>
            <p><strong>About:</strong> {doctor.aboutDoctor}</p>
            
            <p><label for="mode"><strong>Mode:</strong></label>
<select id="mode" name="mode">
    <option value="clinic">Visit Clinic</option>
    <option value="video">Video Consult</option>
</select></p>
          </div>
        ) : (
          <p>No doctor details found.</p>
        )}
      </div>

      <div className="right-section">
        <h3>Select a Time Slot</h3>
        <ul className="slots-list">
          {slots.map((slot, index) => (
            <li
              key={index}
              className={selectedSlot === slot ? "slot selected" : "slot"}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </li>
          ))}
        </ul>

        <div className="buttons">
          <button className="cancel" onClick={() => setSelectedSlot(null)}>Cancel</button>
          <button className="pay" onClick={handleConfirmAppointment}>Confirm</button>
        </div>
        {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
      </div>
    </div>
  );
};

export default Appointment;
