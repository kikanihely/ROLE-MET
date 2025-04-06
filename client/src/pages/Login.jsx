import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from '../assets/regi.png';
import { useAuth } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const { storetokenInLS } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !role) {
      alert("Please enter email, password, and select role.");
      return;
    }
  
    try {
      const loginPayload = {
        email,
        emailId: email,
        password,
        role,
      };
      // const loginPayload = role === "company"
      // ? { emailId: email, password, role }
      // : { email, password, role };
      console.log("Received role:", role);

      console.log("Payload being sent to server:", loginPayload);
  
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });
  
      const data = await response.json();
      console.log("Response received:", data);
  
      if (!response.ok) {
        alert(data?.message || "Invalid Credentials. Please try again.");
        return;
      }
  
      const actualRole = data.role || role;
  
      storetokenInLS(data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", actualRole);
      localStorage.setItem("token", data.token);
  
      alert("Login successful!");
  
      if (actualRole === "candidate") navigate("/me");
      else if (actualRole === "company") navigate("/company-dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 flex flex-col justify-center items-center text-white p-8" style={{ backgroundColor: "#282828" }}>
        <img src={loginImage} alt="Login Visual" className="mb-6 w-[600px] h-auto" />
        <h1 className="text-4xl font-bold mb-4">Welcome Back to Rolemet</h1>
        <p className="text-lg text-center max-w-md mb-6 opacity-80">
          Analyze your resume strength and explore relevant job opportunities.
        </p>
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8 lg:p-10 relative">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">
          <span style={{ color: "#282828" }}>Login to Your Account</span>
        </h2>

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="candidate">Candidate</option>
              <option value="company">Company</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="w-full px-4 py-3 text-white rounded-lg" style={{ backgroundColor: "#282828" }}>
            Login
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <span className="text-black cursor-pointer" onClick={() => navigate('/mainregister')}>
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
