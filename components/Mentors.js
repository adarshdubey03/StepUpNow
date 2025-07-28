"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Mentors = () => {
  return (
    <section className="py-16 md:py-20 border-t border-gray-700 bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">Meet Your Mentors</h2>
          <p className="text-gray-400 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Learn directly from students of IITs, NITs, and other top colleges who’ve cracked the same path you’re on.
            Get real answers from real achievers.
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {[
            {
              name: "Adarsh Dubey",
              college: "IIT Delhi · CSE · AIR 512",
              place: "Placed at Google",
              quote: "Cracked SDE rounds with strong DSA + projects.",
              img: "/adarsh dubey.jpg"
            },
            {
              name: "Rohit Prajapat",
              college: "NIT Trichy · ECE · AIR 1023",
              place: "Intern @ Qualcomm",
              quote: "Balanced core + coding prep effectively.",
              img: "/rohit prajapat.jpeg"
            },
            {
              name: "Samyak Shende",
              college: "IIIT Hyderabad · CS · AIR 312",
              place: "Placed at Atlassian",
              quote: "Built standout dev portfolio with real projects.",
              img: "/samyak shende.webp"
            },
          ].map((mentor, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-xs shadow-md hover:shadow-2xl hover:bg-gray-900/80 transition duration-300"
            >
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-600 bg-gray-800">
                  <Image
                    src={mentor.img}
                    alt={mentor.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Tag */}
              <div className="flex justify-center mt-3">
                <span className="bg-green-600/90 text-white text-xs px-3 py-1 rounded-full">
                  🌟 Top Mentor
                </span>
              </div>

              {/* Info */}
              <div className="text-center mt-4 space-y-1">
                <h3 className="text-lg font-semibold">{mentor.name}</h3>
                <p className="text-sm text-gray-400">{mentor.college}</p>
                <p className="text-sm text-gray-400">{mentor.place}</p>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-gray-700" />

              {/* Quote */}
              <p className="text-sm text-gray-300 italic text-center">
                “{mentor.quote}”
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <Link
            href="/mentors"
            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Explore More Mentors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
