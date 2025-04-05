import React, { useState, useEffect } from "react";
import { FiUpload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!file) {
      alert("Please select a file!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);
  
    setLoading(true);
    setError("");
    setResult(null);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/uploadResume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    
      console.log("API Response:", response.data);
    
      if (response.data.status === 200) {
        setResult(response.data.data);  // Set parsed JSON data
      } else {
        setError(response.data.message); // Handle error messages properly
      }
    } catch (e) {
      setError("Error processing resume. Please try again.");
      console.error("Connection Error:", e.response ? e.response.data : e);
    }
    
    
  };
  
  


  useEffect(() => {
    console.log("Updated result state:", result);
  }, [result]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Your Resume</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg text-center"
      >
        <textarea
          value={jobDescription}
          placeholder="Enter Job Description Here..."
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full h-28 p-3 mb-4 border border-gray-300 rounded-lg resize-none"
        />

        <label className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center text-gray-600 hover:border-gray-600 transition">
          <FiUpload className="text-4xl mb-2" />
          {file ? file.name : "Click or Drag & Drop PDF Here"}
          <input type="file" accept="application/pdf" className="hidden" onChange={handleChange} />
        </label>

        {file && (
          <p className="text-green-600 mt-2 flex items-center gap-2">
            <FiCheckCircle /> File Uploaded: {file.name}
          </p>
        )}

        {error && (
          <p className="text-red-500 mt-2 flex items-center gap-2">
            <FiXCircle /> {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
      </form>

      {result && typeof result === "object" && (
  <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mt-6">
    <h3 className="text-xl font-bold text-gray-800 mb-3">Resume Analysis</h3>

    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-4 text-center">
      <h4 className="text-lg font-semibold">Resume Match Score:</h4>
      <p className="text-3xl font-bold">{result.resume_match_score || "N/A"}%</p>
    </div>

    {result.analysis && (
      <>
        <h4 className="text-lg font-semibold mb-2">Detailed Analysis</h4>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><strong>Skills Match:</strong> {result.analysis.skills_match || "N/A"}</li>
          <li><strong>Experience Relevance:</strong> {result.analysis.experience_relevance || "N/A"}</li>
          <li><strong>Education Fit:</strong> {result.analysis.education_fit || "N/A"}</li>
          <li><strong>Certifications & Projects:</strong> {result.analysis.certifications_projects || "N/A"}</li>
        </ul>

        {result.improvement_suggestions?.length > 0 && (
          <>
            <h4 className="text-lg font-semibold mt-4">Improvement Suggestions</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {result.improvement_suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </>
        )}
      </>
    )}
  </div>
)}

{/* {result} */}
    </div>
  );
};

export default Upload;
