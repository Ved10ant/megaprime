import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface HeroContent {
    heading: string;
    subheading: string;
    description: string;
}

const HeroSection: React.FC = () => {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('hero');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching hero content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-96 bg-gray-200 animate-pulse"></div>;

    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-bold mb-4">
                        {content?.heading || 'Welcome to MegaPrime Residency'}
                    </h1>
                    <h2 className="text-2xl font-semibold mb-6">
                        {content?.subheading || 'Luxury Living Redefined'}
                    </h2>
                    <p className="text-xl mb-8">
                        {content?.description || 'Experience premium luxury apartments with world-class amenities and strategic location.'}
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;