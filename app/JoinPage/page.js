"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const communityTracks = [
  {
    title: "Web Development Tribe",
    description: [
      "Build full-stack projects",
      "Learn frontend/backend frameworks",
      "Work on live builds",
      "Get curated guides and ideas",
    ],
    link: "https://chat.whatsapp.com/K4101n87iLoAjZcdhmt3Aj",
  },
  {
    title: "DSA & Placements Squad",
    description: [
      "Striver Sheet + Leetcode grind groups",
      "Mock interviews & feedback",
      "Resources for coding rounds",
      "24/7 doubt-solving community",
    ],
    link: "/join/dsa",
  },
  {
    title: "Research & Core Explorer Circle",
    description: [
      "Support for research interns and papers",
      "SOP writing & prof outreach help",
      "Academic discussions with peers",
      "Field-specific resources",
    ],
    link: "/join/research",
  },
  {
    title: "Startup & Product Builders Hub",
    description: [
      "Startup-curious? This is for you.",
      "Learn MVPs, UI/UX, and pitching",
      "Get feedback on your ideas",
      "Talk to early-stage founders",
    ],
    link: "/join/startup",
  },
];

const JoinPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Community
          </h1>
          <p className="text-lg text-gray-300">
            Join a peer-driven group aligned with your passion. Whether you&apos;re into coding, research, or startups — there&apos;s a place for you here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {communityTracks.map((track) => (
            <div
              key={track.title}
              className="bg-gray-950 rounded-2xl p-6 border border-gray-700 transition-transform duration-200 hover:scale-[1.01] hover:border-gray-400 flex flex-col items-center text-center"
            >
              <h3 className="text-2xl font-semibold mb-6">{track.title}</h3>
              <ul className="text-gray-400 space-y-3 mb-6 w-full max-w-xs text-left">
                {track.description.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="pt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M14 12H4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.586 13.603L17.619 14.364c-1.566 1.233-2.349 1.85-2.984 1.569C14 15.651 14 14.688 14 12.761v-1.522c0-1.926 0-2.89.635-3.171.635-.281 1.418.336 2.984 1.569l.967.761c.943.743 1.414 1.114 1.414 1.603 0 .488-.471.86-1.414 1.602Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {track.link.startsWith("http") ? (
                <a
                  href={track.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
                >
                  Join Now →
                </a>
              ) : (
                <Link
                  href={track.link}
                  className="px-6 py-2 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
                >
                  Join Now →
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-32">
          <h2 className="text-3xl font-bold mb-4">
            Your path is unique — your community should be too.
          </h2>
          <p className="text-gray-400 mb-6">
            Pick your space. Start your journey. No fluff, just focus.
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinPage;
