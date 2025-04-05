import React, { useState } from "react";
import image from "../assets/regi.png";
import { useNavigate } from "react-router-dom";

const MainRegister = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.role == "User") {
      navigate("/register", { state: { userData: data } });
    } else {
      navigate("/registerCompany", { state: { userData: data } });
    }
  };

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
          Who You Are?
        </h2>

        <form
          className="w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            >
              <option value="">Select Role</option>
              <option key="Company" value="Company">
                Company
              </option>
              <option key="User" value="User">
                User
              </option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={data.email}
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
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Conform Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black rounded-lg"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainRegister;