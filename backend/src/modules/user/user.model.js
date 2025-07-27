import mongoose from 'mongoose';

// userSchema 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
  },
  resetPasswordExpires:Date,

  timezone: {
    type: String,
  }
}, {
  timestamps: true
});

// User Model
const User = mongoose.model("User", userSchema);
export default User;
