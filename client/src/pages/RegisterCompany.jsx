import React, { useState } from "react";
import image from "../assets/regi.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const Register = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    companyName: "",
    emailId: userData.email || "",
    password: userData.password || "",

    number: "",
    website: "",
    linkedIn: "",

    address: "",
    city: "",
    state: "",
    numberOfEmployees: "",
    companyDescription: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, logo: file }));
    }
  };

  const validateStep = () => {
    const requiredFields = {
      1: ["companyName", "emailId", "password"],
      2: ["website", "number", "linkedIn"],
      3: ["address", "city", "state"],
      4: ["logo", "numberOfEmployees", "companyDescription"],
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

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/company-register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        console.log("Success:", data);

        setUser({
          companyName: "",
          emailId: userData.email || "",
          password: userData.password || "",
          number: "",
          website: "",
          linkedIn: "",
          address: "",
          city: "",
          state: "",
          numberOfEmployees: "",
          companyDescription: "",
          logo: null,
        });

        navigate("/login");
      } else {
        const error = await response.json();
        alert(error.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
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

      {/* Right Section */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8 lg:p-10 relative">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
          {step === 1 && "Step 1: Basic Company Information"}
          {step === 2 && "Step 2: Contact & Online Presence"}
          {step === 3 && "Step 3: Location Details"}
          {step === 4 && "Step 4: Final Details & Logo Upload"}
        </h2>

        {/* Step Navigation */}
        <div className="flex justify-center mb-6">
          <div className="rounded-2xl border border-black flex">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                className={`px-3 py-2 ${
                  step === s ? "bg-black text-white rounded-xl" : ""
                }`}
                onClick={() => setStep(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg"
        >
          {step === 1 && (
            <>
              <Input
                label="Company Name"
                name="companyName"
                value={user.companyName}
                onChange={handleChange}
              />
              <Input
                label="Email Id"
                name="emailId"
                value={user.emailId}
                onChange={handleChange}
              />
              <Input
                label="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </>
          )}

          {step === 2 && (
            <>
              <Input
                label="Website"
                name="website"
                value={user.website}
                onChange={handleChange}
              />
              <Input
                label="Number"
                name="number"
                value={user.number}
                onChange={handleChange}
                type="number"
              />
              <Input
                label="LinkedIn"
                name="linkedIn"
                value={user.linkedIn}
                onChange={handleChange}
              />
            </>
          )}

          {step === 3 && (
            <>
              <Input
                label="Address"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
              <Input
                label="City"
                name="city"
                value={user.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={user.state}
                onChange={handleChange}
              />
            </>
          )}

          {step === 4 && (
            <>
              {/* Logo Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Company Logo
                </label>
                <div className="flex items-center gap-4">
                  {user.logo && (
                    <img
                      src={URL.createObjectURL(user.logo)}
                      alt="Preview"
                      className="w-16 h-16 object-cover border"
                    />
                  )}
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-black text-white rounded hover:bg-black transition"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <Input
                label="Number Of Employees"
                name="numberOfEmployees"
                value={user.numberOfEmployees}
                onChange={handleChange}
                type="number"
              />
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company Description
                </label>
                <textarea
                  name="companyDescription"
                  value={user.companyDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-between">
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
                className="px-4 py-2 text-white bg-black rounded-lg"
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

// Reusable input field
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border rounded-lg"
      required
    />
  </div>
);

export default Register;