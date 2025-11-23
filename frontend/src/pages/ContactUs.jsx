import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <div className="contact-form-map-container">
                <div className="contact-form">
                    <h2>Get in Touch with Us</h2>
                    <p>Have questions, feedback, or need assistance? We’re here to help! Feel free to 
                        reach out to us using the form below, or connect with us directly via email or phone. 
                        We’ll get back to you as soon as possible!.</p>
                </div>
                <div className="map">
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15077.726202239713!2d72.81942094999999!3d19.0760905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf2e44aeb2d7%3A0x1dfc5cda94645b1b!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1709700000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
    ></iframe>
</div>

            </div>
            <div className="contact-info">
            <div className="contact-info">
                <div className="info-box address">
                <h3>Address</h3>
                <p>#21, Linking Road, Near Bandra Station,</p>
                <p>Bandra West, Mumbai,</p>
                <p>Maharashtra, India - 400050</p>
                </div>
                <div className="info-box phone-numbers">
                    <h3>Phone Numbers</h3>
                    <p>+91 9833934582</p>
                    <p>+91 9819404784</p>
                </div>
                <div className="info-box emails">
                    <h3>Emails</h3>
                    <p>chetan@gmail.com</p>
                    <p>priyankajatoliya10@gmail.com</p>
                </div>
                <div className="info-box working-hours">
                    <h3>Working Hours</h3>
                    <p>Mon-Sat: 9.30am to 7.00pm</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ContactUs;