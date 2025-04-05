// src/pages/CompanyDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const companyName = localStorage.getItem("companyName"); // If stored on login

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Post a Job</h2>
          <p>Create and manage job openings that appear to job seekers.</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Applicants</h2>
          <p>Track applications and shortlist potential hires based on resume strength.</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
