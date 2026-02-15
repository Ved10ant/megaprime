import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface Phase {
    name: string;
    status: string;
}

interface ConstructionContent {
    title: string;
    phases: Phase[];
}

const ConstructionUpdates: React.FC = () => {
    const [content, setContent] = useState<ConstructionContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('construction-updates');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching construction updates content:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-500';
            case 'in progress': return 'bg-yellow-500';
            case 'pending': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    if (loading) return <div className="py-16 bg-gray-50 animate-pulse"></div>;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    {content?.title || 'Project Progress'}
                </h2>
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {content?.phases?.map((phase, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                                <span className="text-lg font-medium text-gray-800">{phase.name}</span>
                                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(phase.status)}`}>
                                    {phase.status}
                                </span>
                            </div>
                        )) || (
                                <>
                                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                                        <span className="text-lg font-medium text-gray-800">Foundation Work</span>
                                        <span className="px-3 py-1 rounded-full text-white text-sm font-medium bg-green-500">Completed</span>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                                        <span className="text-lg font-medium text-gray-800">Structural Work</span>
                                        <span className="px-3 py-1 rounded-full text-white text-sm font-medium bg-yellow-500">In Progress</span>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConstructionUpdates;