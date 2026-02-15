import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Visionaries Title
            gsap.from(".visionaries-title", {
                scrollTrigger: {
                    trigger: ".visionaries-section",
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animate Leaders Cards
            gsap.from(".leader-card", {
                scrollTrigger: {
                    trigger: ".leaders-grid",
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Animate Vision Section
            gsap.from(".vision-content", {
                scrollTrigger: {
                    trigger: ".vision-section",
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="font-sans text-slate-900 bg-[#f8f6f6] dark:bg-[#221610] dark:text-slate-100 transition-colors duration-300">
            <main className="">
                {/* Leadership Team */}
                <section className="visionaries-section bg-[#ec5b13]/5 dark:bg-[#ec5b13]/10 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="visionaries-title text-center mb-16">
                            <h3 className="text-4xl font-light mb-4">The <span className="font-bold">Visionaries</span></h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">The brilliant minds leading Luxe Developments towards a future of sustainable elegance.</p>
                        </div>
                        <div className="leaders-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Leader 1 */}
                            <div className="leader-card group">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                    <img alt="Portrait of a professional man in a suit" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHb8JS2QQEWBb0P3a9XZ85eaInIGLVHA6vchwa70WrPMCEGAb6y7fk9agIWHmxXWx00tIL8W-hZTsMmkk7HfWATwQaMT3F-h5BsYorxo3ivouXUmSlgPblkpCyGzYMs8cI2mccW1d1_jH3ilE053v05-MBLAAhTVvTL65Tvn5I1s3ZEqPh6UA6eIK2Stf_rFdV8JRMgCokGXQNV1fdazu36FO0GwG3VNu07BrO2bISaESXl6mocwbqddVG_u9AExVd3E_SUgCu5U8" />
                                </div>
                                <h4 className="text-xl font-bold">Julian Vane</h4>
                                <p className="text-[#ec5b13] text-xs font-bold uppercase tracking-widest mb-2">Chief Executive Officer</p>
                                <p className="text-sm text-slate-500 italic">"Pioneering the next era of urban residency."</p>
                            </div>
                            {/* Leader 2 */}
                            <div className="leader-card group">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                    <img alt="Portrait of a confident professional woman" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV88luZQUUF_MhDpvh6P3dezFo-yH12a4QDLSnEiJhF58KLNHmj1YmbNruaa3-ZqSZyHTZdKUg0d3M4YZuodV0bNtjlJ9AtZwg4VLNTgaT9HMfNaXbDLIp25qby3bW2Libn-1k9vCeFag7ibuoRpuCa83gboetBQG5DFn0AOqbynUDbKQRyRqeiee5QY4BF_s8tTavuu-dXiRHG0l3flMZNBs_Erd1KPrk9lI-75oimrfuGI82_gZaj20F89j9zfR209k_G4g_PpA" />

                                </div>
                                <h4 className="text-xl font-bold">Elena Rossi</h4>
                                <p className="text-[#ec5b13] text-xs font-bold uppercase tracking-widest mb-2">Creative Director</p>
                                <p className="text-sm text-slate-500 italic">"Design is the silent ambassador of luxury."</p>
                            </div>
                            {/* Leader 3 */}
                            <div className="leader-card group">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                    <img alt="Portrait of a middle aged male architect" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOp-X2PpN5BN7vYzGoOvIq4RxxqYdJ_nQOSVNDq8I2k0FLkbahLl1ao7xW1PAWVODmrfoKvMmEIYC2CzGAkMzaYghuNEF07P7EL6Cx50OERDXpCucHugBDqUbSF279l99nA2BY3OTKWXoDS6xnPiBEu10FTq-0eM-8NOx6rmXr_dDf5WkxJteNUejW63-Hnt_vjOhzmC_1zkDk9MVMqfINOSadtxId_Wv-KgdbqwReotcZ6TICW1iGZLriu-dNXl2hXJ3skqoYrvU" />

                                </div>
                                <h4 className="text-xl font-bold">Marcus Thorne</h4>
                                <p className="text-[#ec5b13] text-xs font-bold uppercase tracking-widest mb-2">Lead Architect</p>
                                <p className="text-sm text-slate-500 italic">"Building bridges between nature and steel."</p>
                            </div>
                            {/* Leader 4 */}
                            <div className="leader-card group">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                    <img alt="Portrait of a smiling professional woman" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwgPTMbQcP7r_TZ6UsKaoGEIel9ZghZbruYl9VN_c1V2eGclUn1ouIsQrjVUNFM7ELiQ6jwJmDCTSrBrU0ChoMBcNMhzcF-lyquXSPAmeHIdCNAcl87O_rfGQCIsX6Y7DPSJZpomjSB7Op151JX_giVT5WlMT0Gz9-jCsNkLjHWZxpDUfminHmra5i5mLmN1cAHQs8MlKIFQooB7d3TZxSNldsMzqQ3zgMSBQ8dt4ulfnx_QrEqXBJGD46NvQFdBtfppo3bI9UXPk" />

                                </div>
                                <h4 className="text-xl font-bold">Sarah Jenkins</h4>
                                <p className="text-[#ec5b13] text-xs font-bold uppercase tracking-widest mb-2">Head of Sustainability</p>
                                <p className="text-sm text-slate-500 italic">"Ethics and aesthetics are not mutually exclusive."</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Vision */}
                <section className="vision-section py-24 px-6 relative overflow-hidden">
                    <div className="vision-content max-w-4xl mx-auto text-center">
                        <span className="material-symbols-outlined text-[#ec5b13] text-6xl mb-6">visibility</span>
                        <h3 className="text-4xl md:text-5xl font-light mb-8">Our <span className="font-bold">Vision</span> for 2030</h3>
                        <div className="p-12 bg-white dark:bg-[#221610] border border-[#ec5b13]/20 rounded-2xl shadow-xl relative z-10">
                            <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-slate-700 dark:text-slate-300">
                                "To lead the global transition towards <span className="text-[#ec5b13] font-bold">carbon-neutral luxury</span>, creating environments that inspire human potential and preserve the natural world for generations to come."
                            </p>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#ec5b13]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ec5b13]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                    </div>
                </section>


            </main>


        </div>
    );
};

export default AboutPage;
