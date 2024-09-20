"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeeUpdateForm({
  id,
  name,
  email,
  mobileNo,
  designation,
  gender,
  courses,
  date,
}) {
  const [newName, setnewName] = useState(name);
  const [newemail, setnewEmail] = useState(email);
  const [newmobileNo, setnewMobileNo] = useState(mobileNo);
  const [newdesignation, setnewDesignation] = useState(designation);
  const [newgender, setnewGender] = useState(gender);
  const [newcourses, setnewCourses] = useState(courses || []);
  const [newdate, setnewDate] = useState(date);

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setnewCourses((prevCourses) =>
      checked
        ? [...prevCourses, value]
        : prevCourses.filter((newcourse) => newcourse !== value)
    );
  };

  const validateForm = () => {
    let newErrors = {};

    if (!newName) {
      newErrors.name = "Please enter a valid name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newemail)) {
      newErrors.newemail = "Please provide a valid email address.";
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(newmobileNo)) {
      newErrors.newmobileNo = "Enter a valid 10-digit mobile number.";
    }

    if (!newdesignation) {
      newErrors.newdesignation = "Please select a designation.";
    }

    if (!newgender) {
      newErrors.newgender = "Please select a gender.";
    }

    if (!newcourses.length) {
      newErrors.newcourses = "Please select at least one course.";
    }

    if (!newdate) {
      newErrors.newdate = "Please select a date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newName,
            newEmail: newemail,
            newMobileNo: newmobileNo,
            newDesignation: newdesignation,
            newGender: newgender,
            newCourses: newcourses,
            newDate: newdate,
          }),
        });

        if (res.ok) {
          router.refresh();
          router.push("/employeelist");
        } else {
          const errorData = await res.json();
          console.error("Error updating employee:", errorData);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div className="flex py-4 items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Update Employee Information
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
                type="text"
                value={newName}
                placeholder={name}
                onChange={(e) => setnewName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.newName && (
                <p className="text-red-500 text-xs mt-1">{errors.newName}</p>
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
                type="email"
                value={newemail}
                onChange={(e) => setnewEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.newemail && (
                <p className="text-red-500 text-xs mt-1">{errors.newemail}</p>
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
                type="tel"
                value={newmobileNo}
                onChange={(e) => setnewMobileNo(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.newmobileNo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newmobileNo}
                </p>
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
                value={newdesignation}
                onChange={(e) => setnewDesignation(e.target.value)}
                className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg"
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
              {errors.newdesignation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newdesignation}
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
                    value="M"
                    checked={newgender === "M"}
                    onChange={(e) => setnewGender(e.target.value)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="F"
                    checked={newgender === "F"}
                    onChange={(e) => setnewGender(e.target.value)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              {errors.newgender && (
                <p className="text-red-500 text-xs mt-1">{errors.newgender}</p>
              )}
            </div>

            {/* Courses Field */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Courses
              </span>
              <div className="mt-2 space-y-3">
                {["MCA", "BCA", "BSC"].map((newcourse) => (
                  <label key={newcourse} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={newcourse}
                      checked={newcourses.includes(newcourse)}
                      onChange={handleCourseChange}
                      className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 pr-2">{newcourse}</span>
                  </label>
                ))}
              </div>
              {errors.newcourses && (
                <p className="text-red-500 text-xs mt-1">{errors.newcourses}</p>
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
                type="date"
                value={newdate}
                onChange={(e) => setnewDate(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
              {errors.newdate && (
                <p className="text-red-500 text-xs mt-1">{errors.newdate}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Profile Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                // onChange={handleImageChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}
