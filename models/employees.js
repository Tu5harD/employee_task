import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Employees =
  mongoose.models.Employees || mongoose.model("Employees", employeeSchema);

export default Employees;
