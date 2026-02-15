import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { contentService } from '../services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectOverviewContent {
    title: string;
    description: string;
}

const ProjectOverview: React.FC = () => {
    const [content, setContent] = useState<ProjectOverviewContent | null>(null);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    useLayoutEffect(() => {
        if (!loading && sectionRef.current) {
            const ctx = gsap.context(() => {
                gsap.from(".overview-image", {
                    scrollTrigger: {
                        trigger: ".overview-image",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });

                gsap.from(".overview-content", {
                    scrollTrigger: {
                        trigger: ".overview-content",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    x: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            }, sectionRef);
            return () => ctx.revert();
        }
    }, [loading]);

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
        <section id="overview" ref={sectionRef} className="py-12 md:py-16 bg-gray-50 rounded-2xl">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 overview-image">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-left">
                            {content?.title || 'Project Overview'}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 text-left">
                            {content?.description || 'MegaPrime Residency is a premium residential project offering luxurious 2BHK and 3BHK apartments with modern amenities and excellent connectivity. Designed with precision and crafted for comfort, every home here reflects sophistication.'}
                        </p>
                        <div className="grid grid-cols-2 gap-6 text-left">
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <span className="block text-2xl font-bold text-blue-600">500+</span>
                                <span className="text-gray-500">Happy Families</span>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <span className="block text-2xl font-bold text-blue-600">10+</span>
                                <span className="text-gray-500">Luxury Amenities</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl ">
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
                            alt="Project Render"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectOverview;