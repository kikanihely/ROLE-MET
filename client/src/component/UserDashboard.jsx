import React from 'react';
import {
  FaFileAlt,
  FaBolt,
  FaExclamationTriangle,
  FaLightbulb,
  FaUserCircle,
  FaSave,
} from 'react-icons/fa';

const userData = {
  name: "John Doe",
  email: "john@example.com",
  resumeStrength: "78%",
  matchScore: 78,
  weaknesses: [
    "Lack of quantified achievements",
    "Missing keywords for target role",
  ],
  suggestions: [
    "Include measurable results in work experience.",
    "Use keywords from job descriptions.",
    "Add a professional summary at the top.",
  ],
  lastResume: {
    name: "John_Resume.pdf",
    uploadedAt: "April 8, 2025",
  },
  savedJobs: 5,
  resumeUploadHistory: [
    { name: "John_Resume_v1.pdf", date: "March 10, 2025" },
    { name: "John_Resume_v2.pdf", date: "March 25, 2025" },
    { name: "John_Resume_final.pdf", date: "April 8, 2025" },
  ],
};

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
    <div
      className="h-4 bg-black text-white text-center text-xs leading-4 transition-all duration-500"
      style={{ width: `${percentage}%` }}
    >
      {percentage}%
    </div>
  </div>
);

const Card = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col gap-3 border border-gray-100">
    <div className="text-3xl text-black mb-2">{icon}</div>
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 md:px-12 lg:px-24">
      <h1 className="text-4xl font-bold text-left text-gray-900 mb-12">👋 Welcome, {userData.name}</h1>

      {/* Row 1: Profile & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <Card icon={<FaUserCircle />} title="User Info">
          <p className="font-medium">{userData.name}</p>
          <p className="text-xs text-gray-500">{userData.email}</p>
        </Card>

        <Card icon={<FaBolt />} title="Resume Strength">
          <p className="text-3xl font-bold text-black">{userData.resumeStrength}</p>
          <p className="text-xs text-gray-500 mt-1">Based on your latest upload.</p>
        </Card>

        <Card icon={<FaFileAlt />} title="Match Score">
          <ProgressBar percentage={userData.matchScore} />
          <p className="text-xs text-gray-500 mt-2">How well your resume matches job roles.</p>
        </Card>

        <Card icon={<FaSave />} title="Saved Jobs">
          <p className="text-3xl font-bold text-black">{userData.savedJobs}</p>
          <p className="text-xs text-gray-500 mt-1">You’ve saved {userData.savedJobs} job posts.</p>
        </Card>
      </div>

      {/* Row 2: Weaknesses + Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card icon={<FaExclamationTriangle />} title="Detected Weaknesses">
          <ul className="list-disc list-inside space-y-1">
            {userData.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card icon={<FaLightbulb />} title="Improvement Suggestions">
          <ul className="list-disc list-inside space-y-1">
            {userData.suggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Row 3: Resume Upload History */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 Resume Upload History</h2>
        <ul className="divide-y divide-gray-200">
          {userData.resumeUploadHistory.map((entry, index) => (
            <li key={index} className="py-2 flex justify-between items-center text-sm">
              <span className="text-gray-700">{entry.name}</span>
              <span className="text-gray-500">{entry.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
