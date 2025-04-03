import React, { useState } from 'react';
import { FiUpload, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axios from "axios";


const Upload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

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
    formData.append("jobDescription", extractedText);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/uploadResume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data.text);
    } catch (e) {
      console.log("Connection Error:", e);
    }
  };


  return (
    // <div className="min-h-[90vh] bg-gradient-to-br from-gray-200 to-gray-350 flex items-center justify-center p-8">
    //   <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-lg">
    //     <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Upload Your Resume</h1>

    //     <div className='flex gap-8'>
    //       <div className='w-full'>
    //         <label className="cursor-pointer border-4 border-dashed border-gray-400 rounded-2xl p-10 flex flex-col items-center transition-all hover:border-gray-600 hover:bg-gray-50">
    //           <FiUpload className="text-6xl text-gray-600 mb-4" />
    //           <p className="text-gray-600">Drag & Drop or Click to Select PDF File</p>
    //           <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} />
    //         </label>

    //         {file && (
    //           <p className="text-green-600 mt-4 flex items-center gap-2">
    //             <FiCheckCircle /> File Uploaded: {file.name}
    //           </p>
    //         )}

    //         {error && (
    //           <p className="text-red-500 mt-4 flex items-center gap-2">
    //             <FiXCircle /> {error}
    //           </p>
    //         )}

    //         {score !== null && (
    //           <p className="text-green-600 mt-4 font-semibold">Resume Score: {score}%</p>
    //         )}
    //       </div>
    //       <div className='w-full'>
    //         <textarea
    //           className="w-full mb-6 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
    //           rows="7"
    //           placeholder="Enter job description here..."
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //         />
    //       </div>
    //     </div>



    //     <button
    //       className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
    //       style={{ backgroundColor: "#282828" }}
    //       onClick={handleCheckScore}
    //     >
    //       Check Score
    //     </button>
    //   </div>
    // </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#333" }}>PDF Text Extractor</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <textarea
          value={extractedText}
          placeholder="Extracted text will appear here..."
          onChange={(e)=>{setExtractedText(e.target.value)}}
          style={{
            width: "100%",
            height: "100px",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            color:"black",
            fontSize: "14px",
            resize: "none",
          }}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            color:"black",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Upload PDF
        </button>
      </form>
    </div>
  );
}

export default Upload;