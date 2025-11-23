import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [submittedPrescriptions, setSubmittedPrescriptions] = useState({}); // ✅ Track submitted prescriptions
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("Profile");
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState({});

  useEffect(() => {
    if (!user || user.role !== "Doctor") {
      navigate("/login");
      return;
    }
    fetchAppointments();
    fetchDoctorDetails();
  }, [user, navigate]);



  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${user.id}`);
      const data = await response.json();
  
      if (response.ok) {
        setDoctorDetails(data);
      } else {
        console.error("❌ Error fetching doctor details:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching doctor details:", error);
    }
  };


  // Fetch Appointments
const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/doctor/${user.id}`);
      const data = await response.json();
  
      if (response.ok) {
        setAppointments(data);
  
        // ✅ Check for existing prescriptions and mark them as submitted
        const submittedMap = {};
        data.forEach(appointment => {
          if (appointment.prescription) {
            submittedMap[appointment._id] = true;
          }
        });
        setSubmittedPrescriptions(submittedMap);
      } else {
        setError(data.message || "Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
      setError("Internal server error. Please try again later.");
    }
  };
  

  // Handle prescription input change
  const handlePrescriptionChange = (appointmentId, value) => {
    setPrescriptions((prev) => ({
      ...prev,
      [appointmentId]: value,
    }));
  };

  // Submit prescription
  const submitPrescription = async (appointmentId) => {
    if (!appointmentId || !prescriptions[appointmentId]?.trim()) {
      console.error("⚠️ Invalid appointment ID or empty prescription!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/prescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prescription: prescriptions[appointmentId] }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Prescription submitted successfully:", data);
        alert("Prescription saved!");

        // ✅ Mark this appointment as submitted to hide textarea & button
        setSubmittedPrescriptions((prev) => ({
          ...prev,
          [appointmentId]: true,
        }));
      } else {
        console.error("❌ Error submitting prescription:", data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting prescription:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-header">
          <img
            src={user.photo ? (user.photo.startsWith("http") ? user.photo : `http://localhost:5000${user.photo}`) : "/default-avatar.png"}
            alt="User"
            className="profile-image"
          />
          <p>{user.email}</p>
          <p>{user.fullName || "Name not available"}</p>
        </div>

        <nav>
          <button className={activeSection === "Profile" ? "active" : ""} onClick={() => setActiveSection("Profile")}>Profile</button>
          <button className={activeSection === "My Appointments" ? "active" : ""} onClick={() => setActiveSection("My Appointments")}>My Appointments</button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="content">
      {activeSection === "Profile" && (
  <div className="doctor-profiles">
    <h2>Doctor Profile</h2>
    <div className="profile-detail">
    <p><strong>Full Name:</strong> {user.fullName || "Not available"}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Mobile Number:</strong> {doctorDetails.mobileNumber || "Not available"}</p>
<p><strong>Gender:</strong> {doctorDetails.gender || "Not specified"}</p>
<p><strong>Speciality:</strong> {doctorDetails.speciality || "Not specified"}</p>
<p><strong>Experience:</strong> {doctorDetails.experience ? `${doctorDetails.experience} years` : "Not available"}</p>
<p><strong>Fees:</strong> {doctorDetails.fees ? `₹${doctorDetails.fees}` : "Not specified"}</p>
<p><strong>About:</strong> {doctorDetails.aboutDoctor || "No details provided"}</p>

    </div>
  </div>
)}

        {activeSection === "My Appointments" && (
          <div>
            <h2>My Appointments</h2>
            {error && <p className="error-message">{error}</p>}
            {appointments.filter(appointment => appointment.paymentstatus === "Completed").length > 0 ? (
              <ul className="appointment-list">
                {appointments
                  .filter(appointment => appointment.paymentstatus === "Completed")
                  .map((appointment) => (
                    <li key={appointment._id} className="appointment-item">
                      <p><strong>Patient Name:</strong> {appointment.userId?.fullName || "Unknown"}</p>
                      <p><strong>Phone Number:</strong> {appointment.userId?.mobileNumber || "Not Available"}</p>
                      <p><strong>Email ID:</strong> {appointment.userId?.email || "Not Available"}</p>
                      <p className="fees"><strong>Fees:</strong> ₹{appointment.fees}</p>
                      <p><strong>Date:</strong> {appointment.date}</p>
                      <p><strong>Time:</strong> {appointment.time}</p>
                      {/* Display Feedback if available */}
          {appointment.feedback ? (
            <div className="feedback-section">
              <p><strong>Feedback:</strong> {appointment.feedback.text}</p>
              <p><strong>Rating:</strong> ⭐{appointment.feedback.rating}/5</p>
            </div>
          ) : (
            <p><strong>Feedback:</strong> No feedback given</p>
          )}
                    
                      <p><strong>Prescription:</strong> {appointment.prescription}</p>

                      {/* ✅ Show textarea and button only if prescription is missing */}
        {!submittedPrescriptions[appointment._id] && (
          <>
            <textarea 
              value={prescriptions[appointment._id] || ""}
              onChange={(e) => handlePrescriptionChange(appointment._id, e.target.value)}
              placeholder="Enter prescription here"
            />
            <button onClick={() => submitPrescription(appointment._id)}>Submit Prescription</button>
          </>
        )}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No completed appointments found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
