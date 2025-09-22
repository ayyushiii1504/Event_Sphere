
// src/components/LandingPage.jsx
import React, { useState } from 'react';
import { GlobeAltIcon, MagnifyingGlassCircleIcon, ChatBubbleBottomCenterTextIcon, CalendarDaysIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Feature Card Component from the approved light-theme design
const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 mx-auto">
            {icon}
        </div>
        <h3 className="text-2xl font-semibold text-dark mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
);

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-light font-sans">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-dark flex items-center">
                        <GlobeAltIcon className="h-8 w-8 text-primary mr-2" />
                        Event Sphere
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">Log In</a>
                        <a href="#" className="bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                            Sign Up
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark">
                            {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                        </button>
                    </div>
                </nav>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white py-4">
                        <a href="#" className="block text-center py-2 px-4 text-gray-600 hover:bg-gray-100">Log In</a>
                        <a href="#" className="block text-center mt-2 mx-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2 px-5 rounded-lg">Sign Up</a>
                    </div>
                )}
            </header>

            <main>
                {/* Hero Section */}

                <section className="relative h-[85vh] text-white flex items-center justify-center text-center">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1470&q=80')" }}></div>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 px-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                            Where Moments<br />Become <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Movements.</span>
                        </h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-10">
                            The ultimate platform to discover, create and connect through incredible events happening right around you.
                        </p>
                        <div className="flex justify-center items-center gap-4">
                            <a href="#" className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                Get Started
                            </a>
                        </div>
                    </div>
                </section>

                {/* Discover, create, and connect through incredible events happening right around you. */}


                {/* Features Section - Revamped */}
                <section id="features" className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-dark mb-4">The Sphere of Connection</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
                            A vibrant space where events come alive—discover, connect, and create with ease.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Feature 1: Event Discovery */}
                            <FeatureCard
                                icon={<MagnifyingGlassCircleIcon className="h-8 w-8 text-white" />}
                                title="Smart Event Discovery"
                            >
                                Explore events in your city or across categories. Our tailored search and filters help you
                                quickly find the experiences that match your vibe.
                            </FeatureCard>

                            {/* Feature 2: Real-time Chat */}
                            <FeatureCard
                                icon={<ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-white" />}
                                title="Real-Time Connection"
                            >
                                Connect instantly with fellow attendees and organizers. Every event comes with its own
                                dedicated chat to keep the buzz alive before, during, and after.
                            </FeatureCard>

                            {/* Feature 3: Event Creation & Management */}
                            <FeatureCard
                                icon={<CalendarDaysIcon className="h-8 w-8 text-white" />}
                                title="Easy Event Creation"
                            >
                                From idea to sold-out show. Our event creation feature gives you the power to launch, manage, and promote your event like a pro.
                                No hassle, just impact.
                            </FeatureCard>
                        </div>
                    </div>
                </section>


                {/* 'How It Works' Section (New section from V2, styled for V1) */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-dark mb-12">Three Steps to Your Next Experience</h2>
                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 mt-px">
                                <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="8 8" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary mb-4 text-4xl font-bold text-white shadow-lg">1</div>
                                <h3 className="text-2xl font-semibold text-dark mb-2">DISCOVER</h3>
                                <p className="text-gray-600">Find your next passion with powerful search and curated suggestions.</p>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary mb-4 text-4xl font-bold text-white shadow-lg">2</div>
                                <h3 className="text-2xl font-semibold text-dark mb-2">CONNECT</h3>
                                <p className="text-gray-600">Join the conversation, meet fellow attendees, and build excitement.</p>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary mb-4 text-4xl font-bold text-white shadow-lg">3</div>
                                <h3 className="text-2xl font-semibold text-dark mb-2">EXPERIENCE</h3>
                                <p className="text-gray-600">Enjoy the events and make memories that last a lifetime.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Organizer Section */}
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl font-bold text-dark mb-6 text-left">Bring Your Vision to Life.</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Event Sphere isn't just for finding events – it's for creating them. Our powerful tools make event creation and management simple, secure, and successful.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary text-white flex items-center justify-center mr-4 mt-1">✔</div>
                                    <span className="text-gray-700"><strong>Intuitive Event Creation:</strong> Define your title, description, category, and location with ease.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary text-white flex items-center justify-center mr-4 mt-1">✔</div>
                                    <span className="text-gray-700"><strong>Full Control:</strong> Update or delete your events anytime, with secure authorization.</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary text-white flex items-center justify-center mr-4 mt-1">✔</div>
                                    <span className="text-gray-700"><strong>Engaged Audiences:</strong> Facilitate communication with real-time chat and attendee lists.</span>
                                </li>
                            </ul>
                            <a href="#" className="bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-block">
                                Start Creating Your Event
                            </a>
                        </div>
                        <div className="order-1 md:order-2">
                            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" alt="Event Organizer" className="rounded-xl shadow-2xl w-full" />
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold mb-4">Ready to Connect, Create, and Experience More?</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">Join Event Sphere today and unlock a world of possibilities.</p>
                        <a href="#" className="bg-white text-primary font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Sign Up for Free
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center"><GlobeAltIcon className="h-6 w-6 mr-2" /> Event Sphere</h3>
                            <p className="text-sm">Connecting events, connecting people.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Discover</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cities</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Create</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Create Event</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Organizer FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} Event Sphere. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;