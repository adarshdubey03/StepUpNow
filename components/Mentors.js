import React from 'react'

const Mentors = () => {
  return (
    <div>
            {/* Meet the Mentors Section */}
      <section className="py-20 border-t border-gray-700 animate-fadeIn text-white bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold">Meet Your Mentors</h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
              Learn directly from students of IITs, NITs, and other top colleges who’ve cracked the same path you’re on.
              Get real answers from real achievers.
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { name: "Adarsh Dubey", college: "IIT Delhi · CSE · AIR 512", place: "Placed at Google" },
              { name: "Rohit Prajapat", college: "NIT Trichy · ECE · AIR 1023", place: "Intern @ Qualcomm" },
              { name: "Samyak Shende", college: "IIIT Hyderabad · CS · AIR 312", place: "Placed at Atlassian" },
            ].map((mentor, idx) => (
              <div key={idx} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-gray-600 flex items-center justify-center bg-gray-800 text-gray-500 text-sm">
                  Image
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{mentor.college}</p>
                  <p className="text-sm text-gray-400 mt-1">{mentor.place}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-6 mb-4">
            <a href="#mentors" className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition">
              Explore More Mentors
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Mentors
