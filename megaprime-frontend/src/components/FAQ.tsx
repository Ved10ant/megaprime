import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { contentService } from '../services/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQContent {
    title: string;
    questions: FAQItem[];
}

const FAQ: React.FC = () => {
    const [content, setContent] = useState<FAQContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    useLayoutEffect(() => {
        if (!loading && sectionRef.current) {
            const ctx = gsap.context(() => {
                gsap.from(".faq-item", {
                    scrollTrigger: {
                        trigger: ".faq-list",
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out"
                });
            }, sectionRef);
            return () => ctx.revert();
        }
    }, [loading]);

    const fetchContent = async () => {
        try {
            const response = await contentService.getContent('faq');
            setContent(response.data.content);
        } catch (error) {
            console.error('Error fetching FAQ content:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) return <div className="py-16 animate-pulse"></div>;

    return (
        <section className="py-12 md:py-24 bg-white" id="faq">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {content?.title || 'Frequently Asked Questions'}
                        </h2>
                        <p className="text-lg text-gray-600">Find answers to common questions about MegaPrime Residency and our booking process.</p>
                    </div>

                    <div className="faq-list space-y-4">
                        {(content?.questions || [
                            {
                                question: 'What is the total project area and green space?',
                                answer: 'MegaPrime Residency spans 10 acres, with 70% of the area dedicated to open green spaces and landscaped gardens.'
                            },
                            {
                                question: 'Is the project RERA registered?',
                                answer: 'Yes, the project is fully RERA registered. Our registration number is PR/MUM/1234/2024. All documents are available for review at our experience center.'
                            },
                            {
                                question: 'What are the configuration options available?',
                                answer: 'We offer ultra-luxury 2BHK, 3BHK, and 4BHK apartments, ranging from 1200 sq.ft. to 3500 sq.ft. carpet area.'
                            },
                            {
                                question: 'What amenities are included in the clubhouse?',
                                answer: 'Our 50,000 sq.ft. clubhouse includes a heated swimming pool, modern gym, spa, mini-theater, squash courts, and a banquet hall.'
                            },
                            {
                                question: 'Are there any hidden charges in the booking?',
                                answer: 'We maintain 100% transparency. The price quoted includes basic cost, floor rise, and amenities. Statutory charges like stamp duty and registration are extra as per government norms.'
                            },
                            {
                                question: 'When is the possession scheduled?',
                                answer: 'The project is scheduled for completion in December 2026. We are currently 6 months ahead of schedule on structural work.'
                            }
                        ]).map((faq: any, index: number) => (
                            <div
                                key={index}
                                className={`faq-item group border border-gray-100 rounded-2xl transition-all duration-300 ${openIndex === index ? 'bg-blue-50/50 border-blue-100 shadow-lg shadow-blue-500/5' : 'bg-white hover:border-gray-200 hover:shadow-md'}`}
                            >
                                <button
                                    className="w-full p-6 text-left flex justify-between items-center outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className={`text-lg font-semibold transition-colors ${openIndex === index ? 'text-blue-600' : 'text-gray-800'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                                        {/* Horizontal line */}
                                        <div className="absolute w-4 h-0.5 bg-current rounded-full"></div>
                                        {/* Vertical line (rotates/hides when open) */}
                                        <div className={`absolute w-0.5 h-4 bg-current rounded-full transition-transform duration-300 ${openIndex === index ? 'scale-y-0' : 'scale-y-100'}`}></div>
                                    </div>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-6 pb-6 pt-0">
                                        <div className="h-px bg-gray-100 mb-6 w-full"></div>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;