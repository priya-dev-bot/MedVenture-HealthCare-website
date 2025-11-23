import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css"; // ✅ Import the CSS file

const Checkout = () => {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };
  const navigate = useNavigate();

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user")) || JSON.parse(localStorage.getItem("user"));
  const token = sessionStorage.getItem("userToken") || localStorage.getItem("userToken");

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!user || !token) {
      alert("⚠️ You must be logged in to place an order.");
      navigate("/login");
    }
  }, [user, token, navigate]);

  const handleConfirm = async () => {
    if (!userId) {
      alert("⚠️ User ID is missing. Please log in again.");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/lab-orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          tests: cart,
          totalPrice: total + 150,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmationMessage("✅ Your consultation was successful! Redirecting to home...");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert("❌ Order failed: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("❌ Server error! Please try again later.");
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">🛍 Checkout</h2>

      {confirmationMessage && <p className="success-message">{confirmationMessage}</p>}

      <div className="checkout-items">
        {cart.length === 0 ? (
          <p className="empty-cart">🛒 Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="checkout-item">
                <h3>{item.name}</h3>
                <p><strong>Preparation:</strong> {item.preparation}</p>
                <p className="price">₹{item.price}</p>
              </div>
            ))}
            <div className="checkout-summary">
              <p><strong>Pick up charges:</strong> ₹150</p>
              <p className="total-price"><strong>Total:</strong> ₹{total + 150}</p>
            </div>
            <button className="confirm-button" onClick={handleConfirm}>✅ Confirm Order</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
