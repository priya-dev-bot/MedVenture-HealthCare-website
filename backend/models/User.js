import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number, // Store as a string to preserve leading zeros
    required: true,
    unique: true, // Ensures no duplicate numbers
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  speciality: { 
    type: String, 
    required: function () { return this.role === "Doctor"; } 
  },
  aboutDoctor: { 
    type: String, 
    required: function () { return this.role === "Doctor"; },
    default: null
  },
  timeSlots: {
    type: [String], // Array of strings
    required: function () { return this.role === "Doctor"; },
    default: []
  },
  experience: { 
    type: Number, 
    required: function () { return this.role === "Doctor"; }, 
    default: 0
  },

  fees: { 
    type: Number, 
    required: function () { return this.role === "Doctor"; }, 
    default: 0
  },
  
  photo: {
    type: String,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
