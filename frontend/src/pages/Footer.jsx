import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>MedVenture</h4>
          <ul>
            <li><Link to="/about-us">About</Link></li>
            <li><Link to="/articles">Blog</Link></li>
            <li><Link to="/contuct-us">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Services for Patient</h4>
          <ul>
            <li><Link to="/find-doctor">Search for Doctor</Link></li>
            <li>Book Appointment</li>
            <li><Link to="/lab-test">Book Lab Test</Link></li>
            <li><Link to="/video-consult">Video Consultation</Link></li>
            <li><Link to="/articles">Read Healthcare Articles</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Services for Doctor</h4>
          <ul>
            <li><Link to="/profile">MedVenture Profile</Link></li>
            <li>More</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Opening Hours</h4>
          <ul>
            <li>Available 24/7</li>
          </ul>
        </div>
      </div>
        <h4>© 2017, MedVenture. All rights reserved.</h4>
    </footer>
  );
};

export default Footer;
