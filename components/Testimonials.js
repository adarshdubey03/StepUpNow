import React from 'react'
import Link from 'next/link';

const Testimonials = () => {
  return (
    <div>
      <section className="py-20 border-t border-gray-700 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold">They Stepped Up — Now It’s Your Turn</h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
              Hear from students who used StepUpNow to find the right mentors, gain clarity, and unlock opportunities.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-14">
            {[
              {
                text: `"I had no idea what to do after my second year. My mentor helped me shortlist internships, review my resume, and even prep for interviews. Landed an offer at Cisco!"`,
                name: "— Shruti Jain, NIT Nagpur · ECE · 2024",
                mt: false,
              },
              {
                text: `"StepUpNow gave me clarity and confidence. It was like having a senior guiding me through every stage — from GATE prep to college selection."`,
                name: "— Aditya Narayan, Cracked GATE · Joined IIT Bombay M.Tech",
                mt: true,
              },
              {
                text: `"This is the kind of mentorship I wish I had in first year. My mentor from IIIT-H helped me build a roadmap and a solid project portfolio that actually mattered."`,
                name: "— Riya Mehta, Tier-3 College · Placed at Adobe",
                mt: false,
              },
              {
                text: `"Even though I come from a non-CS background, my mentor gave me direction on switching to tech and how to crack interviews. That gave me real hope."`,
                name: "— Arjun S., Mechanical Branch · Switched to Tech @ Zomato",
                mt: true,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className={`md:col-span-6 bg-gray-900/60 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 ${t.mt ? "md:mt-12" : ""}`}
              >
                {/* Accent line */}
                <div className="h-1 w-10 bg-gray-600 rounded-full mb-4 mx-auto"></div>

                <p className="text-gray-300 italic mb-4">{t.text}</p>
                
                {/* Small badge */}
                <div className="flex justify-center">
                  <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                    Verified Student
                  </span>
                </div>

                <div className="text-sm text-gray-400 mt-3 text-center">{t.name}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <Link
              href="/mentors"
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
            >
              Find Your Mentor Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
