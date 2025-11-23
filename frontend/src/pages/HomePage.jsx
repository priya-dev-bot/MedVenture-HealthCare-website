import React from 'react';
import './HomePage.css';
import Footer from "./Footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <div class="container">
  <h1>MedVenture: Connecting Care, Anytime, Anywhere.
  Where Healing Meets Innovation.</h1>
  <div className="img">
    <img src="image.png" />
  </div>
</div>
      <main>
        <div class="card-container">
                <div class="card">
                <Link to="/video-consult">
  <img src="doctorVC.png" alt="Free Video Consultation" />
  <p>Free Video Consultation</p>
</Link>
                </div>
                <div class="card">
                  <Link to="/find-doctor">
                  <img src="doctor1.jpg" alt="Find Doctor" />
                  <p>Find Doctor</p>
</Link>
                </div>
                <div class="card">
                <Link to="/lab-test">
                    <img src="doctorLT.jpg" alt="Find Doctor" />
                    <p>Lab Test</p>
                    </Link>
                    </div>
                <div class="card">
                <Link to="/profile">
                    <img src="doctorBA.png" alt="Book Appointment" />
                    <p>Profile</p>
                    </Link>
                </div>
                
            </div>

            <div className="testimonials">
  <h2>What Our Users Have to Say</h2>
  <div className="testimonial-container">
    <div className="testimonial-card">
      <p>"Finding the right doctor has never been this easy! MedVenture made it possible for me to consult a specialist within minutes."</p>
      <p>- Priya</p>
    </div>
    <div className="testimonial-card">
      <p>"The video consultation feature is a game-changer. I got medical advice without stepping out of my house!"</p>
      <p>- Ravi</p>
    </div>
    <div className="testimonial-card">
      <p>"Lab test booking is so convenient. I could book my tests and receive the reports online seamlessly."</p>
      <p>- Ayesha</p>
    </div>
    <div className="testimonial-card">
      <p>"The user-friendly interface and quick access to doctors make MedVenture my go-to healthcare app."</p>
      <p>- Karan</p>
    </div>
  </div>
</div>

<div className="specialists">
  <h2>Meet Our Specialists</h2>
  <div className="specialist-grid">
    <div className="specialist-card">
      <img src="specialist1.jpg" alt="Dr. Anjali Sharma" />
      <h3>Dr. Anjali Sharma</h3>
      <p>Cardiologist</p>
    </div>
    <div className="specialist-card">
      <img src="specialist2.jpg" alt="Dr. Rohan Mehta" />
      <h3>Dr. Rohan Mehta</h3>
      <p>Orthopedic Surgeon</p>
    </div>
    <div className="specialist-card">
      <img src="specialist3.jpg" alt="Dr. Priya Kapoor" />
      <h3>Dr. Priya Kapoor</h3>
      <p>Pediatrician</p>
    </div>
    <div className="specialist-card">
      <img src="specialist4.jpg" alt="Dr. Sameer Khan" />
      <h3>Dr. Sameer Khan</h3>
      <p>Neurologist</p>
    </div>
  </div>
</div>

      </main>

      <footer>
      <Footer />
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default HomePage; 