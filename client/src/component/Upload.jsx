import React, { useState } from 'react';
import { FiUpload, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(null);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleCheckScore = async () => {
    if (!file) {
      return setError('Please upload a PDF file.');
    }
    if (!description.trim()) {
      return setError('Please provide a job description.');
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setScore(result.score);
        setError('');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Error connecting to the server. Please try again.');
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
              <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} />
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
              <p className="text-green-600 mt-4 font-semibold">Resume Score: {score}%</p>
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
};

export default Upload;