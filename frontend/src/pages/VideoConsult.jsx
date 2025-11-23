import React, { useState } from "react"; // Import React and useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./VideoConsult.css"; // Import CSS
import Footer from "./Footer"; // Import Footer component

function VideoConsult() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [doctors, setDoctors] = useState([]);

  

  // Function to handle "Consult now" click for specialties
  const handleConsultNow = (speciality) => {
    navigate(`/consultationlist?speciality=${encodeURIComponent(speciality)}`);
  };
  
  
  
  // Function to handle disease card click
  const diseaseToSpecialty = {
    "Cold & Flu": "General Physician",
    "Want to lose Weight": "Dietitian",
    "Headache": "General Physician",
    "Stomach Ache": "Gastroenterologist",
    "depression or anxiety": "Psychiatrist",
    "Skin Issues": "Dermatologist",
    "Diabetes": "Endocrinologist",
    "Urologic": "Urologist"
  };

  // Function to handle disease clicks
const handleDiseaseClick = (disease) => {
  const specialty = diseaseToSpecialty[disease] || "General Physician"; // Default to General Physician if not found
  handleConsultNow(specialty);
};

  return (
    <div className="videoconsult">
      <div className="vc-container">
        <h1>Video Consultation: Expert Care at Your Fingertips</h1>
        <div className="vc-img">
          <img src="v1.png" alt="Video Consultation" />
        </div>
      </div>

      <main>
        {/* Specialties Section */}
        <section className="specialities-section">
          <h2>Our Specialities</h2>
          <div className="specialities-grid">
            <div className="speciality-card">
              <img src="icon1.png" alt="Gynecology" />
              <h3>Gynecology</h3>
              <p className="price">₹499</p>
              <button onClick={() => handleConsultNow("Cardiologist")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="dentist-logo.png" alt="Urology" />
              <h3>Dentist</h3>
              <p className="price">₹399</p>
              <button onClick={() => handleConsultNow("Dentist")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon2.png" alt="Sexology" />
              <h3>Sexology</h3>
              <p className="price">₹499</p>
              <button onClick={() => handleConsultNow("Sexologist")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon3.png" alt="General Physician" />
              <h3>General Physician</h3>
              <p className="price">₹399</p>
              <button onClick={() => handleConsultNow("General Physician")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon4.png" alt="Dermatology" />
              <h3>Dermatology</h3>
              <p className="price">₹449</p>
              <button onClick={() => handleConsultNow("Dermatologist")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon5.png" alt="Psychiatry" />
              <h3>Psychiatry</h3>
              <p className="price">₹499</p>
              <button onClick={() => handleConsultNow("Psychiatrist")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon6.png" alt="Stomach and Digestion" />
              <h3>Stomach & Digestion</h3>
              <p className="price">₹399</p>
              <button onClick={() => handleConsultNow("Gastroenterologist")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon7.png" alt="Pediatrics" />
              <h3>Pediatrics</h3>
              <p className="price">₹399</p>
              <button onClick={() => handleConsultNow("Pediatrician")}>Consult Now</button>


            </div>
            <div className="speciality-card">
              <img src="icon8.png" alt="Urology" />
              <h3>Urology</h3>
              <p className="price">₹399</p>
              <button onClick={() => handleConsultNow("Urologist")}>Consult Now</button>


            </div>
          </div>
        </section>

        {/* List of Diseases Section */}
        <section className="diseases-section">
          <h2>Consult for Common Diseases</h2>
          <div className="diseases-grid">
            <div className="disease-card" onClick={() => handleDiseaseClick("Cold & Flu")}>
              <img src="cold and flu.png" alt="Cold & Flu" />
              <h3>Cold & Flu</h3>
              <p>Get treatment for common<br />cold and flu symptoms.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("Want to lose Weight")}>
              <img src="lose-weight.png" alt="Fever" />
              <h3>Want to lose Weight</h3>
              <p>Consult for high fever<br />and related symptoms.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("Headache")}>
              <img src="headache.png" alt="Headache" />
              <h3>Headache</h3>
              <p>Find relief for <br />persistent headaches.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("Stomach Ache")}>
              <img src="stomach-issues.png" alt="Stomach Ache" />
              <h3>Stomach Ache</h3>
              <p>Get advice for stomach<br />pain and discomfort.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("depression or anxiety")}>
              <img src="depression.png" alt="Allergies" />
              <h3>depression or anxiety</h3>
              <p>Manage your allergy <br />symptoms effectively.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("Skin Issues")}>
              <img src="skin-problems.png" alt="Skin Issues" />
              <h3>Skin Issues</h3>
              <p>Consult for various<br />skin conditions.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("Diabetes")}>
              <img src="diabetes.png" alt="Diabetes" />
              <h3>Diabetes</h3>
              <p>Get expert advice on<br />managing diabetes.</p>
            </div>
            <div className="disease-card" onClick={() => handleDiseaseClick("Urologist")}>
              <img src="urology.png" alt="Hypertension" />
              <h3>Urologic</h3>
              <p>Consult for Kidney Stones.</p>
            </div>
          </div>
        </section>

        {/* Steps to Use Section */}
        <section className="vc-steps">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <h3>1. Register</h3>
              <p>Create an account or log in to access video consultations.</p>
            </div>
            <div className="step">
              <h3>2. Book Appointment</h3>
              <p>Select a time slot and book your consultation with ease.</p>
            </div>
            <div className="step">
              <h3>3. Join Session</h3>
              <p>Join the video consultation via the provided secure link.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <div className="vc-testimonials">
          <h2>What Users Say</h2>
          <div className="testimonial-container">
            <div className="testimonial-card">
              <p>"Video consultations saved me time and provided expert care at home!"</p>
              <p>- Anil</p>
            </div>
            <div className="testimonial-card">
              <p>"Connecting with doctors has never been this convenient."</p>
              <p>- Meera</p>
            </div>
          </div>
        </div>
        <div className="video-consult-container">
          <h2>Benefits of Online Consultation</h2>
          <div className="benefits-box">
            <div className="benefit-item">
              <h3>Consult Top Doctors 24x7</h3>
              <p>
                Comment instantly with a 24x7 specialist or<br />
                Start an instant consultation within 2 minutes.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Fully Private and Secured</h3>
              <p>
                Be assured that your online consultation will be<br />
                fully private and secured.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Similar Clinic Experience</h3>
              <p>
                Experience clinic-like consultation through a<br />
                video call with the doctor. Video consultation is<br />
                available only on the Pracito app.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Free Follow-up</h3>
              <p>
                Get a valid digital prescription and a 7-day, free<br />
                follow-up for further clarifications.
              </p>
            </div>
            <div className="benefit-item">
              <h3>100% Safe Consultations</h3>
              <p>
                Be assured that your online consultation will be<br />
                fully private and secured.
              </p>
            </div>
          </div>
        </div>
        <div className="faq-container">
          <h2>FAQs</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What is online doctor consultation?</h3>
              <p>Online doctor consultation allows patients to connect with healthcare professionals through video calls, chats, or phone calls. It provides medical advice, prescriptions, and guidance without needing a physical visit to a clinic or hospital.</p>
            </div>
            <div className="faq-item">
              <h3>Are your online doctors qualified?</h3>
              <p>Yes, all doctors on MedVenture are qualified and verified professionals. They are registered with recognized medical councils and have undergone thorough background checks before being listed on our platform. You can also view a doctor's credentials, experience, and patient reviews before booking a consultation.</p>
            </div>
            <div className="faq-item">
              <h3>How do I book an appointment with a doctor?</h3>
              <p>You can book an appointment by selecting a doctor from our list, choosing a suitable date and time, and confirming your appointment. </p>
            </div>
            <div className="faq-item">
              <h3>Is online consultation safe and secure?</h3>
              <p>Yes, our platform uses encryption and follows strict privacy policies to ensure that all consultations and patient information remain confidential and secure.</p>
            </div>
            <div className="faq-item">
              <h3>Can I get a prescription from an online consultation?</h3>
              <p>Yes, if the doctor deems it necessary, they can provide a digital prescription that you can use to buy medicines or get further treatment.</p>
            </div>
            <div className="faq-item">
              <h3>Can I consult a doctor for emergency situations?</h3>
              <p>No, online consultations are not meant for medical emergencies. If you are experiencing a life-threatening condition, please visit the nearest hospital or call emergency services immediately.</p>
            </div>
            <div className="faq-item">
              <h3>What specialties are available for consultation?</h3>
              <p>Our platform provides consultations with specialists in General Medicine, Dermatology, Gynecology, Pediatrics, Cardiology, Psychiatry, and many other fields.</p>
            </div>
            <div className="faq-item">
              <h3>Do I need to create an account to book an appointment?</h3>
              <p>Yes, creating an account helps manage your medical history, appointments, and prescriptions easily. It also ensures secure communication with doctors.</p>
            </div>
            <div className="faq-item">
              <h3>Are video consultations recorded?</h3>
              <p>No, for privacy reasons, video consultations are not recorded. However, the doctor may maintain notes for medical purposes.</p>
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

export default VideoConsult; 