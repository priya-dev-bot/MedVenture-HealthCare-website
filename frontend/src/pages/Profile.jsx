import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [labTests, setLabTests] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("Lab Tests");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchLabTests();
    fetchAppointments();
  }, [user, navigate]);

  // Fetch Lab Tests
  const fetchLabTests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/lab-orders/tests/user/${user.id}`);
      const data = await response.json();
      if (response.ok) {
        setLabTests(data);
      } else {
        setError(data.message || "Failed to fetch lab tests.");
      }
    } catch (error) {
      console.error("❌ Error fetching lab tests:", error);
      setError("Internal server error. Please try again later.");
    }
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/user/${user.id}`);
      const data = await response.json();
      if (response.ok) {
        setAppointments(data);
      } else {
        setError(data.message || "Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
      setError("Internal server error. Please try again later.");
    }
  };

  // Delete Lab Test
  const deleteLabTest = async (testId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lab test?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/lab-orders/tests/${testId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLabTests(labTests.filter((test) => test._id !== testId));
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete lab test.");
      }
    } catch (error) {
      console.error("❌ Error deleting lab test:", error);
      setError("Internal server error. Please try again later.");
    }
  };

  // Delete Appointment
  const deleteAppointment = async (appointmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete appointment.");
      }
    } catch (error) {
      console.error("❌ Error deleting appointment:", error);
      setError("Internal server error. Please try again later.");
    }
  };


  
  const submitFeedback = async (appointmentId, feedbackText, rating) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, text: feedbackText, rating }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("✅ Feedback submitted:", data);
  
        // Update state to reflect feedback submission
        setAppointments(appointments.map(a =>
          a._id === appointmentId ? { ...a, feedbackSubmitted: true } : a
        ));
        
        alert("✅ Your feedback was successfully stored!");
      } else {
        console.error("❌ Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Failed to submit feedback:", error);
    }
  };
  
  if (!user) return null;

  return (
    <div className="profile-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="profile-header">
          <img
            src={user.photo ? (user.photo.startsWith("http") ? user.photo : `http://localhost:5000${user.photo}`) : "/default-avatar.png"}
            alt="User"
            className="profile-image"
          />
          <p>{user.email}</p>
          <p className="fullnames">{user.fullName || "name not available"}</p>
        </div>

        <nav>
          <button className={activeSection === "Lab Tests" ? "active" : ""} onClick={() => setActiveSection("Lab Tests")}>Lab Tests</button>
          <button className={activeSection === "Online Consultation" ? "active" : ""} onClick={() => setActiveSection("Online Consultation")}>Online Consultation</button>
          <button className={activeSection === "Feedback" ? "active" : ""} onClick={() => setActiveSection("Feedback")}>Feedback</button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="content">
        {/* Lab Tests Section */}
        {activeSection === "Lab Tests" && (
  <div>
    <h2>Lab Tests</h2>
    {error && <p className="error-message">{error}</p>}

    {/* Check if any test is scheduled for today */}
    {labTests.some(test => {
      const createdAtDate = test.createdAt ? new Date(test.createdAt) : null;
      const testDate = createdAtDate ? new Date(createdAtDate.getTime() + 2 * 24 * 60 * 60 * 1000) : null;
      const today = new Date();
today.setHours(0, 0, 0, 0);
 // Get current date in same format
 console.log("Created At:", createdAtDate);
  console.log("Test Date:", testDate);
  console.log("Today's Date:", today);
  console.log("Comparison:", testDate && testDate.toDateString() === today.toDateString());

 return testDate && testDate.toDateString() === today.toDateString();

    }) && (
      <p className="highlight-message">You have a lab test scheduled for today!</p>
    )}

    {labTests.length > 0 ? (
      <ul className="lab-test-list">
        {labTests.map((test) => {
  const createdAtDate = test.createdAt ? new Date(test.createdAt) : null;
  const testDate = test.testDate ? new Date(test.testDate) : null; // Use stored testDate directly

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure only the date is compared

  console.log("Created At:", createdAtDate);
  console.log("Test Date (Stored in DB):", testDate);
  console.log("Today's Date:", today);
  console.log("Comparison Result:", testDate && testDate.toDateString() === today.toDateString());

  return (
    <li key={test._id} className="lab-test-item">
      <p><strong>Test Name:</strong> {test.name}</p>
      <p><strong>Price:</strong> ₹{test.price}</p>
      <p><strong>Preparation:</strong> {test.preparation}</p>
      <p><strong>Date:</strong> {createdAtDate ? createdAtDate.toLocaleDateString() : "N/A"}</p>
      <p><strong>Test Date:</strong> {testDate ? testDate.toLocaleDateString() : "N/A"}</p>
      <button className="delete-btn" onClick={() => deleteLabTest(test._id)}>🗑 Delete</button>
    </li>
  );
})}


      </ul>
    ) : (
      <p>No lab tests found.</p>
    )}
  </div>
)}


        {/* Online Consultation Section */}
        {activeSection === "Online Consultation" && (
          <div>
            <h2>Online Consultation</h2>
            {error && <p className="error-message">{error}</p>}
            {appointments.length > 0 ? (
              <ul className="appointment-list">
                {appointments.map((appointment) => (
                  <li key={appointment._id} className="appointment-item">
                    <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
                    <p><strong>Speciality:</strong> {appointment.speciality}</p>
                    <p className="fees"><strong>Fees:</strong> ₹{appointment.fees}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p className="fees"><strong>Payment Status:</strong> {appointment.paymentstatus}</p>
                    <p><strong>prescription:</strong> {appointment.prescription}</p>

                    {appointment.paymentstatus === "Completed" ? (
                      <p className="success-message">
                        ✅ Your appointment was successfully booked. You have your online consultation on {appointment.date} at {appointment.time}.
                      </p>
                    ) : (
                      <>
                        <button className="delete-btn" onClick={() => deleteAppointment(appointment._id)}>🗑 Delete</button>
                        <button
                          className="payment-btn"
                          onClick={() => navigate("/payment", { 
                            state: { 
                              doctorName: appointment.doctorName, 
                              fees: appointment.fees,
                              _id: appointment._id,
                              paymentstatus: appointment.paymentstatus,
                              prescription:appointment.prescription
                            } 
                          })}
                        >
                          Payment
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No online consultations found.</p>
            )}
          </div>
        )}

{activeSection === "Feedback" && (
  <div>
    <h2>Feedback Section</h2>
    {error && <p className="error-message">{error}</p>}

    {appointments.filter(appointment => appointment.paymentstatus === "Completed").length > 0 ? (
      <ul className="appointment-list">
        {appointments
          .filter(appointment => appointment.paymentstatus === "Completed")
          .map((appointment) => (
            <li key={appointment._id} className="appointment-item">
              <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
              <p><strong>Speciality:</strong> {appointment.speciality}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>

              {!appointment.showFeedback && !appointment.feedback?.text ? (
                <button
                  className="feedback-btn"
                  onClick={() => setAppointments(appointments.map(a =>
                    a._id === appointment._id ? { ...a, showFeedback: true, rating: 0, feedbackText: "" } : a
                  ))}
                >
                  ✍ Give Feedback
                </button>
              ) : (
                <div className="feedback-form">
                  {!appointment.feedback?.text ? (
                    <>
                      <textarea
                        placeholder="Write your feedback here..."
                        value={appointment.feedbackText || ""}
                        onChange={(e) => setAppointments(appointments.map(a =>
                          a._id === appointment._id ? { ...a, feedbackText: e.target.value } : a
                        ))}
                      />

                      {/* Star Rating Component */}
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= appointment.rating ? "star selected" : "star"}
                            onClick={() => setAppointments(appointments.map(a =>
                              a._id === appointment._id ? { ...a, rating: star } : a
                            ))}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <button
                        className="submit-btn"
                        onClick={async () => {
                          try {
                            const response = await fetch(`http://localhost:5000/api/appointments/${appointment._id}/feedback`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                userId: appointment.userId,
                                text: appointment.feedbackText,
                                rating: appointment.rating, // Use the selected rating
                              })
                            });

                            if (response.ok) {
                              setAppointments(appointments.map(a =>
                                a._id === appointment._id ? { 
                                  ...a, 
                                  feedback: { text: a.feedbackText, rating: a.rating, submittedAt: new Date() },
                                  showFeedback: false
                                } : a
                              ));
                              alert("✅ Feedback submitted successfully!");
                            } else {
                              setError("Failed to submit feedback.");
                            }
                          } catch (error) {
                            console.error("❌ Error submitting feedback:", error);
                            setError("Internal server error. Please try again later.");
                          }
                        }}
                      >
                        Submit
                      </button>
                    </>
                  ) : (
                    <p className="success-message">✅ Your feedback was submitted successfully.</p>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    ) : (
      <p>No completed appointments available for feedback.</p>
    )}
  </div>
)}
      </div>
    </div>
  );
};

export default Profile;
