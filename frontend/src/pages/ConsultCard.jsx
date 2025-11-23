import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConsultCard.css";

const ConsultCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [speciality, setSpeciality] = useState("");
  const [fee, setFee] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const images = [
    { src: "/gallery/image1.jpg", text: "Private & Secure" },
    { src: "/gallery/image2.jpg", text: "Verified Doctors" },
    { src: "/gallery/image3.jpg", text: "Protected" },
    { src: "/gallery/image4.jpg", text: "Smooth Communication" },
  ];

  useEffect(() => {
    if (location.state?.speciality) {
      setSpeciality(location.state.speciality);
      setFee(location.state.fee);
      sessionStorage.setItem("speciality", location.state.speciality);
      sessionStorage.setItem("fee", location.state.fee);
    } else {
      setSpeciality(sessionStorage.getItem("speciality") || "");
      setFee(sessionStorage.getItem("fee") || "");
    }
  }, [location.key]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (speciality) {
      axios
        .get(`http://localhost:5000/api/doctors?speciality=${speciality}`)
        .then((response) => {
          setDoctors(response.data);
        })
        .catch((error) => console.error("Error fetching doctors:", error));
    }
  }, [speciality]);

  const handleCrossClick = () => {
    sessionStorage.removeItem("speciality");
    sessionStorage.removeItem("fee");
    navigate("/video-consult", { state: { reset: true } });
  };

  const handleContinue = () => {
    const isLoggedIn = sessionStorage.getItem("userToken");
    if (isLoggedIn) {
      navigate("/consultation-details", { state: { selectedDoctor } });
    } else {
      setIsPopupVisible(true);
    }
  };

  return (
    <div className="consult-container">
      <div className="cross-button" onClick={handleCrossClick}>✕</div>

      <h2>Consult with a Doctor</h2>
      <div className="content-wrapper">
        <div className="form-section">
          <div className="form-group">
            <label>Speciality</label>
            <select value={speciality} disabled>
              <option>{speciality ? `${speciality} - ₹${fee}` : "Select a specialty"}</option>
            </select>
          </div>

          <div className="form-group">
            <label>Patient name</label>
            <input type="text" placeholder="Enter patient name for prescriptions" />
          </div>

          <div className="form-group">
            <label>Mobile number</label>
            <input type="text" placeholder="+91 Enter mobile number" defaultValue="+91 " />
          </div>
          <p className="verification-text">A verification code will be sent to this number.</p>
          <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>

        <div className="image-gallery">
          <div className="image-container">
            <img src={images[currentImageIndex].src} alt={`Gallery Image ${currentImageIndex + 1}`} />
            <p className="image-text">{images[currentImageIndex].text}</p>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="login-popup">
          <div className="popup-content">
            <p>You need to log in first.</p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => setIsPopupVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultCard;
