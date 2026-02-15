import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '#about-us' },
        { name: 'Overview', href: '#overview' },
        { name: 'Amenities', href: '#amenities' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
            <div className="max-w-[1440px] mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-600">
                    MEGAPRIME<span className="text-gray-900">RESIDENCY</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium text-gray-700 transition-all hover:text-blue-500 text-sm"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-6 w-px bg-gray-200 mx-2"></div>
                    <Link
                        to="/admin/login"
                        className="px-5 py-2 rounded-full font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all text-sm border border-transparent hover:border-gray-200"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/admin/register"
                        className="px-5 py-2 rounded-full font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all transform active:scale-95 shadow-md shadow-blue-500/20 text-sm"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden flex flex-col justify-center items-center h-10 w-10 text-gray-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`w-6 h-0.5 mb-1.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 mb-1.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'}`}>
                <div className="flex flex-col p-6 space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <hr className="border-gray-100 my-2" />
                    <Link
                        to="/admin/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center w-full block px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 border border-gray-200"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/admin/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center w-full block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
