import React from 'react';
import { useNavigate } from 'react-router-dom';
import resume from '../assets/resume-analysis.webp';
import { Helmet } from 'react-helmet';

const LandPage = () => {
    const navigate = useNavigate();

    return (

        <div className="py-16 px-8 w-full h-[90vh] pt-[15vh]">
            <Helmet>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    rel="stylesheet"
                />
            </Helmet>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Section */}
                <div className="ml-[10px]">
                    <h1 className="text-5xl font-extrabold text-black leading-tight sm:text-6xl">
                        Discover Your Resume Strength
                    </h1>
                    <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                        Upload your resume to analyze its strength for your desired job roles.
                        Receive actionable insights to enhance your resume.
                        Get personalized recommendations for better career opportunities.
                    </p>
                    <div className="mt-8 flex space-x-4">
                        {/* Primary Button */}
                        <button className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-white hover:border hover:text-black hover:scale-105 transition " onClick={() => navigate('/login')} >
                            Get Started &nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center items-center">
                    <img
                        src={resume} 
                        alt="Resume Analysis" 
                        className="w-[1000px] h-auto rounded-3xl shadow-2xl object-cover transition-transform transform hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default LandPage;