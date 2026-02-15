import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface AboutContent {
    title: string;
    description: string;
}

const AboutUs: React.FC = () => {
    const [content, setContent] = useState<AboutContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('about-us');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching about us content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="py-16 animate-pulse"></div>;

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        {content?.title || 'About MegaPrime Developers'}
                    </h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {content?.description || 'We are a premier real estate development company committed to delivering excellence in luxury residential projects with sustainable and innovative solutions.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;