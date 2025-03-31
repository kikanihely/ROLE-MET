import React from 'react';
import { FaComments, FaUserCircle, FaLightbulb } from 'react-icons/fa';

const discussions = [
  {
    title: 'How to write a standout resume?',
    author: 'JohnDoe',
    comments: 24,
  },
  {
    title: 'Best practices for ATS optimization',
    author: 'CareerExpert22',
    comments: 18,
  },
  {
    title: 'Cover letter tips that work',
    author: 'ResumeGuru',
    comments: 30,
  },
];

const CommunitySection = () => {
  return (
    <section className="py-20 px-8 bg-white text-black">
      <h2 className="text-4xl font-extrabold text-center mb-12">Community Forum</h2>
      <p className="text-center text-gray-400 mb-12">Join discussions, get tips, and share your experiences.</p>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {discussions.map((discussion, index) => (
          <div key={index} className="p-6 bg-white text-black rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300">
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-gray-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{discussion.title}</h3>
                <p className="text-gray-600 text-sm">By {discussion.author}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="text-black bg-gray-100 py-2 px-4 rounded-full hover:bg-gray-200">Join Discussion</button>
              <div className="flex items-center">
                <FaComments className="text-gray-500 mr-2" />
                <span className="text-gray-700">{discussion.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-black text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-gray-200 transition">View More Discussions</button>
      </div>
    </section>
  );
};

export default CommunitySection;