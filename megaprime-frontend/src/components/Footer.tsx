import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

const Footer: React.FC = () => {
    const [contactInfo, setContactInfo] = useState<any>(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await contentService.getContent('contact-info');
                setContactInfo(response.data.content);
            } catch (error) {
                console.error('Error fetching contact info for footer:', error);
            }
        };
        fetchContactInfo();
    }, []);

    return (
        <footer className="bg-slate-950 text-white pt-12 md:pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold tracking-tighter text-blue-400 mb-6">
                            MEGAPLEX PRIME
                        </h3>
                        <p className="text-gray-400 leading-relaxed max-w-md">
                            Megaplex Prime is a real estate consulting firm that empathizes with the complexities that developers face in today's competitive market. We are here to be your reliable partner, offering a wide range of premium solutions that will help your projects reach new heights of accomplishment.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Services', 'Blog', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Corporate Address</h4>
                        <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                            {contactInfo?.address || '9th floor, DAMJI SHAMJI CORPORATE SQUARE, B/907-908, near Kanara Business Park, Sawali Society, Laxmi Nagar, Ghatkopar East, Mumbai, Maharashtra 400075'}
                        </p>
                        <div className="mt-4 text-gray-400 space-y-2">
                            <p>Phone: {contactInfo?.phone || '+91 98765 43210'}</p>
                            <p>Email: {contactInfo?.email || 'sales@megaprime.com'}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2026 MEGAPLEX PRIME. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
