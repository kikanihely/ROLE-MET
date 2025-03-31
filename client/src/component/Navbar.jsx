import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="shadow-md px-8 py-4" style={{backgroundColor:"#282828"}}>
            <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-white">Rolemet</Link>
                
                    <div className="flex justify-center items-center gap-10">
                    <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                    <Link to="/hiring" className="text-gray-300 hover:text-white">Hiring</Link>
                    <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>

                    <Link to="/upload" className="bg-white text-black px-5 py-2 rounded-lg shadow hover:bg-gray-300">Upload Resume</Link>
                    </div>
                </div>
        </nav>
    );
};

export default Navbar;
