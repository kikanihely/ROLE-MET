// src/pages/CompanyDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName"); // If stored on login
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5000/api/auth/jobs/company", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobsClick = () => {
    navigate("/company-jobs"); // Navigate to the job management page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {companyName || "Company"} 👋</h1>
          <p className="text-lg text-gray-700 mt-2">
            Manage your job posts, view applicants, and discover the right candidates.
          </p>
        </div>

        <button
          onClick={() => navigate('/add-job')}
          className="bg-[#282828] text-white px-5 py-2 rounded-lg shadow hover:bg-black transition"
        >
          Add Jobs
        </button>
      </div>

      {/* Sample Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Post a Job</h2>
          <p>Create and manage job openings that appear to job seekers.</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Applicants</h2>
          <p>Track applications and shortlist potential hires based on resume strength.</p>
        </div>
      </div>

      {/* Jobs Posted Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 border rounded shadow">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-700">{job.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>📍 Location: {job.location}</p>
                  <p>💼 Experience: {job.experience}</p>
                  <p>🛠️ Skills: {job.skillsRequired}</p>
                  <p>💰 Salary: {job.salaryRange}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
