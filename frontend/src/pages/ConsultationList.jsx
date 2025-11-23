import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./DoctorList.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const speciality = searchParams.get("speciality");

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors?speciality=${speciality}`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, [speciality]);

  // Function to navigate to appointment page
  const handleBookAppointment = (doctor) => {
    navigate(`/appointment/${doctor._id}?mode=physical`);
  };

  return (
    <div className="doctor-list-container">
      <h2 className="doctor-list-title">Doctors Specializing in {speciality}</h2>
      {doctors.length > 0 ? (
        <ul className="doctor-list">
          {doctors.map((doc) => (
            <li key={doc._id} className="doctor-card">
             <img
  src={`http://localhost:5000/uploads/${doc.photo.split("/").pop()}`}
  alt="Doctor"
  className="doctor-photo"
/>

              <h3>{doc.fullName}</h3>
              <p>Speciality: {doc.speciality}</p>
              <p>Fees: ₹{doc.fees}</p>
              <p>Experience: {doc.experience} years</p>
              <button 
                className="book-appointment-btn" 
                onClick={() => handleBookAppointment(doc)}
              >
                Book Appointment
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors available for this speciality.</p>
      )}
    </div>
  );
};

export default DoctorList;
