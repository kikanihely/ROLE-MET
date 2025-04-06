// src/pages/AddJob.js
import React, { useState } from "react";
import { useNavigate } from "react-router";
const AddJob = () => {
    const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    experience: "",
    salaryRange: "",
    skillsRequired: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("Sending token:", token);

      const response = await fetch("http://localhost:5000/api/auth/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (!response.ok) {
        alert(result.message || "Something went wrong!");
        return;
      }

      alert("Job added successfully!");
      setJobData({
        title: "",
        description: "",
        location: "",
        experience: "",
        salaryRange: "",
        skillsRequired: "",
      });
      navigate("/company-dashboard"); 
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to add job.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Experience Required</label>
            <input
              type="text"
              name="experience"
              value={jobData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. 2-4 years"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Salary Range</label>
            <input
              type="text"
              name="salaryRange"
              value={jobData.salaryRange}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. ₹6-8 LPA"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Skills Required</label>
            <input
              type="text"
              name="skillsRequired"
              value={jobData.skillsRequired}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Comma-separated e.g. React, Node.js, MongoDB"
            />
          </div>

          <button
            type="submit"
            className="bg-[#282828] text-white px-6 py-3 rounded-lg hover:bg-black transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
