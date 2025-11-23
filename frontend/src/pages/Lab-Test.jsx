import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Lab-Test.css';
import { FaShoppingCart } from 'react-icons/fa';

const LabTest = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  // Retrieve logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const tests = [
    { name: 'Thyroid Profile', details: 'Known as Thyroid Profile Total Blood', price: 400, preparation: 'Fasting not required' },
    { name: 'Blood Count', details: 'Known as Complete Blood Count Automated Blood', price: 300, preparation: 'Fasting not required' },
    { name: 'Lipid Profile Test', details: 'Known as Lipid Profile Blood', price: 434, preparation: 'Fast for 9-12 hours' },
    { name: 'Liver Function Test', details: 'Known as Liver Function Tests Blood', price: 673, preparation: 'Fasting not required' },
    { name: 'HbA1c', details: 'Known as Glycosylated Haemoglobin Blood', price: 300, preparation: 'Fasting not required' },
    { name: 'Vitamin B 12', details: 'Known as Vitamin B12 Conventional Blood', price: 490, preparation: 'Fasting not required' },
  ];

  const healthPackages = [
    { name: 'Basic Women\'s Health Checkup', details: 'Ideal for individuals aged 15-40 years, 85 tests included', originalPrice: 4400, discountedPrice: 1099 },
    { name: 'Vitamin Deficiency Health Checkup', details: 'Ideal for individuals aged 11-80 years, 5 tests included', originalPrice: 2000, discountedPrice: 899 },
    { name: 'Young Indian Health Checkup', details: 'Ideal for individuals aged 15-40 years, 84 tests included', originalPrice: 5000, discountedPrice: 899 },
  ];

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (test) => {
    if (cart.find((item) => item.name === test.name)) {
      setCart(cart.filter((item) => item.name !== test.name));
    } else {
      setCart([...cart, test]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    if (!user) {
      setShowLoginPopup(true);
    } else if (user.role === "Doctor") {  
      alert("❌ Doctors cannot purchase lab tests.");
    } else {
      navigate('/checkout', { state: { cart, total: calculateTotal() + 150, userId: user._id } });
    }
  };
  const handleBookNow = (packageItem) => {
    if (!user) {
      setShowLoginPopup(true);
    } else if (user.role === "Doctor") {  
      alert("❌ Doctors cannot purchase lab tests.");
    } else {
      navigate('/checkout', { 
        state: { 
          cart: [{ name: packageItem.name, price: packageItem.discountedPrice, details: packageItem.details }],
          total: packageItem.discountedPrice,
          userId: user._id 
        }
      });
    }
  };

  return (
    <div className="lab-test-page">
      <div className="banner">
        <img src="/lab-test/banner.png" alt="Health Checkup Banner" className="banner-image" />
      </div>
      <header>
        <div className="cart-icon-container">
          <div className="cart-icon" onClick={toggleCart}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <sup className="cart-count">{cart.length}</sup>
            )}
          </div>
        </div>
      </header>

      <main>
        <div className="lab-tests-container">
          <h2>Top Booked Diagnostic Tests</h2>
          <div className="tests-row">
            {tests.map((test, index) => (
              <div key={index} className="test-card">
                <h3>{test.name}</h3>
                <p>{test.details}</p>
                <p>E-Reports on same day</p>
                <p className="price">₹{test.price}</p>
                <button 
                  className="add-button" 
                  onClick={() => addToCart(test)}
                >
                  {cart.find((item) => item.name === test.name) ? "REMOVE" : "ADD"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showCart && (
          <div className="cart-modal">
            <h2>Your Cart ({cart.length} Test{cart.length !== 1 ? 's' : ''})</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <h3>{item.name}</h3>
                    <p><strong>Preparation:</strong> {item.preparation}</p>
                    <p className="price">₹{item.price}</p>
                  </div>
                ))}
                <div className="cart-summary">
                  <p><strong>Pick up charges:</strong> ₹150</p>
                  <p><strong>Total:</strong> ₹{calculateTotal() + 150}</p>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
              </div>
            )}
            <button className="close-button" onClick={toggleCart}>Close</button>
          </div>
        )}

        {showLoginPopup && (
          <div className="login-popup">
            <p>You need to log in first to proceed to checkout.</p>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        )}

        <div className="image-section">
          <h2>Popular Health Checkup Packages</h2>
          <div className="featured-checkups">
            {healthPackages.map((packageItem, index) => (
              <div key={index} className="checkup-card">
                <img src={`/lab-test/${packageItem.name.replace(/\s+/g, '-')}.png`} alt={packageItem.name} className="checkup-image" />
                <h3>{packageItem.name}</h3>
                <p>{packageItem.details}</p>
                <div className="price-container">
                  <span className="original-price">₹{packageItem.originalPrice}</span>
                  <span className="discounted-price">₹{packageItem.discountedPrice}</span>
                  <span className="discount">{Math.round((1 - packageItem.discountedPrice / packageItem.originalPrice) * 100)}% off</span>
                </div>
                <button className="book-now" onClick={() => handleBookNow(packageItem)}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LabTest;
