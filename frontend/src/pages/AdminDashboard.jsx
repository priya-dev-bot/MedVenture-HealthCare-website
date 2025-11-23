import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("Doctors");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDoctors(); // Fetch doctors on mount
  }, []);
  
  useEffect(() => {
    if (activeSection === "Appointments") {
      fetchCompletedAppointments(); // Fetch appointments only when this section is active
    }
  }, [activeSection]); // ✅ Runs only when "Appointments" is selected
  
  const [labTests, setLabTests] = useState([]);


  useEffect(() => {
    if (activeSection === "Lab Tests") {
      fetchTodaysLabTests();
    }
  }, [activeSection]);
  
  const fetchTodaysLabTests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/lab-tests/today");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Today's Lab Tests:", data);
      setLabTests(data);
    } catch (error) {
      console.error("Error fetching today's lab tests:", error.message);
      setError(error.message);
    }
  };
  
  



  // Fetch doctors from the API
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      console.log("Doctors received:", data); // ✅ Debugging log
      setDoctors(data);
    } catch (error) {
      setError("Failed to fetch doctors");
    }
  };

  // Delete doctor function with confirmation
const deleteDoctor = async (doctorId) => {
  console.log("Doctor ID to delete:", doctorId);  // Ensure the ID is logged properly.

  // Ask for confirmation before deleting
  const isConfirmed = window.confirm("Are you sure you want to delete this doctor?");
  
  if (isConfirmed) {
    try {
      // Call the API to delete the doctor using the correct _id
      const doctorResponse = await fetch(`http://localhost:5000/api/admin/doctors/${doctorId}`, {
        method: "DELETE",
      });

      if (doctorResponse.ok) {
        // Remove the deleted doctor from the UI
        setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
      } else {
        const errorData = await doctorResponse.json(); // You can check the error message from the server
        console.log("Failed to delete doctor:", errorData.message || doctorResponse.statusText); // Debugging log
        setError("Failed to delete doctor");
      }
    } catch (error) {
      console.log("Error occurred while deleting doctor:", error); // Debugging log
      setError("Error occurred while deleting doctor");
    }
  }
};


// ✅ Fetch Completed Appointments
const fetchCompletedAppointments = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/appointments/completed");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Completed Appointments:", data);
    setAppointments(data);
  } catch (error) {
    console.error("Error fetching completed appointments:", error.message);
    setError(error.message);
  }
};




  


  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <button
            className={activeSection === "Doctors" ? "active" : ""}
            onClick={() => setActiveSection("Doctors")}
          >
            Doctors
          </button>
          <button
            className={activeSection === "Appointments" ? "active" : ""}
            onClick={() => setActiveSection("Appointments")}
          >
            Appointments
          </button>
          <button
            className={activeSection === "Lab Tests" ? "active" : ""}
            onClick={() => setActiveSection("Lab Tests")}
          >
            Lab Tests
          </button>
        </nav>
      </div>

      <div className="content">
        {/* Doctors Section */}
        {activeSection === "Doctors" && (
          <div>
            <h2>Doctors List</h2>
            {error && <p className="error">{error}</p>}
            {doctors.length > 0 ? (
              <div className="doctor-list">
                {doctors.map((doctor) => (
  <div key={doctor._id} className="doctor-card">
    <img
      src={doctor.photo ? `http://localhost:5000${doctor.photo}` : "default-profile.png"}
      alt="Doctor"
      className="doctor-photo"
    />
    <div className="doctor-info">
      <h3>{doctor.fullName}</h3>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Gender:</strong> {doctor.gender}</p>
      <p><strong>Speciality:</strong> {doctor.speciality}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Fees:</strong> ₹{doctor.fees}</p>
      <p><strong>About:</strong> {doctor.aboutDoctor}</p>
    </div>
    {/* Delete button */}
    <button
      className="delete-button"
      onClick={() => deleteDoctor(doctor._id)}  // Pass the correct doctor _id
    >
      Delete
    </button>
  </div>
))}

              </div>
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        )}

        {/* Appointments Section */}
        {/* Appointments Section */}
        {activeSection === "Appointments" && (
  <div className="completed-appointments">
    <h2>Completed Appointments</h2>
    {error && <p className="error">{error}</p>}
    {appointments.length > 0 ? (
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p><strong>Doctor:</strong> {appointment.doctorName}</p>
            <p><strong>Patient Name:</strong> {appointment.userId?.fullName || "Unknown"}</p>
            <p><strong>Speciality:</strong> {appointment.speciality}</p>
            <p><strong>Fees:</strong> ₹{appointment.fees}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Reason:</strong> {appointment.reason}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No completed appointments found.</p>
    )}
  </div>
)}


{activeSection === "Lab Tests" && (
  <div className="show-lab-tests-toAdmin-container">
    <h2>Today's Lab Tests</h2>
    {error && <p className="error">{error}</p>}
    {labTests.length > 0 ? (
      <ul className="lab-test-list">
        {labTests.map((labTest) => (
          <li key={labTest._id} className="lab-test-item">
            <p><strong>Patient:</strong> {labTest.userId?.fullName || "Unknown"}</p>
            <p><strong>Date:</strong> {labTest.testDate}</p>

            <div className="test-details">
              {labTest.tests.map((test, index) => (
                <div key={index} className="single-test">
                  <p><strong>Test Name:</strong> {test.name}</p>
                  <p><strong>Price:</strong> ₹{test.price}</p>
                  <p><strong>Preparation:</strong> {test.preparation}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="no-tests">No lab tests scheduled for today.</p>
    )}
  </div>
)}




      </div>
    </div>
  );
};

export default AdminDashboard;
