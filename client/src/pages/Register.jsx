import React, { useState } from "react";
import image from "../assets/regi.png";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const userData = location.state?.userData || {}; // Get the passed data
  console.log(userData)

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    city: "",
    state: "",
    jobTitle: "",
    experience: "",
    industry: "",
    skills: "",
    linkedin: "",
    github: "",
    resume: null,
    email: userData.email,
    password: userData.password,
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, resume: e.target.files[0] });
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = () => {
    const requiredFields = {
      1: ["fullName", "city", "state"],
      2: ["jobTitle", "experience", "industry", "skills"],
      3: ["linkedin", "github", "resume"],
      4: ["email", "password", "confirmPassword"],
    };

    const fields = requiredFields[step];
    for (let field of fields) {
      if (!user[field]) {
        alert(`Please fill out the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);
      console.log("Sending data:", JSON.stringify(user, null, 2)); // Debugging log

      if (response.ok) {
        const responseData = await response.json();
        alert("Registration successful");
        setUser({
          fullName: "",
          city: "",
          state: "",
          jobTitle: "",
          experience: "",
          industry: "",
          skills: "",
          linkedin: "",
          github: "",
          resume: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        console.log(responseData);

        // ✅ Navigate to Login Page
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
  const states = ["California", "Texas", "Florida", "Illinois", "New York"];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side */}
      <div
        className="lg:w-1/2 flex flex-col justify-center items-center text-white p-8"
        style={{ backgroundColor: "#282828" }}
      >
        <img
          src={image}
          alt="Happy adopter"
          className="mb-6 w-[600px] h-auto animate-pulse"
        />
        <h1 className="text-4xl font-bold mb-4">
          Start Your Journey with Rolemet
        </h1>
        <p className="text-lg text-center max-w-md mb-6 opacity-80">
          Create your Rolemet account and discover your resume strength. Get
          personalized insights and find the right job opportunities in just a
          few simple steps.
        </p>
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8 lg:p-10 relative">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
          {step === 1 && "Step 1: Who are you?"}
          {step === 2 && "Step 2: Your Professional Details"}
          {step === 3 && "Step 3: Your Social Details"}
          {step === 4 && "Step 4: Create your Rolemet account"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg"
        >
          {step === 1 && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  City
                </label>
                <select
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={user.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Current Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={user.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={user.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={user.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={user.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={user.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={user.github}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  accept="application/pdf"
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {/* Additional Steps can be added similarly for Step 2, Step 3, and Step 4 */}

          <div className="flex justify-evenly">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border-2 border-black text-black bg-white rounded-lg"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: "#282828" }}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-white bg-black rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;