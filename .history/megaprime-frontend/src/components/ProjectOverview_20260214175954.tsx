import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

interface ProjectOverviewContent {
    title: string;
    description: string;
}

const ProjectOverview: React.FC = () => {
    const [content, setContent] = useState<ProjectOverviewContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('project-overview');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching project overview content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="py-16 bg-gray-100 animate-pulse"></div>;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        {content?.title || 'Project Overview'}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {content?.description || 'MegaPrime Residency is a premium residential project offering luxurious 2BHK and 3BHK apartments with modern amenities and excellent connectivity.'}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProjectOverview;