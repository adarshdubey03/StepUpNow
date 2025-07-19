import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function HeroSection() {
  return (
    <section className="bg-black text-white pt-14 pb-16 md:pt-24 md:pb-24 animate-fadeIn">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-12 items-center px-6">
        
        {/* IMAGE MOBILE */}
        <div className="md:hidden mb-1 w-full h-64 border border-gray-500 rounded-xl flex items-center justify-center bg-gray-800 overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Hero illustration"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        </div>

        {/* TEXT */}
        <div className="md:col-span-3 space-y-4 mx-3 flex flex-col items-center md:items-start text-left">
          <h2 className="text-3xl md:text-4xl font-bold max-w-md">
            Get There Faster — With Someone Who Just Did
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-md">
            Land your dream job with 1-on-1 mentorship from top college achievers
          </p>
          <p className="text-lg md:text-xl font-medium max-w-md">
            Book a session for just ₹349 and get real answers.
          </p>
          <Link
            href="/mentors"
            className="block mx-auto md:mx-0 w-44 md:w-auto text-center mt-5 bg-white  text-black px-6 py-3 rounded-md text-xl sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-md"
          >
            Book Now
          </Link>
        </div>

        {/* IMAGE DESKTOP */}
        <div className="hidden md:flex md:col-span-4 w-full h-96 border border-gray-500 rounded-xl items-center justify-center bg-gray-800 overflow-hidden relative">
          <Image
            src="/hero.jpg"
            alt="Hero illustration"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
            sizes="(min-width: 768px) 100vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
