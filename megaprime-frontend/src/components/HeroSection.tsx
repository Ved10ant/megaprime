import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { contentService } from '../services/api';

interface HeroContent {
    heading: string;
    subheading: string;
    description: string;
}

const HeroSection: React.FC = () => {
    const heroRef = React.useRef<HTMLDivElement>(null);
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

    React.useLayoutEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Animate Text Content
            tl.from(".hero-subtitle", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
                .from(".hero-title", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.6")

                // Animate Search Bar
                .from(".hero-search", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.4")

                // Animate Description
                .from(".hero-desc", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");

            // Animate Images (Right Side)
            gsap.from(".hero-image-item", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.5
            });

        }, heroRef);

        return () => ctx.revert();
    }, [loading]);

    if (loading) return <div className="min-h-[90vh] flex items-center justify-center"><div className="animate-pulse w-full max-w-4xl h-64 bg-gray-100 rounded-3xl"></div></div>;

    return (
        <main ref={heroRef} className="relative min-h-[90vh] md:min-h-[80vh] flex items-center overflow-hidden bg-white">
            <div className="container mx-auto px-6 py-12 md:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* BEGIN: LeftContent */}
                    {/* This section handles the headline and the floating search bar */}
                    <div className="w-full lg:w-1/2 z-10" data-purpose="hero-text-container">
                        <span className="hero-subtitle inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 tracking-wide uppercase">
                            {content?.subheading || 'Luxury Living Redefined'}
                        </span>
                        <h1 className="hero-title text-5xl md:text-7xl font-extrabold text-secondary leading-tight mb-8">
                            {content?.heading || "Find a place you'll love to live"}
                        </h1>
                        {/* BEGIN: SearchBar */}
                        <div className="hero-search bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-2xl relative -mt-4 lg:mt-0" data-purpose="floating-search-bar">
                            <form action="#" className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                {/* Location Filter */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 ml-1" htmlFor="location">Location</label>
                                    <select className="w-full border-none bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary text-sm font-medium" id="location" name="location">
                                        <option value="">Select City</option>
                                        <option value="ny">New York, NY</option>
                                        <option value="la">Los Angeles, CA</option>
                                        <option value="chi">Chicago, IL</option>
                                    </select>
                                </div>
                                {/* Property Type Filter */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 ml-1" htmlFor="property-type">Property Type</label>
                                    <select className="w-full border-none bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary text-sm font-medium" id="property-type" name="property-type">
                                        <option value="">Type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="condo">Condo</option>
                                    </select>
                                </div>
                                {/* Price Filter */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 ml-1" htmlFor="price">Price Range</label>
                                    <select className="w-full border-none bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary text-sm font-medium" id="price" name="price">
                                        <option value="">Max Price</option>
                                        <option value="100k">$100k - $300k</option>
                                        <option value="300k">$300k - $600k</option>
                                        <option value="600k">$600k+</option>
                                    </select>
                                </div>
                                {/* Search Button */}
                                <div className="w-full">
                                    <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2" type="submit">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                        <span>Search</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* END: SearchBar */}
                        <p className="hero-desc mt-8 text-gray-500 max-w-md text-lg leading-relaxed">
                            {content?.description || 'Over 20,000+ premium properties waiting for you. Start your journey towards your dream home today.'}
                        </p>
                    </div>
                    {/* END: LeftContent */}
                    {/* BEGIN: RightContent */}
                    {/* A collage of modern apartment interiors using a CSS grid-based layout */}
                    <div className="w-full lg:w-1/2 relative" data-purpose="image-collage-container">
                        <div className="grid grid-cols-2 grid-rows-2 gap-5 h-[400px] md:h-[600px]">
                            {/* Large vertical image */}
                            <div className="hero-image-item row-span-2 rounded-2xl overflow-hidden shadow-lg">
                                <img alt="Modern living room with large windows" className="w-full h-full object-cover " src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhqPu4XEuGCSTrAIEKDJvSbt5H1mMMVYYu0rPhx9feOA32VNeznOEIE7Y-lLASx-kPrvLK5tIsfkt6GUJO_TD-WCIBqR12ohM8dGI8fE11ZQy5ZlMDy5au4EX4FcJy0CmFghdTgQuYuo0QqEctHiS87KPTDAXc6TNfLR9oDUxeCJE5mREKyEDNSBfNqaIC6rabvyTlsY_ujHBrn8kiohNzExjd6XBc1vl-H4CFlT1a4UrXj5CnBsvjpIlSMZXRZRVNuhAhsMFlSPo" />
                            </div>
                            {/* Top right image */}
                            <div className="hero-image-item rounded-2xl   overflow-hidden shadow-lg">
                                <img alt="Bright modern kitchen" className="w-full h-full object-cover  " src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUxmDrTqe-BJwkNiBFCBNaBYuOmjcfZgc2161qATBs3ONQsgd6TFC9uS_8ZA3mc7VwiSH2O4w5Qud-wTyK5D6zBICiAcfOUA13WWB93ftFIDlbBPOJ4xomWFmEeyD7r-fO1fpCm4QWLt2NtwxgOZA9OcrI0twSstzpSf90rNfOMudt5HpdvlASxeEdbbDax4mnJS0GRH8JZJ_ZXnf28h47WW1ulHKq4H76aXzqWz-aMvLBvf23g4V5OPBqjdO6N3Vjz5te6D5KPsI" />
                            </div>
                            {/* Bottom right image */}
                            <div className="hero-image-item rounded-2xl  overflow-hidden shadow-lg">
                                <img alt="Minimalist bedroom design" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC67llkkVEpJdTvbsscc9IS67cWS6LOw8ThsJvs9ljSkcDRr8HAeZ6Y20b_CtOoVuzcJZhuUKEKcZHEVX65u079G4sk3N9q8Hjwy1jlWYb_XDwnbotunY9Um-6a3wWDbHWMHIgRYXqicz1JQIIfI9jHwNPGS6R2CQQEZ7j6JbB6Wqi7o07ZBaauHAngpfD3famGe2GfxAT7ZMFkY3Cc3kFOkAP-qhM3L77Jxom4v4POpyNCo1XJkzFRx4dNaVOxZZdPUJ902g4WAyA" />
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute -z-10 bottom-0 left-0 w-48 h-48 bg-blue-100 rounded-full blur-2xl opacity-40"></div>
                    </div>
                    {/* END: RightContent */}
                </div>
            </div>
        </main>
    );
};

export default HeroSection;