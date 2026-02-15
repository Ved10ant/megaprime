import { contactService, contentService } from '../services/api';
import { useState, useEffect } from 'react';
const ContactSection: React.FC = () => {
    const [contactInfo, setContactInfo] = useState<any>(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await contentService.getContent('contact-info');
                setContactInfo(response.data.content);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };
        fetchContactInfo();
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error on change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await contactService.submitContact(formData);
            console.log('Form submitted successfully');
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err: any) {
            console.error('Error submitting form:', err);
            setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-12 md:py-20 bg-white" id="contact">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-lg text-gray-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                                <p className="text-gray-600 mb-6">Visit our experience center or reach out to us through any of the following channels.</p>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Link7 20l-4-4m0 0l4-4m-4 4h18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Experience Center</h4>
                                    <p className="text-gray-600">{contactInfo?.experienceCenter || '123 MegaPrime Tower, Luxury Road, Mumbai - 400001'}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">{contactInfo?.phone || '+91 98765 43210'}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 012-2V7a2 2 0 01-2-2H5a2 2 0 01-2 2v10a2 2 0 012 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600">{contactInfo?.email || 'sales@megaprime.com'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                            {error && (
                                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="bg-green-100 p-4 rounded-full text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                                    <p className="text-gray-600">Thank you for your interest. Our representative will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="I'm interested in..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'}`}
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
