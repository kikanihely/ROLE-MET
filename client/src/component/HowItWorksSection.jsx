import React from 'react';
import { FaUpload, FaSearch, FaRobot, FaCheckCircle } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUpload className="text-3xl text-white" />,
    title: 'Upload Your Resume',
    description: 'Easily upload your resume to get personalized job suggestions and insights.',
  },
  {
    icon: <FaSearch className="text-3xl text-white" />,
    title: 'Get Job Matches',
    description: 'Our system analyzes your resume and finds job posts that match your skills.',
  },
  {
    icon: <FaRobot className="text-3xl text-white" />,
    title: 'AI-Powered Analysis',
    description: 'Receive a match score and improvement tips from our AI-powered analysis engine.',
  },
  {
    icon: <FaCheckCircle className="text-3xl text-white" />,
    title: 'Apply Confidently',
    description: 'Strengthen your resume and apply with confidence to the most suitable jobs.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-black">
      <h2 className="text-4xl font-extrabold text-center mb-6">How Our Website Works</h2>
      <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto text-lg">
        Rolemet simplifies your job hunt by evaluating your resume, showing relevant jobs, and guiding you to success.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center mb-5 mx-auto shadow-lg">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
