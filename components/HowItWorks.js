import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  {
    step: "Step 1",
    title: "Browse Mentors",
    desc: "Don’t waste your prep time on trial-and-error. Our mentors are recently placed seniors who’ve just cracked the same roles you're aiming for in top companies.",
    img: "/browse.jpg",
  },
  {
    step: "Step 2",
    title: "Book a Session",
    desc: "Each session is personalized and focused entirely on your goals. No generic gyaan, just practical, proven strategies. Just ₹349. No more guesswork, just clarity.",
    img: "/choose.jpg",
  },
  {
    step: "Step 3",
    title: "Get 1-on-1 Guidance",
    desc: "Get direct advice from seniors who’ve just cracked top internships and placements. Get all your doubts regarding your journey cleared in a single call.",
    img: "/guide.jpg",
  },
];

function HowItWorks() {
  return (
    <section className="pt-10 pb-14 md:pt-20 md:pb-20 border-t border-gray-700 animate-fadeIn bg-gradient-to-r from-black via-gray-900 to-black">
      {/* Heading */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">How It Works</h2>
        <p className="text-gray-300 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From browsing mentors to personalized sessions — StepUpNow makes mentorship simple, fast, and effective.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 px-6">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="text-center space-y-4 bg-gray-950 p-6 md:p-8 rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-700"
          >
            {/* Image */}
            <div className="w-full h-60 md:h-64 bg-gray-900 border border-gray-600 rounded-xl flex items-center justify-center shadow-md overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={256}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-400 font-medium">{item.step}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12 md:mt-16 px-6">
        <Link
          href="/mentors"
          className="bg-white text-black font-medium w-72 sm:w-auto px-6 py-3 rounded-lg text-base md:text-lg hover:bg-gray-100 hover:scale-105 transition duration-300 shadow-md inline-block"
        >
          Book Your 1-on-1 Session Now
        </Link>
      </div>
    </section>
  );
}

export default HowItWorks;
