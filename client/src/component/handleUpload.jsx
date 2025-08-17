import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnalyzed, setIsAnalyzed] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file && file.type === "application/pdf") {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setProgress(0);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setIsAnalyzed(true);
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-300 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-8 text-white bg-[#1f1f1f] w-full text-center py-4">
          ROLEMET
        </h1>
        <div className="w-[60%] bg-gray-400 h-4 rounded-full overflow-hidden">
          <div
            className="bg-black h-full transition-all duration-100 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-lg text-gray-700 font-medium">Analyzing Resume Text...</p>
      </div>
    );
  }

  // if (isAnalyzed) {
  //   return (
  //     <div className="min-h-screen bg-gray-300 flex flex-col items-center">
  //       <h1 className="text-3xl font-semibold mb-8 text-white bg-[#1f1f1f] w-full text-center py-4">
  //         ROLEMET
  //       </h1>
  //       <p className="text-xl font-semibold text-gray-800">Next Page Loaded</p>
  //       {/* You can place real content here */}
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center ">
      <h1 className="text-3xl font-semibold mb-8 text-white bg-[#1f1f1f] w-full text-center py-4">
        ROLEMET
      </h1>

      <div className="w-[50%] h-[250px] border mt-10 border-gray-500 bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer">
        <label className="flex flex-col items-center" htmlFor="resumeInput">
          <UploadCloud size={60} className="text-gray-600" />
          <span className="mt-4 text-gray-800">Upload Resume Here</span>
          <input
            id="resumeInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <button
        onClick={handleUpload}
        className="mt-7 px-10 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Upload
      </button>

      {selectedFile && (
        <p className="mt-6 text-sm text-gray-800">
          Preview : {selectedFile.name}
        </p>
      )}

      {previewUrl && (
        <div className="mt-6 w-[80%] h-[600px] border rounded-md shadow-md">
          <iframe
            src={previewUrl}
            title="PDF Preview"
            width="100%"
            height="100%"
            className="rounded-md"
          ></iframe>
        </div>
      )}
    </div>
  );
}