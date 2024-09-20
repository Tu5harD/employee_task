"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EmployeeRegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setCourses((prevCourses) =>
      checked
        ? [...prevCourses, value]
        : prevCourses.filter((course) => course !== value)
    );
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter a valid name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileNo)) {
      newErrors.mobileNo = "Enter a valid 10-digit mobile number.";
    }

    if (!designation) {
      newErrors.designation = "Please select a designation.";
    }

    if (!gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!courses.length) {
      newErrors.courses = "Please select at least one course.";
    }

    if (!image) {
      newErrors.image = "Please upload an image (JPG/PNG only).";
    } else if (!["image/jpeg", "image/png"].includes(image.type)) {
      newErrors.image = "Only JPG and PNG files are supported.";
    }

    if (!date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch("http://localhost:3000/api/employee", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            mobileNo,
            designation,
            gender,
            courses,
            date,
          }),
        });

        if (res.ok) {
          router.push("/employeelist");
        } else {
          throw new Error("Failed to create an employee");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex py-4 items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Employee Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
              )}
            </div>

            {/* Designation Field */}
            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg"
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
              {errors.designation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.designation}
                </p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Gender
              </span>
              <div className="mt-2 space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Courses Field */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Courses
              </span>
              <div className="mt-2 space-y-3">
                {["MCA", "BCA", "BSC"].map((course) => (
                  <label key={course} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="courses"
                      value={course}
                      checked={courses.includes(course)}
                      onChange={handleCourseChange}
                      className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 pr-2">{course}</span>
                  </label>
                ))}
              </div>
              {errors.courses && (
                <p className="text-red-500 text-xs mt-1">{errors.courses}</p>
              )}
            </div>

            {/* Date Field */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image (JPG/PNG only)
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-800 text-white font-semibold rounded-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;
