import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface NearbyContent {
    title: string;
    locations: string[];
}

const NearbyConnectivity: React.FC = () => {
    const [content, setContent] = useState<NearbyContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('nearby-connectivity');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching nearby connectivity content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="py-16 animate-pulse"></div>;

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    {content?.title || 'Nearby Connectivity'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content?.locations?.map((location, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-lg text-gray-700">{location}</span>
                            </div>
                        </div>
                    )) || (
                            <>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                        <span className="text-lg text-gray-700">Metro Station - 2 km</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                        <span className="text-lg text-gray-700">Airport - 15 km</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                        <span className="text-lg text-gray-700">Shopping Mall - 3 km</span>
                                    </div>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </section>
    );
};

export default NearbyConnectivity;