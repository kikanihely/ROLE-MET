import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="p-12 bg-black text-white text-center">
            <div className="mt-4 space-x-6">
                <Link to="/home" className="text-gray-400 hover:text-white">Home</Link>
                <Link to="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link>
                <Link to="/success" className="text-gray-400 hover:text-white">Success Stories</Link>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            </div>
            <p className="text-gray-500 mt-4">2025 © RoleMet Empowering Job Seekers.</p>
        </footer>
    );
};

export default Footer;
