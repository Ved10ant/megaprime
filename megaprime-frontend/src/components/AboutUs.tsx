import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    React.useLayoutEffect(() => {
        if (!loading) {
            const ctx = gsap.context(() => {
                gsap.from(".about-image", {
                    scrollTrigger: {
                        trigger: ".about-container",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                gsap.from(".about-content", {
                    scrollTrigger: {
                        trigger: ".about-container",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out"
                });
            });
            return () => ctx.revert();
        }
    }, [loading]);

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
        <section id="about-us" className="about-container py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="about-image lg:w-1/2 rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
                            alt="Our Office"
                            className="w-full h-full object-cover min-h-[400px]"
                        />
                    </div>
                    <div className="about-content lg:w-1/2 order-1 lg:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {content?.title || 'About MegaPrime Developers'}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-blue-600 pl-6 py-2">
                                {content?.description || 'We are a premier real estate development company committed to delivering excellence in luxury residential projects with sustainable and innovative solutions.'}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With over two decades of experience, MegaPrime has redefined the skyline of major cities, bringing together cutting-edge technology and timeless design. Our commitment to quality and transparency makes us the most trusted name in real estate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;