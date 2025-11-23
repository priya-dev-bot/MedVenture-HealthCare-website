import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../pages/UserContext";
import "./Header.css";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Update context state
    }
  }, [setUser]);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-profile")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from storage on logout
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="navbar">
      <Link to="/"><img src="./find-doctor-gallery/Medventure.png" alt="MedVenture Logo" class="logo" /></Link>
        <Link to="/find-doctor" className="nav-btn">Find Doctor</Link>
        <Link to="/video-consult" className="nav-btn">Video Consult</Link>
        <Link to="/lab-test" className="nav-btn">Lab Test</Link>
        <Link to="/contact-us" className="nav-btn">Contact Us</Link>
        <Link to="/about-us" className="nav-btn">About Us</Link>
        <Link to="/articles" className="nav-btn">Articles</Link>

        {/* Conditionally render user profile or login/register button */}
        {user ? (
          <div className="user-profile" onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}>
            <img 
              src={user.photo ? (user.photo.startsWith("http") ? user.photo : `http://localhost:5000${user.photo}`) : "/default-avatar.png"} 
              alt="User" 
              className="user-image" 
              onError={(e) => { e.target.src = "http://localhost:5000/uploads/admin.png"; }} // Fallback for broken images
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={user.role === "Doctor" ? "/doctor-profile" : "/profile"} className="dropdown-item">
      Profile
    </Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-btn">Login/Register</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
