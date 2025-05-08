// src/pages/CompanyDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Users } from "lucide-react";

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

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/jobs/${jobId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setJobs(jobs.filter((job) => job._id !== jobId));
        } else {
          console.error("Failed to delete job");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };


  const handleJobsClick = () => {
    navigate("/company-jobs"); // Navigate to the job management page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome 👋</h1>
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

      {/* Jobs Posted Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 border rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-700">{job.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>📍 Location: {job.location}</p>
                      <p>💼 Experience: {job.experience}</p>
                      <p>🛠️ Skills: {job.skillsRequired}</p>
                      <p>💰 Salary: {job.salaryRange}</p>
                    </div>
                  </div>

                  {/* Horizontal Icon Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                      className="text-black hover:text-gray-700"
                      title="Edit Job"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-black hover:text-gray-700"
                      title="Delete Job"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/view-candidates/${job._id}`)}
                      className="text-black hover:text-gray-700"
                      title="View Candidates"
                    >
                      <Users size={20} />
                    </button>
                  </div>
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
