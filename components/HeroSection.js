import React from 'react';
import Link from 'next/link';
const homeImg = '/home3.png';

function HeroSection() {
    return (
        <section className="py-24 animate-fadeIn bg-black text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-12 items-center px-6">
                <div className="md:col-span-3 space-y-4">
                    <h2 className="text-4xl font-bold">
                        Get There Faster — With Someone Who Just Did
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Land your dream job with 1-on-1 mentorship from top college achievers
                    </p>
                    <p className="text-xl font-medium">
                        Book a session for just ₹349 and get real answers.
                    </p>
                    <Link
                        href="/mentors"
                        className="bg-white text-black px-6 py-3 rounded-md text-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-md inline-block"
                    >
                        Book Now
                    </Link>
                </div>
                <div className="md:col-span-4 w-full h-96 border border-gray-500 rounded-xl flex items-center justify-center bg-gray-800 overflow-hidden">
                    <img src={homeImg} alt="Hero" className="h-full w-full object-cover rounded-xl" />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
