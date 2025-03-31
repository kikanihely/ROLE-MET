import React from 'react';
import { FaClipboardCheck, FaBriefcase, FaLightbulb } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaClipboardCheck className="text-black text-5xl mb-4" />, 
      title: 'Resume Analysis',
      description: 'Get a detailed analysis of your resume to assess its strength and relevance for your desired job roles.'
    },
    {
      icon: <FaBriefcase className="text-black text-5xl mb-4" />,
      title: 'Job Recommendations',
      description: 'Receive personalized job suggestions based on your resume insights and career goals.'
    },
    {
      icon: <FaLightbulb className="text-black text-5xl mb-4" />,
      title: 'Resume Improvement Tips',
      description: 'Enhance your resume with expert tips to increase your chances of landing your dream job.'
    }
  ];

  return (
    <div className="py-20 px-8 w-full h-auto bg-black text-white">
      <h2 className="text-4xl font-extrabold text-center mb-16">Key Features</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 bg-white text-black rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
