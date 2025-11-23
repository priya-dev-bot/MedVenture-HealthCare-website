import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Patient',
    gender: '',
    speciality: '',
    mobileNumber: '',
    photo: null,
    timeSlots: [],
    aboutDoctor: '',
    experience: '',
    fees: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'role' && value !== 'Doctor' ? { speciality: '', experience: '', timeSlots: [], aboutDoctor: '' } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photo: null });
    setPreviewImage(null);
  };

  const handleAddTimeSlot = () => {
    if (selectedDay && newTimeSlot.trim()) {
      const slot = `${selectedDay}: ${newTimeSlot}`;
      setFormData({ ...formData, timeSlots: [...formData.timeSlots, slot] });
      setNewTimeSlot('');
      setSelectedDay('');
    }
  };

  const handleRemoveTimeSlot = (index) => {
    const updatedSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, timeSlots: updatedSlots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.gender || !formData.mobileNumber) {
      alert('Please fill out all required fields.');
      return;
    }

    if (formData.role === 'Doctor' && (!formData.speciality || formData.timeSlots.length === 0 || !formData.aboutDoctor|| !formData.fees)) {
      alert('Please complete all doctor-specific fields.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('mobileNumber', formData.mobileNumber);
    if (formData.role === 'Doctor') {
      formDataToSend.append('speciality', formData.speciality);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('aboutDoctor', formData.aboutDoctor);
      formDataToSend.append('timeSlots', JSON.stringify(formData.timeSlots));
      formDataToSend.append('fees', formData.fees);
    }
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);
      localStorage.setItem("registeredUser", JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Registration Error:', error.response || error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Enter Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        <input
  type="password"
  name="password"
  placeholder="Create Password"
  value={formData.password}
  onChange={handleChange}
  required
  pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
  title="Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
/>


        <input type="number" name="mobileNumber" placeholder="Enter mobile number" value={formData.mobileNumber} onChange={handleChange} required />

        <div className="dropdown-container">
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </label>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        {formData.role === 'Doctor' && (
          <>
            <label>
              Speciality:
              <select name="speciality" value={formData.speciality} onChange={handleChange} required>
                <option value="">Select Speciality</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="General Physician">General Physician</option>
                <option value="Dietitian">Dietitian</option>
                <option value="Sexologist">Sexologist</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Urologist">Urologist</option>
                 
                <option value="Gastroenterologist">Gastroenterologist</option>
                
                <option value="Urologic">Urologic</option>
                <option value="Dentist">Dentist</option>
                
                 
                
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
  Experience:
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <input
      type="number"
      name="experience"
      placeholder="Experience"
      value={formData.experience}
      onChange={handleChange}
      required
      min="0"
      style={{ width: "80px" }}
    />
    <span>years</span>
  </div>
</label>

<label>
  Fees:
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <input
      type="number"
      name="fees"
      placeholder="Fees"
      value={formData.fees}
      onChange={handleChange}
      required
      min="0"
      style={{ width: "80px" }}
    />
    <span>Rupees</span>
  </div>
</label>    


            <label>
              About Doctor:
              <textarea name="aboutDoctor" placeholder="Tell us about yourself" value={formData.aboutDoctor} onChange={handleChange} required />
            </label>

            <label>
              Available Time Slots:
              <div className="time-slot-container">
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input type="text" value={newTimeSlot} onChange={(e) => setNewTimeSlot(e.target.value)} placeholder="e.g. 10:00 AM - 12:00 PM" />
                <button type="button" onClick={handleAddTimeSlot}>Add Slot</button>
              </div>
            </label>
            <ul>
              {formData.timeSlots.map((slot, index) => (
                <li key={index}>{slot} <button type="button" onClick={() => handleRemoveTimeSlot(index)}>Remove</button></li>
              ))}
            </ul>
          </>
        )}

        <label>
          Upload Photo:
          <input name="photo" type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {previewImage && (
          <div className="image-preview-container">
            <img src={previewImage} alt="Uploaded" className="uploaded-image" />
            <button type="button" onClick={handleRemoveImage}>Remove Image</button>
          </div>
        )}

        <button type="submit" className="signup-button">Sign-Up</button>
        <p>Already have an Account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
