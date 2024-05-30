import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username"],
    unique: [true, "Please provide an unique username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Please provide an unique email"],
  },
  password: {
    type: String,
    required: [true, "Please provide an password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
