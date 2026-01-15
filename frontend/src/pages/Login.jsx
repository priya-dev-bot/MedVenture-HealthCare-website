import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../pages/UserContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      console.log("🔹 Server Response:", response.data);

      const { user, token } = response.data;

      if (!user || !user.id || !token) {
        console.error("❌ Missing user data or token!", response.data);
        alert("❌ Login failed: Missing user data or token.");
        return;
      }

      const userData = { 
        id: user.id, 
        email: user.email, 
        role: user.role, 
        fullName: user.fullName, 
        photo: user.photo || ""
      };

      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("userToken", token);

      setUser(userData);

      alert(user.role === "admin" ? "✅ Admin Login Successful!" : "✅ User Login Successful!");
      navigate(user.role === "admin" ? "/admin-dashboard" : "/");  // Redirect based on role
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back To MedVenture! <span>🎉😊</span></h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email-ID" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Don't have an Account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
