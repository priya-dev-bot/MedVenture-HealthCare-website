import React from "react";
import "./aboutus.css";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="aboutus">
      <div className="aboutus-container">
        <div className="banner">
          <img src="/about-as-banner.jpg" alt="Health Checkup Banner" className="banner-image" />
        </div>
        <h1 className="heading">About MedVenture</h1>
        <p className="aboutus-description">
          MedVenture is a healthcare platform dedicated to making healthcare
          accessible and convenient for everyone. We provide a range of services
          including doctor consultations, lab tests, medical appointments, and more.
        </p>

        <div className="aboutus-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to revolutionize the healthcare experience by
            connecting patients with experienced doctors, enabling easy access
            to medical services, and ensuring the highest quality of care.
          </p>
        </div>

        <div className="aboutus-vision">
          <h2>Our Vision</h2>
          <p>
            At MedVenture, we envision a world where quality healthcare is accessible
            to everyone, no matter their location or financial situation. We aim to
            bridge the gap between patients and healthcare providers with technology.
          </p>
        </div>

        <div className="aboutus-team">
          <h2>Our Team</h2>
          <p>
            We are a group of passionate professionals committed to improving
            the healthcare industry. Our team consists of doctors, healthcare
            experts, and technology enthusiasts working together to bring the
            best services to you.
          </p>
        </div>

        <div className="aboutus-why-choose">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Experienced and certified healthcare professionals</li>
            <li>✔ Easy appointment booking and teleconsultations</li>
            <li>✔ Secure and user-friendly platform</li>
            <li>✔ Affordable healthcare solutions</li>
            <li>✔ 24/7 support for patients and doctors</li>
          </ul>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUs;
