import React from 'react'
import Link from 'next/link';

const Mentors = () => {
  return (
    <div>
      {/* Meet the Mentors Section */}
      <section className="py-16 md:py-20 border-t border-gray-700 animate-fadeIn text-white bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold">Meet Your Mentors</h2>
            <p className="text-gray-400 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Learn directly from students of IITs, NITs, and other top colleges who’ve cracked the same path you’re on.
              Get real answers from real achievers.
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 justify-items-center">
            {[
              {
                name: "Adarsh Dubey",
                college: "IIT Delhi · CSE · AIR 512",
                place: "Placed at Google",
                img: "/adarsh.jpg"
              },
              {
                name: "Rohit Prajapat",
                college: "NIT Trichy · ECE · AIR 1023",
                place: "Intern @ Qualcomm",
                img: "/rohit.jpg"
              },
              {
                name: "Samyak Shende",
                college: "IIIT Hyderabad · CS · AIR 312",
                place: "Placed at Atlassian",
                img: "/sam.jpg"
              },
            ].map((mentor, idx) => (
              <div 
                key={idx} 
                className="bg-gray-900/60 border border-gray-700 rounded-2xl p-4 md:p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition space-y-2 w-full max-w-xs"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto border border-gray-600 flex items-center justify-center bg-gray-800">
                  <img
                    src={mentor.img}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <span className="bg-green-600/80 text-white px-3 py-1 rounded-full text-xs mt-2">Top Mentor</span>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg md:text-xl font-semibold">{mentor.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400">{mentor.college}</p>
                  <p className="text-xs md:text-sm text-gray-400">{mentor.place}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Link 
              href="/mentors" 
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
            >
              Explore More Mentors
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mentors
