import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { doctorName, fees, _id, paymentstatus = "Pending" } = location.state || {
    doctorName: "Unknown",
    fees: 0,
    _id: null,
    paymentstatus: "Pending",
  };

  const [status, setStatus] = useState(paymentstatus);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Function to update payment status
  const handlePaymentSubmit = async (event) => {
    event.preventDefault(); // Prevent form reload
  
    if (!_id) {
      console.error("❌ Appointment ID is missing.");
      return;
    }
  
    try {
      console.log("📌 Sending request with appointmentId:", _id);
      const response = await axios.put(
        `http://localhost:5000/api/appointments/update-payment-status/${_id}`,
        { paymentstatus: "Completed" }
      );
  
      if (response.status === 200) {
        console.log("✅ Payment status updated successfully!");
        setStatus("Completed"); // Update UI
        alert("Payment confirmed successfully!");
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error("❌ Error updating payment status:", error);
      alert("Failed to update payment status.");
    }
  };
  
  

  return (
    <div className="payment-container">
      <div className="payment-box">
        <div className="payment-header">
          <span>TOTAL AMOUNT</span>
          <span>₹ {fees} </span>
        </div>

        <p>Doctor: <strong>{doctorName}</strong></p>
        <p>Payment Status: <strong className={status === "Completed" ? "status-completed" : "status-pending"}>{status}</strong></p>

        {!paymentSuccess ? (
          <form className="payment-body" onSubmit={handlePaymentSubmit}>
            <label className="payment-label">First Name (Optional)</label>
            <input type="text" placeholder="John" className="payment-input" />

            <label className="payment-label">Last Name</label>
            <input type="text" placeholder="Doe" className="payment-input" required />

            <label className="payment-label">Card Number</label>
            <input type="text" placeholder="•••• •••• •••• ••••" className="payment-input" required maxLength="16" />

            <label className="payment-label">CVV</label>
            <input type="text" placeholder="•••" className="payment-input" required maxLength="3" />

            <label className="payment-label">Valid Until</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select className="payment-dropdown" required>
                <option value="">Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>{String(i + 1).padStart(2, "0")}</option>
                ))}
              </select>

              <select className="payment-dropdown" required>
                <option value="">Year</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2025 + i}>{2025 + i}</option>
                ))}
              </select>
            </div>

            <div className="payment-buttons">
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit">Confirm Payment</button>


            </div>
          </form>
        ) : (
          <div className="success-container">
            <p className="success-message">✅ You have successfully paid the fees!</p>
            <button className="back-btn" onClick={() => navigate("/profile", { state: { paymentstatus: "Completed" } })}>
              Go Back to Appointments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
