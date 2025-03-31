import React from 'react';
import { Link } from 'react-router-dom';

const CommonNavbar = () => {
    return (
        <nav className="bg-black shadow-md px-8 py-4">
            <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-white">Rolemet</Link>
                
                    <div className="flex justify-center items-center gap-10">

                    <Link to="/login" className="bg-white text-black px-5 py-2 rounded-lg shadow hover:bg-gray-300">Get Started</Link>
                    </div>
                </div>
        </nav>
    );
};

export default CommonNavbar;
