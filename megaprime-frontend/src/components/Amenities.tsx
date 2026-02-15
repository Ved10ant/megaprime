import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { contentService } from '../services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Amenity {
    name: string;
    description: string;
}

interface AmenitiesContent {
    title: string;
    amenities: Amenity[];
}

const Amenities: React.FC = () => {
    const [content, setContent] = useState<AmenitiesContent | null>(null);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    useLayoutEffect(() => {
        if (!loading && sectionRef.current) {
            const ctx = gsap.context(() => {
                gsap.from(".amenity-card", {
                    scrollTrigger: {
                        trigger: ".amenity-grid",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                });
            }, sectionRef);
            return () => ctx.revert();
        }
    }, [loading]);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('amenities');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching amenities content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="py-16 bg-gray-50 animate-pulse"></div>;

    return (
        <section id="amenities" className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">
                    {content?.title || 'World-Class Amenities'}
                </h2>
                <div className="amenity-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(content?.amenities || [
                        { name: 'Swimming Pool', description: 'Olympic-size swimming pool for residents', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Modern Gymnasium', description: 'Fully equipped modern fitness center', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Club House', description: 'Premium club house with recreational facilities', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop' },
                    ]).map((amenity: any, index: number) => (
                        <div key={index} className="amenity-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={amenity.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop'}
                                    alt={amenity.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{amenity.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{amenity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Amenities;