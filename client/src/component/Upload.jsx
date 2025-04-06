import React, { useState } from 'react';
import { FiUpload, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axios from "axios";


const Upload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');


  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCheckScore = async () => {
    if (!file || !description) {
      setError("Please upload a file and enter job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", description);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/uploadResume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { score, suggestions } = response.data;

      setScore(score);
      setSuggestions(suggestions);
      setError('');
    } catch (e) {
      console.error("Connection Error:", e);
      setError("Something went wrong while checking the score.");
    }
  };



  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-200 to-gray-350 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Upload Your Resume</h1>

        <div className='flex gap-8'>
          <div className='w-full'>
            <label className="cursor-pointer border-4 border-dashed border-gray-400 rounded-2xl p-10 flex flex-col items-center transition-all hover:border-gray-600 hover:bg-gray-50">
              <FiUpload className="text-6xl text-gray-600 mb-4" />
              <p className="text-gray-600">Drag & Drop or Click to Select PDF File</p>
              <input type="file" accept="application/pdf" className="hidden" onChange={handleChange} />
            </label>

            {file && (
              <p className="text-green-600 mt-4 flex items-center gap-2">
                <FiCheckCircle /> File Uploaded: {file.name}
              </p>
            )}

            {error && (
              <p className="text-red-500 mt-4 flex items-center gap-2">
                <FiXCircle /> {error}
              </p>
            )}

            {score !== null && (
              <div className="mt-6">
                <p className="text-xl font-semibold text-gray-800">Resume Match Score: <span className="text-green-600">{score}%</span></p>

                {Array.isArray(suggestions) && suggestions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Improvement Suggestions:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {suggestions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            )}

          </div>
          <div className='w-full'>
            <textarea
              className="w-full mb-6 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
              rows="7"
              placeholder="Enter job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>



        <button
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          style={{ backgroundColor: "#282828" }}
          onClick={handleCheckScore}
        >
          Check Score
        </button>
      </div>
    </div>

  );
}

export default Upload;