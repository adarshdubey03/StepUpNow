import Link from 'next/link'
import React from 'react'

const FinalPitch = () => {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-r from-black via-gray-900 to-black text-white animate-fadeIn border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
            Clarity. Confidence. Community. All in One Place.
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of ambitious students finding direction, unlocking opportunities, and learning directly from those who’ve already stepped up.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold text-base md:text-lg mb-2">🎓 1-on-1 Mentorship</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Get personalised guidance from students of IITs, NITs & top universities.
              </p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold text-base md:text-lg mb-2"> 🗺️ Proven Roadmaps</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Don’t just get advice — get a plan. Learn what actually works.
              </p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold text-base md:text-lg mb-2">👥 Peer Community</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Stay inspired, share resources, and grow together with like-minded peers.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/mentors"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition text-base md:text-lg shadow-lg"
            >
              Start Your Journey Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FinalPitch
